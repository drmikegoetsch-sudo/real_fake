import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { CORRECT_ANSWERS } from '@/lib/constants'

export async function POST(request: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const body = await request.json()
  const answers: boolean[] = body.answers

  if (!Array.isArray(answers) || answers.length !== 3) {
    return NextResponse.json({ error: 'Invalid answers' }, { status: 400 })
  }

  const all_correct = answers.every((a, i) => a === CORRECT_ANSWERS[i])

  const { error } = await supabase
    .from('responses')
    .insert({ answers, all_correct })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
