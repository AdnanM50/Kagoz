"use client"

import * as React from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
        <Select value={year} onValueChange={val => handleChange("year", val)}>
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Month */}
        <Select value={month} onValueChange={val => handleChange("month", val)}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Month" />
          </SelectTrigger>
          <SelectContent>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Day */}
        <Select value={day} onValueChange={val => handleChange("day", val)}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {days.map((d) => (
              <SelectItem key={d} value={String(d)}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
