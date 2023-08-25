"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useCallback, useState } from "react";
import LoginForm from "../loginForm";
import { toast } from "@/components/ui/use-toast";

const schema = z.object({
  email: z
    .string()
    .nonempty("Field is required")
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .nonempty("This is required")
    .min(8, { message: "Too short" }),
});

export function CustomTabs() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";

  const onSubmit = useCallback(
    async (data: any) => {
      if (!loading) {
        setLoading(true);
      }
      const resp: any = await signIn("credentials", {
        ...data,
        redirect: false,
      });
      try {
        setLoading(true);
        if (!resp?.ok) {
          setLoading(false);
        }
        if (!resp.error) {
          setLoading(true);
          toast({
            title: "Sign in successfully."
          });
          router.push("/");
        } else {
          toast({
            title: `${resp.error}`,
            variant: "destructive",
          });
        }
      } catch (error: any) {
        toast({
          title: "Something went wrong",
          description: error,
          variant: "destructive",
        });
      }
    },
    [loading, router]
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  return (
    <Tabs defaultValue="email" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="email">User</TabsTrigger>
        <TabsTrigger value="password">Admin</TabsTrigger>
      </TabsList>
      <TabsContent value="email">
        <Card>
          <LoginForm
            control={control}
            errors={errors}
            handleSubmit={handleSubmit(onSubmit)}
          />
          <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
            <p className="text-center font-semibold mx-4 mb-0">OR</p>
          </div>

          <div className="p-6 pt-0">
            <a
              className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
              style={{ backgroundColor: "#3b5998" }}
              onClick={() => signIn("google", { callbackUrl })}
              role="button"
            >
              <Image
                className="pr-2"
                src="/images/google.svg"
                alt=""
                width={32}
                height={32}
              />
              Continue with Google
            </a>
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <LoginForm
            control={control}
            errors={errors}
            handleSubmit={handleSubmit(onSubmit)}
          />
        </Card>
      </TabsContent>
    </Tabs>
  );
}
