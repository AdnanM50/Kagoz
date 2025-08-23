"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar, Copy, X } from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const dayAbbr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

interface TimeSlot {
  start: string
  end: string
}

interface DaySchedule {
  isOpen: boolean
  slots: TimeSlot[]
}

interface BusinessHoursData {
  is24Hours: boolean
  closedOnHolidays: boolean
  businessHours: Record<string, DaySchedule>
}

interface BusinessHoursStepProps {
  data: BusinessHoursData
  onUpdate: (data: BusinessHoursData) => void
  onNext: () => void
  onBack: () => void
}

const generateTimeOptions = () => {
  const times = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = new Date(2024, 0, 1, hour, minute)
      const formattedTime = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      times.push(formattedTime)
    }
  }
  return times
}

export default function BusinessHoursStep({ data, onUpdate, onNext, onBack }: BusinessHoursStepProps) {
  const [formData, setFormData] = useState<BusinessHoursData>(data)
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const timeOptions = generateTimeOptions()

  const validateTimeSlots = (day: string, slots: TimeSlot[]): string[] => {
    const dayErrors: string[] = []
    
    slots.forEach((slot, index) => {
      const startTime = new Date(`2024/01/01 ${slot.start}`).getTime()
      const endTime = new Date(`2024/01/01 ${slot.end}`).getTime()
      
      if (startTime >= endTime) {
        dayErrors.push(`Time slot ${index + 1}: End time must be after start time`)
      }

      // Check for overlapping time slots
      slots.forEach((otherSlot, otherIndex) => {
        if (index !== otherIndex) {
          const otherStartTime = new Date(`2024/01/01 ${otherSlot.start}`).getTime()
          const otherEndTime = new Date(`2024/01/01 ${otherSlot.end}`).getTime()
          
          if (
            (startTime >= otherStartTime && startTime < otherEndTime) ||
            (endTime > otherStartTime && endTime <= otherEndTime) ||
            (startTime <= otherStartTime && endTime >= otherEndTime)
          ) {
            dayErrors.push(`Time slot ${index + 1} overlaps with time slot ${otherIndex + 1}`)
          }
        }
      })
    })
    
    return dayErrors
  }

  const handleToggleDay = (day: string) => {
    const updatedHours = {
      ...formData.businessHours,
      [day]: {
        ...formData.businessHours[day],
        isOpen: !formData.businessHours[day].isOpen,
        slots: formData.businessHours[day].isOpen ? [] : [{ start: "9:00 AM", end: "5:00 PM" }]
      },
    }
    
    const newData = { ...formData, businessHours: updatedHours }
    setFormData(newData)
    onUpdate(newData)
  }

  const addTimeSlot = (day: string) => {
    const updatedHours = {
      ...formData.businessHours,
      [day]: {
        ...formData.businessHours[day],
        slots: [...formData.businessHours[day].slots, { start: "9:00 AM", end: "6:00 PM" }],
      },
    }
    
    const newData = { ...formData, businessHours: updatedHours }
    setFormData(newData)
    onUpdate(newData)
  }

  const removeTimeSlot = (day: string, index: number) => {
    const updatedHours = {
      ...formData.businessHours,
      [day]: {
        ...formData.businessHours[day],
        slots: formData.businessHours[day].slots.filter((_, i) => i !== index),
      },
    }
    
    const newData = { ...formData, businessHours: updatedHours }
    setFormData(newData)
    onUpdate(newData)
  }

  const updateTimeSlot = (day: string, index: number, field: 'start' | 'end', value: string) => {
    const updatedSlots = [...formData.businessHours[day].slots]
    updatedSlots[index] = { ...updatedSlots[index], [field]: value }
    
    const updatedHours = {
      ...formData.businessHours,
      [day]: {
        ...formData.businessHours[day],
        slots: updatedSlots,
      },
    }
    
    const newData = { ...formData, businessHours: updatedHours }
    setFormData(newData)
    onUpdate(newData)
  }

  const copyMonFriHours = () => {
    const mondayHours = formData.businessHours["Monday"]
    const updatedHours = {
      ...formData.businessHours,
      "Tuesday": { ...mondayHours },
      "Wednesday": { ...mondayHours },
      "Thursday": { ...mondayHours },
      "Friday": { ...mondayHours }
    }
    
    const newData = { ...formData, businessHours: updatedHours }
    setFormData(newData)
    onUpdate(newData)
  }

  const handleToggle24Hours = (checked: boolean) => {
    const updatedHours = { ...formData.businessHours }
    
    if (checked) {
      // When enabling 24/7, set all days to open with 24-hour slots
      days.forEach(day => {
        updatedHours[day] = {
          isOpen: true,
          slots: [{ start: "12:00 AM", end: "11:59 PM" }]
        }
      })
    } else {
      // When disabling 24/7, reset all days to closed
      days.forEach(day => {
        updatedHours[day] = {
          isOpen: false,
          slots: []
        }
      })
    }
    
    const newData = { 
      ...formData, 
      is24Hours: checked,
      businessHours: updatedHours 
    }
    setFormData(newData)
    onUpdate(newData)
  }

  const handleToggleHolidays = (checked: boolean) => {
    const newData = { ...formData, closedOnHolidays: checked }
    setFormData(newData)
    onUpdate(newData)
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string[]> = {}
    let isValid = true

    // Check if at least one day is selected when not 24/7
    if (!formData.is24Hours) {
      const hasOpenDay = Object.values(formData.businessHours).some(day => day.isOpen)
      if (!hasOpenDay) {
        newErrors.general = ["Please select at least one business day"]
        isValid = false
      }
    }

    // Validate time slots for each open day
    Object.entries(formData.businessHours).forEach(([day, schedule]) => {
      if (schedule.isOpen && !formData.is24Hours) {
        const dayErrors = validateTimeSlots(day, schedule.slots)
        if (dayErrors.length > 0) {
          newErrors[day] = dayErrors
          isValid = false
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
          <Calendar className="w-3 h-3 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Business Hours & Availability</h3>
      </div>
      <p className="text-gray-600 mb-6">When are you open?</p>

      {/* Day Selection */}
      <div>
        <Label className="text-sm font-medium">Days Open *</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {dayAbbr.map((day, index) => (
            <Button
              key={day}
              variant={formData.businessHours[days[index]]?.isOpen ? "default" : "outline"}
              size="sm"
              disabled={formData.is24Hours}
              className={`px-3 py-1 ${
                formData.businessHours[days[index]]?.isOpen
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "text-gray-600 bg-white border-gray-300"
              } ${formData.is24Hours ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleToggleDay(days[index])}
            >
              {day}
            </Button>
          ))}
        </div>
      </div>

      {/* Optional Toggles */}
      <div>
        <Label className="text-sm font-medium">Optional Toggles:</Label>
        <div className="space-y-3 mt-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="24-7" className="text-sm">24/7 Open</Label>
            <Switch
              id="24-7"
              checked={formData.is24Hours}
              onCheckedChange={handleToggle24Hours}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="holidays" className="text-sm">Closed on Public Holidays</Label>
            <Switch
              id="holidays"
              checked={formData.closedOnHolidays}
              onCheckedChange={handleToggleHolidays}
              disabled={formData.is24Hours}
              className={formData.is24Hours ? "opacity-50 cursor-not-allowed" : ""}
            />
          </div>
        </div>
        <button
          onClick={copyMonFriHours}
          disabled={formData.is24Hours}
          className={`flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 mt-2 ${
            formData.is24Hours ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <Copy className="w-3 h-3" />
          Copy Mon-Fri hours to all weekdays
        </button>
      </div>

      {/* Opening Hours */}
      <div className={`space-y-4 ${formData.is24Hours ? "opacity-50" : ""}`}>
        <Label className="text-sm font-medium">Opening Hours</Label>
        {errors.general && (
          <p className="text-sm text-red-500">{errors.general[0]}</p>
        )}
        <div className="space-y-4">
          {days.map((day) => (
            formData.businessHours[day]?.isOpen && (
              <div key={day} className="space-y-2">
                <Label className="text-sm font-medium">{day}:</Label>
                {errors[day] && (
                  <div className="space-y-1">
                    {errors[day].map((error, index) => (
                      <p key={index} className="text-sm text-red-500">{error}</p>
                    ))}
                  </div>
                )}
                <div className="space-y-2">
                  {formData.businessHours[day].slots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-20">Time Slot {index + 1}:</span>
                      <Select 
                        value={slot.start} 
                        onValueChange={(value) => updateTimeSlot(day, index, 'start', value)}
                        disabled={formData.is24Hours}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="text-sm">to</span>
                      <Select 
                        value={slot.end} 
                        onValueChange={(value) => updateTimeSlot(day, index, 'end', value)}
                        disabled={formData.is24Hours}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {timeOptions.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.businessHours[day].slots.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeTimeSlot(day, index)}
                          className="p-1 h-auto"
                          disabled={formData.is24Hours}
                        >
                          <X className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-600 hover:text-purple-700 p-0 h-auto"
                    onClick={() => addTimeSlot(day)}
                    disabled={formData.is24Hours}
                  >
                    + Add Another Time Slot
                  </Button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-8 py-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
        >
          Save & Back to Businesses
        </Button>
        <Button
          onClick={handleNext}
          className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  )
}
