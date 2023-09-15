"use client"
import Button from "@/components/widgets/Button"
import { Form, FormControl, Input } from "@/components/widgets/FormComponents"
import { profileFormSchema, profileFormType } from "@/utils/yupSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

type Props = {
    user: any
}

export default function ProfileForm({ user }: Props) {


    const { register, handleSubmit: handleSubmit, formState: { errors }, setError, setValue } = useForm<profileFormType>({
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
        console.log(data)
        setError("root", { message: "" })
    }


    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)} sendText="save" disabled={disabled}>
                <FormControl label="Name" id="name" register={register} error={errors.name?.message} disabled={disabled} />
                <FormControl label="Username" id="username" register={register} error={errors.username?.message} disabled={disabled} />
                <FormControl label="Email" id="email" register={register} error={errors.email?.message} disabled={disabled} />
                <Button type="button" onClick={toggleDisabled} className={!disabled ? "bg-red-500" : ""}>{disabled ? "edit" : "cancel"}</Button>
            </Form>
        </div>
    )
}