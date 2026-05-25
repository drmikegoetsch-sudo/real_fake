import { LiveGraph } from '@/components/LiveGraph'

export default function DonePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white px-6 pt-14 pb-10">
      <div className="flex flex-col items-center text-center mb-10">
        <div className="w-12 h-12 rounded-full border-2 border-black flex items-center justify-center mb-4">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">All done.</h1>
        <p className="text-gray-400 text-sm mt-1">Watch the results come in live.</p>
      </div>

      <div className="flex-1">
        <LiveGraph />
      </div>
    </main>
  )
}
