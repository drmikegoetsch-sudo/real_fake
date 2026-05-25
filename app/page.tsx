import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="flex flex-col items-center gap-10 text-center">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.25em] text-gray-400 uppercase">Challenge</p>
          <h1 className="text-5xl font-semibold tracking-tight text-black">
            Real or Fake?
          </h1>
          <p className="text-gray-400 text-base leading-relaxed max-w-xs">
            You'll see 3 images. Swipe right if you think it's real, left if it's fake.
          </p>
        </div>

        <Link
          href="/quiz"
          className="bg-black text-white text-base font-medium px-12 py-4 rounded-full hover:bg-gray-900 active:scale-95 transition-all duration-150"
        >
          Begin
        </Link>

        <div className="flex items-center gap-6 text-sm text-gray-300">
          <span>← Fake</span>
          <span>·</span>
          <span>Real →</span>
        </div>
      </div>
    </main>
  )
}
