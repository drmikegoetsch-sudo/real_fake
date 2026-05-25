// true = REAL, false = FAKE
// Update these with your actual answers before the event
export const CORRECT_ANSWERS: boolean[] = [true, false, true]

export const QUESTIONS = [
  { id: 1, src: '/images/q1.png', alt: 'Question 1' },
  { id: 2, src: '/images/q2.png', alt: 'Question 2' },
  { id: 3, src: '/images/q3.png', alt: 'Question 3' },
]

export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://your-app.vercel.app'
