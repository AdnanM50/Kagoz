import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  placeholderIcon?: LucideIcon
  required?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, placeholderIcon: PlaceholderIcon, required, ...props }, ref) => {
    return (
      <div className="space-y-1 w-full">
        {label && (
          <label className="common-text !text-start text-[#111827] flex items-center">
            {label}
            {required && <span className="ml-1 text-red-600">*</span>}
          </label>
        )}
        <div className="flex items-start border rounded-[8px] px-3 py-2 !mt-2 bg-transparent">
          {PlaceholderIcon && <PlaceholderIcon className="size-5 text-[#949494] mr-2" />}
          <textarea
            ref={ref}
            placeholder={props.placeholder}
            required={required}
            className={cn(
              "w-full outline-none bg-transparent text-base placeholder:text-[#949494] resize-none",
              className
            )}
            {...props}
          />
        </div>
      </div>
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea }