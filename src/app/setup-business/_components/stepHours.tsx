"use client"

import type { BusinessData } from "./businessSetup"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Clock, Copy, X, ArrowRight } from "lucide-react"
import { JSX, useState, useEffect } from "react"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

interface TimeSlot {
  id: string
  startTime: string
  endTime: string
}

interface DayHours {
  isOpen: boolean
  timeSlots: TimeSlot[]
}

interface StepProps {
  businessData: BusinessData
  updateBusinessData: (field: string, value: any) => void
  renderBusinessPreview: () => JSX.Element
}

export function StepHours({ businessData, updateBusinessData, renderBusinessPreview }: StepProps) {
  const [businessHours, setBusinessHours] = useState<{ [key: string]: DayHours }>(() => {
    const hours: { [key: string]: DayHours } = {}
    DAYS.forEach(day => {
      hours[day] = {
        isOpen: false,
        timeSlots: [{
          id: `${day}-1`,
          startTime: "9:00 AM",
          endTime: "6:00 PM"
        }]
      }
    })
    return hours
  })

  useEffect(() => {
    if (businessData.closedOnHolidays && !businessData.is24x7) {
      const newHours = { ...businessHours }
      DAYS.forEach(day => {
        if (day !== "Fri") {
          newHours[day] = {
            isOpen: true,
            timeSlots: [{
              id: `${day}-1`,
              startTime: "9:00 AM",
              endTime: "6:00 PM"
            }]
          }
        } else {
          newHours[day] = {
            isOpen: false,
            timeSlots: [{
              id: `${day}-1`,
              startTime: "9:00 AM",
              endTime: "6:00 PM"
            }]
          }
        }
      })
      newHours.Mon = {
        isOpen: true,
        timeSlots: [
          {
            id: "Mon-1",
            startTime: "9:00 AM",
            endTime: "1:00 PM"
          },
          {
            id: "Mon-2",
            startTime: "2:00 PM",
            endTime: "6:00 PM"
          }
        ]
      }
      setBusinessHours(newHours)
      updateHours(newHours)
    }
  }, [businessData.closedOnHolidays])

  const updateHours = (newHours: { [key: string]: DayHours }) => {
    setBusinessHours(newHours)
    const formattedHours: { [key: string]: { isOpen: boolean; openTime: string; closeTime: string } } = {}
    Object.entries(newHours).forEach(([day, hours]) => {
      formattedHours[day] = {
        isOpen: hours.isOpen,
        openTime: hours.timeSlots[0]?.startTime || "9:00 AM",
        closeTime: hours.timeSlots[0]?.endTime || "6:00 PM"
      }
    })
    updateBusinessData("businessHours", formattedHours)
  }

  const toggleDay = (day: string) => {
    const newHours = { ...businessHours }
    newHours[day].isOpen = !newHours[day].isOpen
    updateHours(newHours)
  }

  const addTimeSlot = (day: string) => {
    const newHours = { ...businessHours }
    const slotCount = newHours[day].timeSlots.length + 1
    newHours[day].timeSlots.push({
      id: `${day}-${slotCount}`,
      startTime: "9:00 AM",
      endTime: "6:00 PM"
    })
    updateHours(newHours)
  }

  const removeTimeSlot = (day: string, slotId: string) => {
    const newHours = { ...businessHours }
    newHours[day].timeSlots = newHours[day].timeSlots.filter(slot => slot.id !== slotId)
    updateHours(newHours)
  }

  const updateTimeSlot = (day: string, slotId: string, field: 'startTime' | 'endTime', value: string) => {
    const newHours = { ...businessHours }
    const slot = newHours[day].timeSlots.find(s => s.id === slotId)
    if (slot) {
      slot[field] = value
      updateHours(newHours)
    }
  }

  const copyMonFriHours = () => {
    const newHours = { ...businessHours }
    const monFriSlots = newHours.Mon.timeSlots
    DAYS.slice(0, 5).forEach((day) => {
      newHours[day].timeSlots = monFriSlots.map((slot: TimeSlot) => {
        const parts = slot.id.split('-')
        const slotNumber = parts.length > 1 ? parts[1] : '1'
        return {
          ...slot,
          id: `${day}-${slotNumber}`
        }
      })
    })
    updateHours(newHours)
  }

  const generateTimeOptions = () => {
    const options = []
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = new Date()
        time.setHours(hour, minute, 0, 0)
        const timeString = time.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        })
        options.push(timeString)
      }
    }
    return options
  }

  const timeOptions = generateTimeOptions()
  const hasSelectedDays = Object.values(businessHours).some(day => day.isOpen)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
      <div className="lg:col-span-2">
        <div className="p-4 lg:p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Clock className="w-5 h-5 text-[#6F00FF]" />
            <h2 className="text-lg font-semibold">Business Hours & Availability</h2>
          </div>
          <p className="text-gray-600 mb-6">When are you open?</p>

          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium">Days Open *</Label>
              <div className="grid grid-cols-4 gap-1 sm:gap-[10px] mt-2">
                {DAYS.map((day) => (
                  <button
                    key={day}
                    className={`py-3 px-10 sm:px-[52px] text-xs rounded ${
                      businessHours[day].isOpen
                        ? "text-[#6F00FF] border border-[#6F00FF] font-medium bg-[#F1EBFF]"
                        : "bg-white text-gray-600 border-gray-300 border hover:bg-gray-50"
                    }`}
                    onClick={() => toggleDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-sm font-medium">Optional Toggles:</Label>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#6F00FF] rounded-full"></div>
                  <span className="text-sm">24/7 Open</span>
                </div>
                <Switch
                  checked={businessData.is24x7}
                  onCheckedChange={(checked) => updateBusinessData("is24x7", checked)}
                />
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[#6F00FF] rounded-full"></div>
                  <span className="text-sm">Closed on Public Holidays</span>
                </div>
                <Switch
                  checked={businessData.closedOnHolidays}
                  onCheckedChange={(checked) => updateBusinessData("closedOnHolidays", checked)}
                />
              </div>
            </div>

            {!businessData.is24x7 && hasSelectedDays && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyMonFriHours}
                className="flex items-center space-x-2 text-sm"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Mon-Fri hours to all weekdays</span>
              </Button>
            )}

            {!businessData.is24x7 && hasSelectedDays && businessData.closedOnHolidays && (
              <div className="space-y-6">
                <Label className="text-sm font-medium">Opening Hours</Label>

                {/* ✅ Only show open days */}
                {DAYS.filter((day) => businessHours[day].isOpen).map((day) => (
                  <div key={day} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                    <div className="text-sm font-medium text-gray-900 mb-4">{day}</div>

                    <div className="space-y-4">
                      {businessHours[day].timeSlots.map((slot, index) => (
                        <div key={slot.id} className="space-y-2">
                          <div className="text-xs text-gray-500 font-medium">
                            Time Slot {index + 1}:
                          </div>
                          <div className="flex items-center space-x-3">
                            <Select
                              value={slot.startTime}
                              onValueChange={(value) => updateTimeSlot(day, slot.id, 'startTime', value)}
                            >
                              <SelectContent className="max-h-64">
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <ArrowRight className="size-4 text-[#2D3643]" />

                            <Select
                              value={slot.endTime}
                              onValueChange={(value) => updateTimeSlot(day, slot.id, 'endTime', value)}
                            >
                              <SelectContent className="max-h-64">
                                {timeOptions.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            {businessHours[day].timeSlots.length > 1 && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeTimeSlot(day, slot.id)}
                                className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => addTimeSlot(day)}
                        className="text-[#6F00FF] hover:text-purple-700 text-sm font-medium p-0 h-auto"
                      >
                        + Add Another Time Slot
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-[#6F00FF] rounded-full"></div>
            <h3 className="font-semibold">Hours Preview</h3>
          </div>
          {renderBusinessPreview()}
        </div>
      </div>
    </div>
  )
}
