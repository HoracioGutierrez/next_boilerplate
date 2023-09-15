"use client"
import Button from "@/components/widgets/Button"
import { Form, FormControl, Input } from "@/components/widgets/FormComponents"
import { profileFormSchema, profileFormType } from "@/utils/yupSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type Props = {
    user: any
}

export default function ProfileForm({ user }: Props) {


    const { register, handleSubmit: handleSubmit, formState: { errors, isSubmitting }, setError, setValue } = useForm<profileFormType>({
        resolver: zodResolver(profileFormSchema)
    })

    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        setValue("name", user.name)
        setValue("username", user.username)
        setValue("email", user.email)
    }, [])

    const toggleDisabled = () => {
        setDisabled(!disabled)
    }

    const onSubmit = async (data: profileFormType) => {

        setError("root", { message: "" })

        try {

            const res = await fetch("/api/user", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...data })
            })

            if (res.status !== 200) return setError("root", { message: "Something went wrong!" })

            const { newUser } = await res.json()

            setValue("name", newUser.name)
            setValue("username", newUser.username)
            setValue("email", newUser.email)

            toast.success("Profile updated successfully!")
            toggleDisabled()

        } catch (error) {
            setError("root", { message: "Something went wrong!" })
        }
    }

    return (
        <div>
            {errors.root && <p className="text-sm text-red-500 text-center">{errors.root.message}</p>}
            <Form onSubmit={handleSubmit(onSubmit)} sendText={isSubmitting ? <div className="i-svg-spinners:180-ring-with-bg" /> : 'save'} disabled={disabled}>
                <FormControl label="Name" id="name" register={register} error={errors.name?.message} disabled={disabled} />
                <FormControl label="Username" id="username" register={register} error={errors.username?.message} disabled={disabled} />
                <FormControl label="Email" id="email" register={register} error={errors.email?.message} disabled={disabled} />
                <FormControl label="Password" id="password" register={register} error={errors.password?.message} type="password" disabled={disabled} />
                <Button type="button" onClick={toggleDisabled} className={!disabled ? "bg-red-500" : ""}>{disabled ? "edit" : "cancel"}</Button>
            </Form>
        </div>
    )
}