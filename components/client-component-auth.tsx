'use client'
import { useSession} from "next-auth/react"

export const ClientComponentAuth = () => {
  const session = useSession()
  return (
    <>
      {
        session?.data && (
          <div className="bg-slate-50 border gap-2 h-60 max-w-md overflow-scroll">
            <h2>Client Component</h2>
            {JSON.stringify(session)}
          </div>
        )
      }
    </>
  )
}
