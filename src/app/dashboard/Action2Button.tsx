'use client'

import Image from 'next/image'
import { useFormStatus } from 'react-dom'
import loader from '@/app/dashboard/loader.svg'

const LoaderIcon = () => (
  <Image
    src={loader.src}
    alt="loader"
    width={20}
    height={20}
    className="animate-spin"
  />
)

export function Action2Button() {
  const { pending } = useFormStatus()

  return (
    <span className="flex items-center justify-center gap-4">
      <button
        type="submit"
        className="flex items-center justify-center gap-4 mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        <>
          {'Claim Resources'}
          {pending && <LoaderIcon />}
        </>
      </button>
    </span>
  )
}
