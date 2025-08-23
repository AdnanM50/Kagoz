"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calendar, Copy, X, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const dayAbbr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

// Generate time options from 12:00 AM to 11:59 PM
const generateTimeOptions = () => {
  const times = []
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = new Date()
      time.setHours(hour, minute, 0, 0)
      const timeString = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
      times.push(timeString)
    }
  }
  return times
}

const timeOptions = generateTimeOptions()

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

export default function BusinessHoursStep({ data, onUpdate, onNext, onBack }: BusinessHoursStepProps) {
  const [formData, setFormData] = useState<BusinessHoursData>(data)
  const [errors, setErrors] = useState<Record<string, string[]>>({})

  // Initialize business hours if not already set
  useEffect(() => {
    const initializedData = { ...formData }
    let needsUpdate = false

    days.forEach(day => {
      if (!initializedData.businessHours[day]) {
        initializedData.businessHours[day] = {
          isOpen: day !== "Friday", // Default: closed on Friday
          slots: [{ start: "9:00 AM", end: "6:00 PM" }]
        }
        needsUpdate = true
      }
    })

    if (needsUpdate) {
      setFormData(initializedData)
      onUpdate(initializedData)
    }
  }, [])

  const validateTimeSlot = (start: string, end: string): boolean => {
    const startTime = new Date(`2000-01-01 ${start}`)
    const endTime = new Date(`2000-01-01 ${end}`)
    return endTime > startTime
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string[]> = {}
    let isValid = true

    // Check if at least one day is selected
    const hasOpenDays = days.some(day => formData.businessHours[day]?.isOpen)
    if (!hasOpenDays && !formData.is24Hours) {
      newErrors.general = ["Please select at least one day or enable 24/7 mode"]
      isValid = false
    }

    // Validate time slots for each day
    days.forEach(day => {
      if (formData.businessHours[day]?.isOpen) {
        const dayErrors: string[] = []
        formData.businessHours[day].slots.forEach((slot, index) => {
          if (!validateTimeSlot(slot.start, slot.end)) {
            dayErrors.push(`Time slot ${index + 1}: End time must be after start time`)
            isValid = false
          }
        })
        if (dayErrors.length > 0) {
          newErrors[day] = dayErrors
        }
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleToggleDay = (day: string) => {
    const updatedHours = {
      ...formData.businessHours,
      [day]: {
        ...formData.businessHours[day],
        isOpen: !formData.businessHours[day].isOpen,
        // Initialize with default slot if opening the day
        slots: !formData.businessHours[day].isOpen ? [{ start: "9:00 AM", end: "6:00 PM" }] : formData.businessHours[day].slots
      },
    }
    
    const newData = { ...formData, businessHours: updatedHours }
    setFormData(newData)
    onUpdate(newData)
    
    // Clear errors for this day
    if (errors[day]) {
      const newErrors = { ...errors }
      delete newErrors[day]
      setErrors(newErrors)
    }
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
    if (formData.businessHours[day].slots.length <= 1) return // Don't remove the last slot
    
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
    
    // Clear errors for this day when user makes changes
    if (errors[day]) {
      const newErrors = { ...errors }
      delete newErrors[day]
      setErrors(newErrors)
    }
  }

  const copyMonFriHours = () => {
    const mondayHours = formData.businessHours["Monday"]
    if (!mondayHours?.isOpen) {
      alert("Please set Monday hours first before copying")
      return
    }
    
    const updatedHours = {
      ...formData.businessHours,
      "Tuesday": { ...mondayHours },
      "Wednesday": { ...mondayHours },
      "Thursday": { ...mondayHours },
      "Friday": { ...mondayHours },
    }
    
    const newData = { ...formData, businessHours: updatedHours }
    setFormData(newData)
    onUpdate(newData)
  }

  const handleToggle24Hours = (checked: boolean) => {
    const newData = { ...formData, is24Hours: checked }
    setFormData(newData)
    onUpdate(newData)
    
    // Clear general errors when toggling 24/7
    if (errors.general) {
      const newErrors = { ...errors }
      delete newErrors.general
      setErrors(newErrors)
    }
  }

  const handleToggleHolidays = (checked: boolean) => {
    const newData = { ...formData, closedOnHolidays: checked }
    setFormData(newData)
    onUpdate(newData)
  }

  const handleNext = () => {
    if (validateForm()) {
      onNext()
    }
  }

  const handleSaveAndBack = () => {
    if (validateForm()) {
      // Save and go back to businesses list
      onBack()
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

      {/* General Errors */}
      {errors.general && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          {errors.general.map((error, index) => (
            <p key={index} className="text-red-600 text-sm">{error}</p>
          ))}
        </div>
      )}

      {/* 24/7 Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-600" />
          <Label htmlFor="24-7" className="text-sm font-medium">24/7 Open</Label>
        </div>
        <Switch
          id="24-7"
          checked={formData.is24Hours}
          onCheckedChange={handleToggle24Hours}
        />
      </div>

      {/* Day Selection - Only show if not 24/7 */}
      {!formData.is24Hours && (
        <div>
          <Label className="text-sm font-medium">Days Open *</Label>
          <div className="flex flex-wrap gap-2 mt-2">
            {dayAbbr.map((day, index) => (
              <Button
                key={day}
                variant={formData.businessHours[days[index]]?.isOpen ? "default" : "outline"}
                size="sm"
                className={`px-3 py-1 ${
                  formData.businessHours[days[index]]?.isOpen
                    ? "bg-purple-600 hover:bg-purple-700 text-white"
                    : "text-gray-600 bg-white border-gray-300"
                }`}
                onClick={() => handleToggleDay(days[index])}
              >
                {day}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Optional Toggles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <Label htmlFor="holidays" className="text-sm font-medium">Closed on Public Holidays</Label>
          <Switch
            id="holidays"
            checked={formData.closedOnHolidays}
            onCheckedChange={handleToggleHolidays}
          />
        </div>
        
        {!formData.is24Hours && (
          <Button
            onClick={copyMonFriHours}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 border-purple-200"
          >
            <Copy className="w-3 h-3" />
            Copy Mon-Fri hours to all weekdays
          </Button>
        )}
      </div>

      {/* Opening Hours - Only show if not 24/7 */}
      {!formData.is24Hours && (
        <div className="space-y-4">
          <Label className="text-sm font-medium">Opening Hours</Label>
          <div className="space-y-4">
            {days.map((day) => (
              formData.businessHours[day]?.isOpen && (
                <Card key={day} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-900">{day}:</Label>
                      
                      {/* Day-specific errors */}
                      {errors[day] && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-2">
                          {errors[day].map((error, index) => (
                            <p key={index} className="text-red-600 text-xs">{error}</p>
                          ))}
                        </div>
                      )}
                      
                      <div className="space-y-3">
                        {formData.businessHours[day].slots.map((slot, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm text-gray-600 w-20">Time Slot {index + 1}:</span>
                            <Select 
                              value={slot.start} 
                              onValueChange={(value) => updateTimeSlot(day, index, 'start', value)}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <span className="text-sm text-gray-500">to</span>
                            <Select 
                              value={slot.end} 
                              onValueChange={(value) => updateTimeSlot(day, index, 'end', value)}
                            >
                              <SelectTrigger className="w-28">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>{time}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {formData.businessHours[day].slots.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeTimeSlot(day, index)}
                                className="p-1 h-auto text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-600 hover:text-purple-700 p-0 h-auto"
                          onClick={() => addTimeSlot(day)}
                        >
                          + Add Another Time Slot
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          variant="outline"
          onClick={handleSaveAndBack}
          className="px-8 py-2 border-blue-600 text-blue-600 hover:bg-blue-50"
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
