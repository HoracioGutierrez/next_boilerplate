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
    type?: string,
    disabled?: boolean
}

type InputProps = {
    className?: string,
    id?: string,
    register?: any,
    type?: string,
    disabled?: boolean
}

type FormProps = {
    children: any,
    onSubmit: any,
    sendText?: string | React.ReactNode,
    disabled?: boolean
}


export const Label = ({ htmlFor = "test", text = "Test", className }: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className={cn("absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-10 capitalize", className)}>
            {text}
        </label>
    )
}


export const Input = ({ className, id, register, type = "text", disabled = false }: InputProps) => {
    return (
        <input disabled={disabled} type={type} className={cn("block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer", className , disabled && "text-gray-400!")} id={id} name={id} placeholder=" " {...register(id)} />
    )
}


export const FormControl = ({ label, id = "test", register, error, type, disabled = false }: FormControlProps) => {
    return (
        <div className="relative z-0">
            <Input id={id} register={register} type={type} disabled={disabled} />
            <Label htmlFor={id} text={label} />
            {error && <span className="text-red-500">{error}</span>}
        </div>
    )
}

export const Form = ({ children, onSubmit, sendText = "send", disabled = false }: FormProps) => {
    console.log(disabled)
    return (
        <form className="space-y-6 mt-8" onSubmit={onSubmit}>
            {children}
            <div>
                <Button disabled={disabled}>{sendText}</Button>
            </div>
        </form>
    )
}