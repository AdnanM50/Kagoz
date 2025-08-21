"use client"

import type { BusinessData } from "./businessSetup"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Clock } from "lucide-react"
import { JSX } from "react"

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

interface StepProps {
  businessData: BusinessData
  updateBusinessData: (field: string, value: any) => void
  renderBusinessPreview: () => JSX.Element
}

export function StepHours({ businessData, updateBusinessData, renderBusinessPreview }: StepProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Clock className="w-5 h-5 text-purple-600" />
              <h2 className="text-lg font-semibold">Business Hours & Availability</h2>
            </div>
            <p className="text-gray-600 mb-6">When are you open?</p>

            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium">Days Open *</Label>
                <div className="grid grid-cols-7 gap-2 mt-2">
                  {DAYS.map((day) => (
                    <Button
                      key={day}
                      variant={businessData.businessHours[day].isOpen ? "default" : "outline"}
                      size="sm"
                      className={`h-8 text-xs ${businessData.businessHours[day].isOpen ? "bg-purple-600 hover:bg-purple-700" : ""}`}
                      onClick={() => {
                        const newHours = { ...businessData.businessHours }
                        newHours[day].isOpen = !newHours[day].isOpen
                        updateBusinessData("businessHours", newHours)
                      }}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-sm font-medium">Optional Toggles:</Label>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm">24/7 Open</span>
                  </div>
                  <Switch
                    checked={businessData.is24x7}
                    onCheckedChange={(checked) => updateBusinessData("is24x7", checked)}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-sm">Closed on Public Holidays</span>
                  </div>
                  <Switch
                    checked={businessData.closedOnHolidays}
                    onCheckedChange={(checked) => updateBusinessData("closedOnHolidays", checked)}
                  />
                </div>
              </div>

              {!businessData.is24x7 && (
                <div className="space-y-4">
                  <Label className="text-sm font-medium">Opening Hours</Label>
                  {Object.entries(businessData.businessHours).map(([day, hours]) => (
                    <div key={day} className="flex items-center space-x-4">
                      <div className="w-16 text-sm font-medium">{day}</div>
                      {hours.isOpen ? (
                        <>
                          <Select
                            value={hours.openTime}
                            onValueChange={(value) => {
                              const newHours = { ...businessData.businessHours }
                              newHours[day].openTime = value
                              updateBusinessData("businessHours", newHours)
                            }}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => {
                                const hour = i === 0 ? 12 : i > 12 ? i - 12 : i
                                const ampm = i < 12 ? "AM" : "PM"
                                return (
                                  <SelectItem key={i} value={`${hour}:00 ${ampm}`}>
                                    {hour}:00 {ampm}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                          <span className="text-sm text-gray-500">to</span>
                          <Select
                            value={hours.closeTime}
                            onValueChange={(value) => {
                              const newHours = { ...businessData.businessHours }
                              newHours[day].closeTime = value
                              updateBusinessData("businessHours", newHours)
                            }}
                          >
                            <SelectTrigger className="w-24">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 24 }, (_, i) => {
                                const hour = i === 0 ? 12 : i > 12 ? i - 12 : i
                                const ampm = i < 12 ? "AM" : "PM"
                                return (
                                  <SelectItem key={i} value={`${hour}:00 ${ampm}`}>
                                    {hour}:00 {ampm}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500">Closed</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <div className="sticky top-6">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            <h3 className="font-semibold">Hours Preview</h3>
          </div>
          {renderBusinessPreview()}
        </div>
      </div>
    </div>
  )
}


