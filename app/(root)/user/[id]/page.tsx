import { auth } from "@/auth"
import { client } from "@/sanity/lib/client"
import { autherByGithub } from "@/sanity/lib/queries"
import { notFound } from "next/navigation"

const page = async ({params}:{params:Promise<{id:string}>}) => {
  const {id} = await params
  const session =  await auth()

  const user = await client.fetch(autherByGithub ,{id})

  if(!user) return notFound()
  return (
    <div>page</div>
  )
}

export default page