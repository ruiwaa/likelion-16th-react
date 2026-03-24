import { useEffect, useState } from 'react'

export default function CurrentTime() {
  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const timer = setInterval(() => setNow(getNow()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <p>
      현재 시간: <time>{now.toLocaleTimeString()}</time>
    </p>
  )
}

function getNow() {
  return new Date()
}