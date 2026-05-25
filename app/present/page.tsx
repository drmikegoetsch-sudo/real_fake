import { QRDisplay } from '@/components/QRDisplay'
import { ResetButton } from '@/components/ResetButton'

export default function PresentPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-12">
      <div className="flex flex-col items-center gap-8">
        <div className="text-center">
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">Scan to play</p>
          <h1 className="text-3xl font-semibold tracking-tight">Real or Fake?</h1>
        </div>
        <QRDisplay />
        <ResetButton />
      </div>
    </main>
  )
}
