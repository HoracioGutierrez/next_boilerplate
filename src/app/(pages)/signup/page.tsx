"use client"
import GoogleButton from "@/components/widgets/GoogleButton";
import { handleSignupForm } from "@/utils/serverActions";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { signupFormSchema, signupFormType } from "@/utils/yupSchemas";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Button from "@/components/widgets/Button";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

export default function SignUpPage() {

  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, setError } = useForm<signupFormType>({
    resolver: zodResolver(signupFormSchema)
  })

  
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setError("root", { message: "" })
    startTransition(async () => {
      try {

        const { name, username, email, password, repassword } = data

        const res = await handleSignupForm({
          name,
          username,
          email,
          password,
          repassword
        })

        if (!res) return setError("root", { message: "Something went wrong!" })


        toast.success("Account created successfully!")
        setTimeout(() => {
          router.push("/login")
        }, 2000)

      } catch (error) {
        setError("root", { message: "Something went wrong!" })
      }
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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative z-0">
            <input {...register("name")} name="name" type="text" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
          </div>

          <div className="relative z-0">
            <input {...register("username")} name="username" type="text" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="username" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
          </div>

          <div className="relative z-0">
            <input {...register("email")} name="email" type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>

          <div className="relative z-0">
            <input {...register("password")} name="password" type="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>

          <div className="relative z-0">
            <input {...register("repassword")} name="repassword" type="password" id="repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
            <label htmlFor="repassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Repeat Password</label>
            {errors.repassword && <span className="text-red-500">{errors.repassword.message}</span>}
          </div>


          <div>
            <Button>
              {isPending ? <div className="i-svg-spinners:180-ring-with-bg" /> : 'Sign up'}
            </Button>
          </div>
        </form>

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