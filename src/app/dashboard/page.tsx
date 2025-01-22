import Action1Form from '@/app/dashboard/Action1Form'
import { Action2Form } from '@/app/dashboard/Action2Form'
import { User } from '@/app/dashboard/User'

export default function Dashboard() {
  return (
    <div className="grid center gap-10">
      <Action1Form />
      <Action2Form course={123} />
      <User />
    </div>
  )
}
