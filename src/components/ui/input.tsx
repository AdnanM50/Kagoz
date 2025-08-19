"use client"
import * as React from "react"
import { LucideIcon, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: LucideIcon
  error?: string
  width?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, icon: Icon, error, width, ...props }, ref) => {
    const [mounted, setMounted] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    if (!mounted) {
      return (
        <div className="sm:h-11 h-9 rounded-[8px] bg-gray-100 animate-pulse" />
      )
    }

    // Determine max-width class
    const maxWidthClass = width ? `max-w-[${width}]` : "!max-w-[368px]"

    const isPassword = type === "password"
    const inputType = isPassword && showPassword ? "text" : type

    return (
      <div className={`space-y-1 ${maxWidthClass}`}>
        {label && (
          <label className="common-text !text-start text-[#111827]">{label}</label>
        )}

        <div
          className={cn(
            "flex items-center border rounded-[8px] px-3 py-2 !mt-2 bg-transparent",
            error ? "border-[#DC3545]" : "border-[#E4E4E4]",
            maxWidthClass,
            className
          )}
        >
          {Icon && <Icon className="size-5 text-[#949494] mr-2" />}
          <input
            ref={ref}
            type={inputType}
            defaultValue={props.defaultValue}
            placeholder={props.placeholder}
            className={cn(
              "w-full outline-none bg-transparent h-7 text-base placeholder:text-[#949494]"
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="ml-2 focus:outline-none"
            >
              {showPassword ? (
                <Eye className="size-5 text-[#949494]" />
              ) : (
                <EyeOff className="size-5 text-[#949494]" />
              )}
            </button>
          )}
        </div>

        {error && <p className="text-xs text-[#DC3545]">{error}</p>}
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }