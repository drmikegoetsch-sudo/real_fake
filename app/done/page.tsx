import Link from 'next/link'

export default function DonePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="text-center space-y-6">
        <div className="w-16 h-16 rounded-full border-2 border-black flex items-center justify-center mx-auto">
          <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">All done.</h1>
          <p className="text-gray-400 text-base">
            Your answers have been recorded.
          </p>
        </div>
        <p className="text-gray-300 text-sm">Watch the screen to see how everyone did.</p>
      </div>
    </main>
  )
}
