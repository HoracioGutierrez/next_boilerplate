import authOptions from "@/auth/options"
import { getServerSession } from "next-auth"
import ProfileForm from "./ProfileForm"

export default async function ProfilePage() {

  const session = await getServerSession(authOptions)

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
      {session && session.user && <ProfileForm user={session.user} />}
    </div>
  )
}