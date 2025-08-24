"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Label } from "@/components/ui/label"
import { CheckIcon, ChevronDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export default function BusinessStartDate({
  id = "startingDate",
  label = "Business Starting Date",
  required = false,
  value = { year: "2025", month: "July", day: "12" },
  onChange = (val: { year: string; month: string; day: string }) => {},
}) {
  const years = Array.from({ length: 41 }, (_, i) => 2000 + i)
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ]
  const days = Array.from({ length: 31 }, (_, i) => i + 1)

  const [year, setYear] = React.useState<string>(value.year)
  const [month, setMonth] = React.useState<string>(value.month)
  const [day, setDay] = React.useState<string>(value.day)

  React.useEffect(() => {
    setYear(value.year)
    setMonth(value.month)
    setDay(value.day)
  }, [value])

  const handleChange = (type: "year" | "month" | "day", val: string) => {
    const newValue = { year, month, day, [type]: val }
    if (type === "year") setYear(val)
    if (type === "month") setMonth(val)
    if (type === "day") setDay(val)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex gap-2" id={id}>
        {/* Year */}
        <SelectPrimitive.Root value={year} onValueChange={val => handleChange("year", val)}>
          <SelectPrimitive.Trigger className="w-[100px] border-input !py-3 data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <SelectPrimitive.Value placeholder="Year" />
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon className="size-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1">
              <SelectPrimitive.Viewport className="p-1  h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] !py-3 scroll-my-1">
                {years.map((y) => (
                  <SelectPrimitive.Item key={y} value={String(y)} className="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2">
                    <span className="absolute right-2 flex size-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <CheckIcon className="size-4" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>{y}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {/* Month */}
        <SelectPrimitive.Root value={month} onValueChange={val => handleChange("month", val)}>
          <SelectPrimitive.Trigger className="w-[120px] border-input !py-3 data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <SelectPrimitive.Value placeholder="Month" />
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon className="size-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1">
              <SelectPrimitive.Viewport className="p-1 !py-3 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] !py-3 scroll-my-1">
                {months.map((m) => (
                  <SelectPrimitive.Item key={m} value={m} className="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2">
                    <span className="absolute right-2 flex size-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <CheckIcon className="size-4" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>{m}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        {/* Day */}
        <SelectPrimitive.Root value={day} onValueChange={val => handleChange("day", val)}>
          <SelectPrimitive.Trigger className="w-[80px] border-input !py-3 data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
            <SelectPrimitive.Value placeholder="Day" />
            <SelectPrimitive.Icon asChild>
              <ChevronDownIcon className="size-4 opacity-50" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content className="bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1">
              <SelectPrimitive.Viewport className="p-1 !py-3 h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] !py-3 scroll-my-1">
                {days.map((d) => (
                  <SelectPrimitive.Item key={d} value={String(d)} className="focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2">
                    <span className="absolute right-2 flex size-3.5 items-center justify-center">
                      <SelectPrimitive.ItemIndicator>
                        <CheckIcon className="size-4" />
                      </SelectPrimitive.ItemIndicator>
                    </span>
                    <SelectPrimitive.ItemText>{d}</SelectPrimitive.ItemText>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
      </div>
    </div>
  )
}
