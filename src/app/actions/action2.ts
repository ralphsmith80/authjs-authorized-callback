'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function action2(courseId: number) {
  console.log('####action2 here 0', courseId)
  const session = await auth()
  if (!session) {
    redirect('/api/auth/signin')
  }
  console.log('####action2 here 1', courseId)
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return revalidatePath('/dashboard')
}
