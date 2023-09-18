"use client"
import Button from "@/components/widgets/Button"
import { Form, FormControl, Input } from "@/components/widgets/FormComponents"
import { profileFormSchema, profileFormType } from "@/utils/yupSchemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { UploadButton } from "@/components/widgets/uploadthing"
import Image from "next/image"
import { handleUpdateData, handleUploadAvatar } from "@/utils/actions"
import "@uploadthing/react/styles.css";

type ProfileFormProps = {
    user: any
}

export default function ProfileForm({ user }: ProfileFormProps) {


    const [disabled, setDisabled] = useState(true)
    const { register, handleSubmit: handleSubmit, formState: { errors, isSubmitting }, setError, setValue, getValues } = useForm<profileFormType>({
        resolver: zodResolver(profileFormSchema)
    })

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
        const newUserResponse = await handleUpdateData(data)
        if (newUserResponse.error) return setError("root", { message: newUserResponse.error })
        const { newUser } = newUserResponse
        setValue("name", newUser.name)
        setValue("username", newUser.username)
        setValue("email", newUser.email)
        toast.success("Profile updated successfully!")
        toggleDisabled()
    }

    const handleUpload = async (file: any) => {
        const data = getValues()
        const newUserResponse = await handleUploadAvatar(file, data)
        if (newUserResponse.error) return setError("root", { message: newUserResponse.error })
        toast.success("Profile updated successfully!")
        toggleDisabled()
    }

    return (
        <div>
            <Image
                src={user.image as string || "https://api.dicebear.com/6.x/initials/svg?seed=" + user.email}
                alt={user.name as string || user.email as string}
                width={150}
                height={150}
                className="rounded-[50%] mx-auto h-[150px] mb-4"
            />
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={file => {
                    handleUpload(file)
                }}
                onUploadError={error => {
                    console.log(error)
                    console.log("upload error")
                }}
            />
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