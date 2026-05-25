'use client'

import { QRCodeSVG } from 'qrcode.react'

const URL = 'https://real-fake-mqyqgeox9-mikegoetsch-soteranalytis-projects.vercel.app/'

export function QRDisplay() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="p-5 border border-gray-100 rounded-2xl shadow-sm bg-white">
        <QRCodeSVG
          value={URL}
          size={220}
          fgColor="#000000"
          bgColor="#ffffff"
          level="M"
        />
      </div>
      <div className="text-center space-y-1">
        <p className="text-sm text-gray-500 font-medium">Scan to play</p>
        <p className="text-xs font-mono text-gray-300 break-all max-w-[220px]">{URL}</p>
      </div>
    </div>
  )
}
