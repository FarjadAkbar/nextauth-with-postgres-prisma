"use client";

import { signIn } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Role } from "@prisma/client";

const FormSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z
      .string()
      .email({ message: "Email must be a valid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Please re-enter password correctly" }),
    role: z.string().optional(),
    mobileNumber: z
      .string()
      .min(10, { message: "Mobile number must be at least 10 characters" })
      .max(11, {
        message: "Mobile number must not be more than 11 characters",
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export const RegisterForm = () => {
  const router=useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/profile";
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isVerified: false,
    role: "",
    mobileNumber: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const handleAdmin = () => {
    setIsAdmin((prev) => !prev);
  };

  const roleValue = [
    { key: Role.MANAGER, value: Role.MANAGER },
    { key: Role.EMPLOYEE, value: Role.EMPLOYEE },
  ];

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setLoading(true);

    setFormValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      isVerified: false,
      mobileNumber: "",
    });

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res?.ok) {
        toast({
          title: "Register successfully",
        });
        router?.push("/login");
      } else {
        toast({
          title: "Something went wrong.",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Something went wrong.",
        description: error,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <>
                  <FormItem style={{ width: "100%" }}>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <>
                  <FormItem style={{ width: "100%" }}>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <>
                  <FormItem style={{ width: "100%" }}>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <>
                  <FormItem style={{ width: "100%" }}>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password again"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          </div>


          <div className="flex items-center space-x-2">
            <Checkbox onCheckedChange={handleAdmin} id="admin" />
            <label
              htmlFor="admin"
              className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Are you an admin
            </label>
          </div>
          {isAdmin && (
            <>
              <div className="flex items-center space-x-2">
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <>
                      <FormItem style={{ width: "100%" }}>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {
                                roleValue && roleValue.map((item) => (
                                  <SelectItem key={item.key} value={item.key}>
                                    {item.value}
                                  </SelectItem>
                                
                                ))
                              }
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <>
                      <FormItem style={{ width: "100%" }}>
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your mobile number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </>
          )}

          <Button className="w-full uppercase py-6" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
        <p className="text-center font-semibold mx-4 mb-0">OR</p>
      </div>
          
          { !isAdmin && (<a
            className="px-7 py-2 mt-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
            style={{ backgroundColor: "#000" }}
            onClick={() => signIn("google", { callbackUrl })}
            role="button"
          >
            <img
              className="pr-2"
              src="/images/google.svg"
              alt=""
              style={{ height: "2rem" }}
            />
            Continue with Google
          </a>)}
      
    </>
  );
};
