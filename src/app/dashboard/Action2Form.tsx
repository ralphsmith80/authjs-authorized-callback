import { action2 } from '@/app/actions/action2'
import { Action2Button } from '@/app/dashboard/Action2Button'

export function Action2Form({ course }: { course: number }) {
  return (
    <form
      action={action2.bind(null, course)}
      className="flex flex-col items-center justify-center"
    >
      <Action2Button />
    </form>
  )
}
