import { requireAuth } from '@engine/auth'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const user = await requireAuth()  // redirects to /login if not authenticated

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome, {user.email}</h1>
      <p className="mt-4 text-gray-600">This is your protected client dashboard.</p>
    </div>
  )
}
