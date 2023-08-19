"use server"

import { handleSignupForm as handleSignupFormClient } from "./actions"

export const handleSignupForm = async (data: { name: string, email: string, password: string, repassword: string, username: string }) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('username', data.username)
    formData.append('repassword', data.repassword)
    try {
        await handleSignupFormClient(formData)
        return true
    } catch (error) {
        console.log({ error  })
        return false
    }
}

