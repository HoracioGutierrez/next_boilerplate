export const handleSignupForm = async (formData: FormData) => {
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const repassword = formData.get('repassword')

    if (!name || !email || !password || !repassword) throw new Error('All fields are required')

    if (password !== repassword) throw new Error('Passwords do not match')

    try {

        const request = await fetch("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, name })
        })

        const response = await request.json()

        if (response.error) throw new Error(response.error)

        return response
        
    } catch (error) {
        console.log(error)
        throw new Error('Something else went wrong')
    }
}