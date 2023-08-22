import { cn } from "@/utils"
import Button from "./Button"

type LabelProps = {
    htmlFor: string,
    text: string,
    className?: string
}

type FormControlProps = {
    label: string,
    id?: string,
    register?: any,
    error?: any,
    type ?: string
}

type InputProps = {
    className?: string,
    id?: string,
    register?: any,
    type ?: string
}

type FormProps = {
    children: any,
    onSubmit: any,
    sendText?: string | React.ReactNode
}


export const Label = ({ htmlFor = "test", text = "Test", className }: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className={cn("absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 capitalize", className)}>
            {text}
        </label>
    )
}


export const Input = ({ className , id , register , type = "text" }: InputProps) => {
    return (
        <input type={type} className={cn("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", className)} id={id} name={id} placeholder=" " {...register(id)}/>
    )
}


export const FormControl = ({ label , id = "test" , register , error , type}: FormControlProps) => {
    return (
        <div className="relative z-0">
            <Input id={id} register={register} type={type}/>
            <Label htmlFor={id} text={label} />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    )
}

export const Form = ({ children , onSubmit , sendText = "send" }: FormProps) => {
    return (
        <form className="space-y-6 mt-8" onSubmit={onSubmit}>
            {children}
            <div>
                <Button>{sendText}</Button>
            </div>
        </form>
    )
}