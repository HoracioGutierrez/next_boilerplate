"use client"
import GoogleButton from "@/components/widgets/GoogleButton";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signupFormSchema, signupFormType } from "@/utils/yupSchemas";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Form, FormControl } from "@/components/widgets/FormComponents";
import { handleSignupFormValidation } from "@/utils/actions";

export default function SignUpPage() {

  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, setError } = useForm<signupFormType>({
    resolver: zodResolver(signupFormSchema)
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {

    setError("root", { message: "" })
    setIsPending(true)

    const { name, username, email, password, repassword } = data

    handleSignupFormValidation({
      name,
      username,
      email,
      password,
      repassword
    })
      .then((res) => {
        if (!res) return setError("root", { message: "Something went wrong!" })
        toast.success("Account created successfully!")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      })
      .catch((error) => {
        setError("root", { message: "Something went wrong!" })
      })
      .finally(() => {
        setIsPending(false)
      })
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight light:text-gray-900">
          Create new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errors.root && <p className="text-sm text-red-500 text-center">{errors.root.message}</p>}
        <Form
          sendText={isPending ? <div className="i-svg-spinners:180-ring-with-bg" /> : 'Sign up'}
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl label="Name" id="name" register={register} error={errors.name?.message} />
          <FormControl label="Username" id="username" register={register} error={errors.username?.message} />
          <FormControl label="Email" id="email" register={register} error={errors.email?.message} />
          <FormControl label="Password" id="password" register={register} error={errors.password?.message} type="password" />
          <FormControl label="Repeat Password" id="repassword" register={register} error={errors.repassword?.message} type="password" />
        </Form>

        <GoogleButton />

        <p className="mt-10 text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            log in
          </Link>
        </p>
      </div>
    </div>
  )
}