'use client'

import { useState } from 'react'
import { action1 } from '@/app/actions/action1'

export default function Action1Form() {
  const [status, setStatus] = useState<string | null>(null)

  const handleClaim = async () => {
    setStatus('Processing...')
    try {
      const response = await action1(123)
      setStatus(`Success: Claimed Course ID ${response.courseId}`)
    } catch (error) {
      console.error(error)
      setStatus('Error: Please sign in.')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">Server Action Test</h1>
      <button
        onClick={handleClaim}
        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Claim Resources
      </button>
      {status && <p className="mt-4">{status}</p>}
    </div>
  )
}
