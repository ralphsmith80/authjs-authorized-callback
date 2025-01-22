import { auth } from '@/auth'

export async function User() {
  const session = await auth()

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl">User</h1>
      {session ? (
        <p className="mt-4">Signed in as {session.user?.name}</p>
      ) : (
        <p className="mt-4">Not signed in</p>
      )}
    </div>
  )
}
