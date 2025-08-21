"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Plus, Trash2 } from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const dayAbbr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export default function AddBusiness() {
  const [currentTab, setCurrentTab] = useState(0)
  const [businessHours, setBusinessHours] = useState(
    days.reduce(
      (acc, day) => {
        acc[day] = {
          isOpen: day !== "Sunday",
          slots: [{ start: "9:00 AM", end: "6:00 PM" }],
        }
        return acc
      },
      {} as Record<string, { isOpen: boolean; slots: { start: string; end: string }[] }>,
    ),
  )

  const tabs = [
    "Business Information",
    "Location & Contact",
    "Business Hours & Availability",
    "Media & Business Branding",
  ]

  const addTimeSlot = (day: string) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { start: "9:00 AM", end: "6:00 PM" }],
      },
    }))
  }

  const removeTimeSlot = (day: string, index: number) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, i) => i !== index),
      },
    }))
  }

  const toggleDay = (day: string) => {
    setBusinessHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen: !prev[day].isOpen,
      },
    }))
  }

  return (
    <main className="p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Edit Business</h1>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-1 mb-8">
          {tabs.map((tab, index) => (
            <Button
              key={tab}
              variant={currentTab === index ? "default" : "outline"}
              className={`text-sm px-4 py-2 ${
                currentTab === index
                  ? "bg-purple-600 hover:bg-purple-700 text-white"
                  : "text-gray-600 hover:text-gray-900 bg-white"
              }`}
              onClick={() => setCurrentTab(index)}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
          {/* Business Information Tab */}
          {currentTab === 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-lg font-semibold">Business Information</h3>
              </div>
              <p className="text-gray-600 mb-6">Tell us about your business</p>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input id="businessName" placeholder="Kagoz.com" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="tagline">Tagline *</Label>
                  <Input
                    id="tagline"
                    placeholder="KAGOZ stands out by offering both free and premium listing options to cater to the diverse needs of businesses."
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">140/150 characters</p>
                </div>

                <div>
                  <Label htmlFor="about">About *</Label>
                  <Textarea
                    id="about"
                    placeholder="KAGOZ stands out by offering both free and premium listing options to cater to the diverse needs of businesses. Whether you are a startup or established enterprise, our platform provides a comprehensive solution to showcase your services and reach potential customers. Free & Easy Listings: A simple, straightforward process to get businesses listed at no cost. Verified and Trusted Information: Each business listing undergoes verification to ensure accuracy and reliability. User-Friendly Search Experience: Advanced search features allow users to find businesses by category, name, or location."
                    className="mt-1 min-h-[120px]"
                  />
                  <p className="text-xs text-gray-500 mt-1">1000/2000 characters</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate">Business Starting Date *</Label>
                    <div className="flex gap-2 mt-1">
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="july">July</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category">Business Category *</Label>
                    <Select>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Business Platform" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="platform">Business Platform</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Location & Contact Tab */}
          {currentTab === 1 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-lg font-semibold">Location & Contact</h3>
              </div>
              <p className="text-gray-600 mb-6">Where is your business located?</p>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="streetAddress">Street Address *</Label>
                    <Input id="streetAddress" placeholder="123/A, Mohammadpur Ltd" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="houseRoad">House / Road Info *</Label>
                    <Input id="houseRoad" placeholder="Road 7, House 23" className="mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="localArea">Local Area *</Label>
                    <Input id="localArea" placeholder="Mohammadpur" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input id="city" placeholder="Dhaka" className="mt-1" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input id="postalCode" placeholder="1205" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" placeholder="Bangladesh" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input id="mobile" placeholder="+88017234567B" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="website">Website URL (Optional)</Label>
                  <Input id="website" placeholder="https://www.kagoz.com" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="facebook">Facebook Page (Optional)</Label>
                  <Input id="facebook" placeholder="https://facebook.com/kagoz" className="mt-1" />
                </div>
              </div>
            </div>
          )}

          {/* Business Hours Tab */}
          {currentTab === 2 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-lg font-semibold">Business Hours & Availability</h3>
              </div>
              <p className="text-gray-600 mb-6">What are you open?</p>

              {/* Day Selection */}
              <div>
                <Label className="text-sm font-medium">Days Open *</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {dayAbbr.map((day, index) => (
                    <Button
                      key={day}
                      variant={businessHours[days[index]]?.isOpen ? "default" : "outline"}
                      size="sm"
                      className={`px-3 py-1 ${
                        businessHours[days[index]]?.isOpen
                          ? "bg-purple-600 hover:bg-purple-700 text-white"
                          : "text-gray-600"
                      }`}
                      onClick={() => toggleDay(days[index])}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Opening Hours */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Opening Hours</Label>
                  <div className="flex items-center gap-2 mt-2">
                    <input type="radio" id="24-7" name="hours" />
                    <Label htmlFor="24-7" className="text-sm">
                      24/7 Open
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="radio" id="custom" name="hours" defaultChecked />
                    <Label htmlFor="custom" className="text-sm">
                      Custom Public Holidays
                    </Label>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <input type="checkbox" id="only-weekends" />
                    <Label htmlFor="only-weekends" className="text-sm">
                      Only Open Fridays to All weekdays
                    </Label>
                  </div>
                </div>

                {/* Daily Schedule */}
                <div className="space-y-4">
                  {days.map((day) => (
                    <div key={day} className="space-y-2">
                      <Label className="text-sm font-medium">{day}</Label>
                      {businessHours[day]?.isOpen ? (
                        <div className="space-y-2">
                          {businessHours[day].slots.map((slot, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 w-16">Time Slot {index + 1}:</span>
                              <Select defaultValue={slot.start}>
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                                </SelectContent>
                              </Select>
                              <span className="text-sm">to</span>
                              <Select defaultValue={slot.end}>
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="6:00 PM">6:00 PM</SelectItem>
                                  <SelectItem value="7:00 PM">7:00 PM</SelectItem>
                                </SelectContent>
                              </Select>
                              {businessHours[day].slots.length > 1 && (
                                <Button variant="ghost" size="sm" onClick={() => removeTimeSlot(day, index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-purple-600 hover:text-purple-700"
                            onClick={() => addTimeSlot(day)}
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add Another Time Slot
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Closed</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Media & Business Branding Tab */}
          {currentTab === 3 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
                <h3 className="text-lg font-semibold">Media & Business Branding</h3>
              </div>
              <p className="text-gray-600 mb-6">Add Visuals to Represent Your Business</p>

              <div className="space-y-6">
                {/* Business Logo */}
                <div>
                  <Label className="text-sm font-medium">Business Logo *</Label>
                  <p className="text-xs text-gray-500 mb-2">Logo for your business profile</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drop your Image here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                    <p className="text-xs text-gray-500">Recommended size: 500*500 px</p>
                  </div>
                </div>

                {/* Banner Image */}
                <div>
                  <Label className="text-sm font-medium">Banner Image</Label>
                  <p className="text-xs text-gray-500 mb-2">Banner Image for your business profile</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drop your Image here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>

                {/* Business Gallery */}
                <div>
                  <Label className="text-sm font-medium">Business Gallery</Label>
                  <p className="text-xs text-gray-500 mb-2">Add gallery images</p>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Drop your Image here or click to browse</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-8 border-t mt-8">
            <Link href="/">
              <Button
                variant="outline"
                className="px-8 py-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
              >
                Save & Back to Businesses
              </Button>
            </Link>
            <Button
              className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => {
                if (currentTab < tabs.length - 1) {
                  setCurrentTab(currentTab + 1)
                }
              }}
            >
              Save & Continue
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
