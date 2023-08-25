"use client"
import { CustomTabs } from "@/components/CustomTabs";
import Header from "@/components/header.component";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession()
  const router = useRouter()

  {
    if(session === null){
      return(
        <>
        <Header />
      <section className="bg-ct-blue-600 min-h-screen flex justify-center items-center">
        <div className="flex justify-center items-center">
          <div className="bg-white px-8 py-10">
             <CustomTabs />
          </div>
        </div>
      </section>
        </>
      )
    }else{
      return (
        router.push('/')
      )
    }
  }
 
}
