import { profileFormType, signupFormSchema } from "./yupSchemas"

export const handleSignupFormValidation = async (data: { name: string, email: string, password: string, repassword: string, username: string }) => {

    const validationResult = await signupFormSchema.safeParseAsync(data)

    let zodErrors = {}

    if (!validationResult.success) {
        validationResult.error.issues.forEach(issue => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })

        return { success: false, errors: zodErrors }
    }

    try {
        await handleSignupFormRequest(data)
        return { success: true }
    } catch (error) {
        return { success: false, errors: { server: 'Server error' } }
    }
}

export const handleSignupFormRequest = async (data: { name: string, email: string, password: string, repassword: string, username: string }) => {
    
    try {

        const request = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data })
        })

        const response = await request.json()

        console.log(response)

        if (response.error) throw new Error(response.error)

        return response
        
    } catch (error) {
        throw new Error('Something else went wrong')
    }
}

export const handleUploadAvatar = async (file: any,data:any) => {
    data.image = file[0].fileUrl
    try {
        const res = await fetch("/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data }),
            cache : "no-store"
        })

        if (res.status !== 200) return { error: "Something went wrong!" }

        const { newUser } = await res.json()

        return { newUser }
    } catch (error) {
        return { error: "Something went wrong!" }
    }
}

export async function handleUpdateData(data: profileFormType) {
    try {
        const res = await fetch("/api/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...data }),
            cache : "no-store"
        })
    
        if (res.status !== 200) return { error: "Something went wrong!" }
    
        const { newUser } = await res.json()
    
        return { newUser }
    } catch (error) {
        return { error: "Something went wrong!" }
    }
}

