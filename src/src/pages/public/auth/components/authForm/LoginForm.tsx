import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
/* import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react' */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/custom/button";
import { cn } from "@/lib/utils";
import { PasswordInput } from "@/components/form/password-input";
import { useAuth } from "@/context/authContext";
import { toast } from "@/components/ui/use-toast";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}
/* interface LoginFormData {
  username: string;
  password: string;
} */

const loginformSchema = z.object({
  username: z.string().min(1, { message: "Please enter your email" }),

  password: z
    .string()
    .min(1, {
      message: "Please enter your password",
    })
    .min(7, {
      message: "Password must be at least 7 characters long",
    }),
});
export type loginFormSchemaType = z.infer<typeof loginformSchema>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const { loginMutation } = useAuth();
  const navigate = useNavigate();
  const form = useForm<loginFormSchemaType>({
    resolver: zodResolver(loginformSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data: loginFormSchemaType) {
    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update user. Please try again.",
        });
      },
    });
  }
  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="calfonso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-muted-foreground hover:opacity-75"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-2" /* loading={isLoading} */>Login</Button>
            {/* 
            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div> */}

            {/*  <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandGithub className='h-4 w-4' />}
              >
                GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                loading={isLoading}
                leftSection={<IconBrandFacebook className='h-4 w-4' />}
              >
                Facebook
              </Button>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  );
}
