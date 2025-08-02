import StartUpForm from "@/app/components/StartUpForm"
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page =async () => {
  const session = await auth();
  if(!session) redirect('/login');
  return (
    < >
     <section className="pink_container !min-h-[230px]">
      <h1 className="heading"> Submit your startup idea</h1>
     </section>
      <StartUpForm/>
    </>
  )
}

export default page