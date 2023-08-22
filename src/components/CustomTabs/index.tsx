"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useCallback, useState } from "react";

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
  const { toast } = useToast();

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
          throw new Error("Request failed");
        }
        if (!resp.error) {
          setLoading(true);
          router.push("/");
          toast({
            description: "Sign In Successfully",
          });
          // localStorage.setItem(TOKEN, resp?.data.token);
        }
      } catch (error: any) {
        if (resp.error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast({
            description: `${errorMessage} ${errorCode}`,
          })
        }
      }
      // console.log(resp, "resp");
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-2 pt-6 pb-0">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input {...field} id="email" />
                    {errors.email && (
                      <span className="text-red-500">
                        {String(errors.email.message)}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input {...field} id="password" type="password" />
                    {errors.password && (
                      <span className="text-red-500">
                        {String(errors.password.message)}
                      </span>
                    )}
                  </div>
                )}
              />

              <CardFooter className="p-0 pt-6">
                <Button type="submit">Login</Button>
              </CardFooter>
            </CardContent>
          </form>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-2 pt-6">
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input {...field} id="email" />
                    {errors.email && (
                      <span className="text-red-500">
                        {String(errors.email.message)}
                      </span>
                    )}
                  </div>
                )}
              />

              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <Input {...field} id="password" type="password" />
                    {errors.password && (
                      <span className="text-red-500">
                        {String(errors.password.message)}
                      </span>
                    )}
                  </div>
                )}
              />

              <CardFooter className="p-0 pt-6">
                <Button type="submit">Login</Button>
              </CardFooter>
            </CardContent>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
