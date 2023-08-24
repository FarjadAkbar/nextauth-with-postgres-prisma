import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller } from "react-hook-form";

interface LoginFormProps {
  handleSubmit: (onSubmit: any) => void;
  control: any;
  errors: any;
}

export default function LoginForm(props: LoginFormProps) {
  return (
    <form onSubmit={props.handleSubmit}>
      <CardContent className="space-y-2 pt-6 pb-0">
        <Controller
          name="email"
          control={props.control}
          defaultValue=""
          render={({ field }) => (
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input {...field} id="email" />
              {props.errors.email && (
                <span className="text-red-500">
                  {String(props.errors.email.message)}
                </span>
              )}
            </div>
          )}
        />

        <Controller
          name="password"
          control={props.control}
          defaultValue=""
          render={({ field }) => (
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input {...field} id="password" type="password" />
              {props.errors.password && (
                <span className="text-red-500">
                  {String(props.errors.password.message)}
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
  );
}
