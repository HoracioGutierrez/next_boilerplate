import { cn } from "@/utils"

type Props = {
    children: React.ReactNode,
    type?: "submit" | "button" | "reset",
    onClick?: (e: any) => void,
    disabled?: boolean,
    className?: string
}
function Button({ children, type = "submit", onClick, disabled = false , className }: Props) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn("flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", disabled && "bg-gray-400!" , className)}
        >
            {children}
        </button>
    )
}
export default Button