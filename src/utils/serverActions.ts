"use server"

import { handleSignupForm as handleSignupFormClient } from "./actions"
import { signupFormSchema } from "./yupSchemas"

export const handleSignupForm = async (data: { name: string, email: string, password: string, repassword: string, username: string }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('username', data.username)
    formData.append('repassword', data.repassword)

    const validationResult = await signupFormSchema.safeParseAsync(data)

    let zodErrors = {}

    if (!validationResult.success) {
        validationResult.error.issues.forEach(issue => {
            zodErrors = { ...zodErrors, [issue.path[0]]: issue.message }
        })

        return { success: false, errors: zodErrors }
    }

    try {
        await handleSignupFormClient(formData)
        return { success: true }
    } catch (error) {
        return { success: false, errors: { server: 'Server error' } }
    }
}

