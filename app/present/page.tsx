import { LiveGraph } from '@/components/LiveGraph'
import { QRDisplay } from '@/components/QRDisplay'

export default function PresentPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center p-12">
      <div className="w-full max-w-5xl grid grid-cols-[auto_1fr] gap-20 items-start">

        {/* Left: QR Code */}
        <div className="flex flex-col justify-start pt-2">
          <div className="mb-6">
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-1">Join</p>
            <h2 className="text-2xl font-semibold tracking-tight">Real or Fake?</h2>
          </div>
          <QRDisplay />
        </div>

        {/* Divider */}
        <div className="border-l border-gray-100 pl-20">
          <div className="mb-8">
            <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-1">Results</p>
            <h2 className="text-2xl font-semibold tracking-tight">Live</h2>
          </div>
          <LiveGraph />
        </div>

      </div>
    </main>
  )
}
