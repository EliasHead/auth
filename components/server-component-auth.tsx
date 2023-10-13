import { getCurrentUser } from "@/lib/session"

export const ServerComponentAuth = async () => {
  const user = await getCurrentUser()
  return (
    <>
      {
        user != undefined && (
          <div className="bg-slate-500 text-white border gap-2 h-60 max-w-md overflow-scroll">
            <h2>Server Component</h2>
            {JSON.stringify(user)}
          </div>
        )
      }
    </>
  )
}
