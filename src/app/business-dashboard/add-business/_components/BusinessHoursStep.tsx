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

export default function BusinessHoursStep({ data, onUpdate, onNext, onBack }: BusinessHoursStepProps) {
  const [formData, setFormData] = useState<BusinessHoursData>(data)

  const handleToggleDay = (day: string) => {
    const updatedHours = {
      ...formData.businessHours,
      [day]: {
        ...formData.businessHours[day],
        isOpen: !formData.businessHours[day].isOpen,
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
    }
    
    const newData = { ...formData, businessHours: updatedHours }
    setFormData(newData)
    onUpdate(newData)
  }

  const handleToggle24Hours = (checked: boolean) => {
    const newData = { ...formData, is24Hours: checked }
    setFormData(newData)
    onUpdate(newData)
  }

  const handleToggleHolidays = (checked: boolean) => {
    const newData = { ...formData, closedOnHolidays: checked }
    setFormData(newData)
    onUpdate(newData)
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
            />
          </div>
        </div>
        <button
          onClick={copyMonFriHours}
          className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 mt-2"
        >
          <Copy className="w-3 h-3" />
          Copy Mon-Fri hours to all weekdays
        </button>
      </div>

      {/* Opening Hours */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Opening Hours</Label>
        <div className="space-y-4">
          {days.map((day) => (
            formData.businessHours[day]?.isOpen && (
              <div key={day} className="space-y-2">
                <Label className="text-sm font-medium">{day}:</Label>
                <div className="space-y-2">
                  {formData.businessHours[day].slots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm text-gray-600 w-20">Time Slot {index + 1}:</span>
                      <Select 
                        value={slot.start} 
                        onValueChange={(value) => updateTimeSlot(day, index, 'start', value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <span className="text-sm">to</span>
                      <Select 
                        value={slot.end} 
                        onValueChange={(value) => updateTimeSlot(day, index, 'end', value)}
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                          <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                          <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                          <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.businessHours[day].slots.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeTimeSlot(day, index)}
                          className="p-1 h-auto"
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
          variant="outline"
          className="px-8 py-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
        >
          Save & Back to Businesses
        </Button>
        <Button
          onClick={onNext}
          className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  )
}
