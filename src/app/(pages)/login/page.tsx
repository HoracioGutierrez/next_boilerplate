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
import { Form, FormControl } from "@/components/widgets/FormComponents";


export default function LoginPage() {

  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const { register, handleSubmit: handleSubmit, formState: { errors }, setError } = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema)
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    setError("root", { message: "" })
    setIsPending(true)

    signIn("credentials", { email: data.email, password: data.password, callbackUrl: "/" })
      .then((response) => {
        if (response && response.error) {
          setError("root", { message: "There was an error signing in. Please check the details and try again." })
        }

        if (response && response.url) {
          toast.success("Signed in successfully! Redirecting...")
          router.push(response.url)
        }
      })
      .catch((error) => {
        setError("root", { message: "There was an error signing in. Please check the details and try again." })
      })
      .finally(() => {
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
        <Form
          sendText={isPending ? <div className="i-svg-spinners:180-ring-with-bg" /> : 'Sign in'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl label="email" id="email" register={register} error={errors.email?.message} type="email" />
          <FormControl label="password" id="password" register={register} error={errors.password?.message} type="password" />
        </Form>
        <GoogleButton text="Sign In with Google" />

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