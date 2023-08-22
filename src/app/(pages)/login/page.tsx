"use client"
import GoogleButton from "@/components/widgets/GoogleButton";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { loginFormSchema, loginFormType } from "@/utils/yupSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Button from "@/components/widgets/Button";


export default function LoginPage() {

  const { register, handleSubmit: handleSubmit, formState: { errors }, setError } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema)
  })
  const [isPending, setIsPending] = useState(false)

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    setError("root", { message: "" })
    setIsPending(true)

    const email = data.email
    const password = data.password

    signIn("credentials", { email, password, callbackUrl: "/" })
      .then((response) => {
        if (response && response.error) {
          setError("root", { message: "There was an error signing in. Please check the details and try again." })
        }

        if (response && response.url) {
          router.push(response.url)
        }

        setIsPending(false)

        toast.success("Signed in successfully! Redirecting...")

      })
      .catch((error) => {
        console.log(error)
        setError("root", { message: "There was an error signing in. Please check the details and try again." })
        setIsPending(false)
      })
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight light:text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errors.root && <span className="text-red-500 ">{errors.root.message}</span>}
        <form className="space-y-6 mt-8" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0">
            <input {...register("email")} name="email" type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10">Name</label>
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          <div className="relative z-0">
            <input {...register("password")} name="password" type="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>

          <div>
            <Button>
              {isPending ? <div className="i-svg-spinners:180-ring-with-bg" /> : 'Sign up'}
            </Button>
            <GoogleButton text="Sign In with Google" />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            create account
          </Link>
        </p>
        <p className="text-center text-sm text-gray-500">
          Forgot password?{' '}
          <Link href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            reset password
          </Link>
        </p>

      </div>
    </div>
  )
}