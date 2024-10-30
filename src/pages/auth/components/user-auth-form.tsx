import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
/* import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react' */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import useAuth from '@/hooks/useAuth'
import { loginServicePrueba } from '@/services/auth'
/* import { loginService, loginServicePrueba } from '@/utility/services/auth'
import { useQueryLogin } from '@/utility/hooks/react-query/useQuerysAuth' */

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  username: z.string().min(1, { message: 'Please enter your email' }),

  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { createSession } = useAuth()
  const navigate = useNavigate()
  /*  const { mutateAsync: loginService, isLoading } = useQueryLogin() */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    /* 
  Request
  {
      "action":"authorize",
      "grant_type":"password",
      "username":"commerce@email.com",
      "password":"123456",
      "audience":"https://api.dev.alignet.io",
      "client_id":"yhaPE3jtHXHMKUZBBFr9QS1x1FaXxr",
      "client_secret":"uTCetT3d4T-1NgXyTO66C0850xLJ5c7CwoyXm23NALxZ-MbwQxkqs1Q9ThwWfE",
      "scope":"create:token post:charges offline_access"
   }
      Response
   {
   "action":"authorize",
   "success":true,
   "access_token":"eyJhbGciOiJSUzI1NsInR5cCI6IkpXVCIsImtpZCI6IlVfR2ZLY.........",
   "scope":"create:token post:charges offline_access",
   "refresh_token":"p11tyL00fVo0EFd68qzQyBEDojWCuG8zyhQCA1B9_zL5zwZ.........",
   "expires_in":86400,
   "token_type":"Bearer",
   "authorization":{
      "meta":{
         "status":{
            "code":"00",
            "message_ilgn":[
               {
                  "locale":"es_PE",
                  "value":"Access Token creado"
               }
            ]
         }
      }
   }
}
   */
    setIsLoading(true)
    try {
      const userSession = loginServicePrueba(data)
      if (!userSession) throw new Error('Usuario igual a null')
      if (
        userSession.user &&
        userSession.accessToken &&
        userSession.refreshAccessToken &&
        userSession.roles
      ) {
        createSession(
          userSession.user,
          userSession.accessToken,
          userSession.refreshAccessToken,
          userSession.roles
        )
      } else {
        throw new Error(
          'Error valores nulos no permitidos en la session de usuario'
        )
      }
      // Redirigir al dashboard después de iniciar sesión
      navigate('/')
    } catch (error) {
      console.log(error)
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='calfonso' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isLoading}>
              Login
            </Button>
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
  )
}
