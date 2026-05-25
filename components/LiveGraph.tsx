'use client'

import { useEffect, useState } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { supabase } from '@/lib/supabase'

interface DataPoint {
  index: number
  pct: number
}

function buildDataPoints(rows: { all_correct: boolean }[]): DataPoint[] {
  let correct = 0
  return rows.map((row, i) => {
    if (row.all_correct) correct++
    return { index: i + 1, pct: Math.round((correct / (i + 1)) * 100) }
  })
}

export function LiveGraph() {
  const [data, setData] = useState<DataPoint[]>([])
  const [total, setTotal] = useState(0)
  const [live, setLive] = useState(false)

  const currentPct = data.length > 0 ? data[data.length - 1].pct : null
  const isAbove50 = currentPct !== null && currentPct >= 50
  const color = isAbove50 ? '#16a34a' : '#dc2626'

  useEffect(() => {
    const fetchAll = async () => {
      const { data: rows } = await supabase
        .from('responses')
        .select('all_correct, created_at')
        .order('created_at', { ascending: true })

      if (rows && rows.length > 0) {
        setData(buildDataPoints(rows))
        setTotal(rows.length)
      }
    }

    fetchAll()

    const channel = supabase
      .channel('live-responses')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'responses' },
        async () => {
          // Refetch on each insert — clean and accurate for room-scale audiences
          const { data: rows } = await supabase
            .from('responses')
            .select('all_correct, created_at')
            .order('created_at', { ascending: true })

          if (rows) {
            setData(buildDataPoints(rows))
            setTotal(rows.length)
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') setLive(true)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return (
    <div className="w-full space-y-8">
      {/* Big number */}
      <div className="flex items-end gap-4">
        <span
          className="text-8xl font-semibold tabular-nums leading-none transition-colors duration-700"
          style={{ color: currentPct !== null ? color : '#d1d5db' }}
        >
          {currentPct !== null ? `${currentPct}%` : '—'}
        </span>
        <div className="pb-3 space-y-0.5">
          <p className="text-sm text-gray-500">got all 3 correct</p>
          <p className="text-xs text-gray-300">{total} response{total !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Chart */}
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 10, right: 4, left: 0, bottom: 8 }}>
            <defs>
              <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.15} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="index"
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              label={{
                value: 'responses',
                position: 'insideBottomRight',
                offset: -4,
                fill: '#d1d5db',
                fontSize: 11,
              }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#9ca3af', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              width={40}
            />

            <ReferenceLine
              y={50}
              stroke="#e5e7eb"
              strokeDasharray="6 4"
              label={{ value: '50%', position: 'insideTopLeft', fill: '#d1d5db', fontSize: 11 }}
            />

            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #f3f4f6',
                borderRadius: '8px',
                fontSize: 12,
                color: '#111',
                boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
              }}
              formatter={(value) => [`${value}%`, 'Correct']}
              labelFormatter={(label) => `Response #${label}`}
              cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }}
            />

            <Area
              type="monotone"
              dataKey="pct"
              stroke={color}
              strokeWidth={2.5}
              fill="url(#areaFill)"
              dot={false}
              activeDot={{ r: 4, fill: color, stroke: '#fff', strokeWidth: 2 }}
              isAnimationActive
              animationDuration={400}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[260px] flex flex-col items-center justify-center gap-3">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
          <p className="text-gray-300 text-sm">Waiting for responses…</p>
        </div>
      )}

      {/* Live indicator */}
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${live ? 'bg-black animate-pulse' : 'bg-gray-300'}`}
        />
        <span className="text-xs text-gray-400">{live ? 'Live' : 'Connecting…'}</span>
      </div>
    </div>
  )
}
