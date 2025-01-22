'use server'

import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export async function action1(courseId: number) {
  console.log('#####action 1 here 0')
  const session = await auth()
  if (!session) {
    redirect('/api/auth/signin')
  }

  console.log('#####action 1 here 1')
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return { success: true, courseId }
}
