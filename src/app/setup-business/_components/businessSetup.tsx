"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  MapPin,
  Phone,
  Globe,
  Facebook,
  Upload,
  Check,
  Calendar,
  Building2,
  Star,
  Camera,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface BusinessData {
  name: string
  tagline: string
  about: string
  startingDate: string
  category: string
  logo: string
  bannerImage: string
  gallery: string[]
  streetAddress: string
  houseInfo: string
  localArea: string
  city: string
  postalCode: string
  country: string
  mobile: string
  website: string
  facebook: string
  businessHours: {
    [key: string]: {
      isOpen: boolean
      openTime: string
      closeTime: string
    }
  }
  is24x7: boolean
  closedOnHolidays: boolean
}

const STEPS = [
  "Business Information",
  "Business Hours & Availability",
  "Media & Business Branding",
  "Location & Contact",
  "Complete",
]

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function BusinessSetupWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [businessData, setBusinessData] = useState<BusinessData>({
    name: "Kagoz.com",
    tagline:
      "KAGOZ stands out by offering both free and premium listing options to cater to the diverse needs of businesses.",
    about:
      "KAGOZ stands out by offering both free and premium listing options to cater to the diverse needs of businesses. Whether you are a startup looking for cost-effective exposure or an established enterprise, our platform provides a comprehensive solution to showcase your services and reach potential customers. Free & Easy Listings: Straightforward process to get businesses listed at no cost. Verified Listings: Ensuring accuracy and reliability. User-Friendly Search Experience: Advanced search features allow users to find businesses by category, name, or location.",
    startingDate: "July 15, 2025",
    category: "Business Platform",
    logo: "",
    bannerImage: "",
    gallery: [],
    streetAddress: "123A, Mohammadpur Ltd.",
    houseInfo: "Road 7, House 22",
    localArea: "Mohammadpur",
    city: "Dhaka",
    postalCode: "1207",
    country: "Bangladesh",
    mobile: "+8801712345678",
    website: "https://www.kagoz.com",
    facebook: "https://facebook.com/kagoz",
    businessHours: {
      Mon: { isOpen: true, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Tue: { isOpen: true, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Wed: { isOpen: true, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Thu: { isOpen: true, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Fri: { isOpen: true, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Sat: { isOpen: true, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Sun: { isOpen: false, openTime: "9:00 AM", closeTime: "6:00 PM" },
    },
    is24x7: false,
    closedOnHolidays: true,
  })

  const updateBusinessData = (field: string, value: any) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderProgressBar = () => (
    <div className="w-full bg-white border-b border-gray-200 py-4 mb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Business Setup</h1>
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {STEPS.length - 1} - {Math.round(((currentStep + 1) / (STEPS.length - 1)) * 100)}%
            Complete
          </div>
        </div>
        <div className="flex items-center mt-6">
          {STEPS.slice(0, -1).map((step, index) => (
            <div key={step} className="flex items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep ? "bg-purple-600 text-white" : "bg-gray-200 text-gray-500"
                }`}
              >
                {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
              </div>
              {index < STEPS.length - 2 && (
                <div className={`h-1 flex-1 mx-4 ${index < currentStep ? "bg-purple-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderBusinessPreview = () => (
    <Card className="w-full max-w-sm">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{businessData.name}</h3>
            <p className="text-xs text-gray-600">{businessData.tagline}</p>
          </div>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-start space-x-2">
            <Building2 className="w-3 h-3 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">About</p>
              <p className="text-gray-600 line-clamp-3">{businessData.about}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-3 h-3 text-gray-400" />
            <div>
              <p className="font-medium">Starting Date</p>
              <p className="text-gray-600">{businessData.startingDate}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Star className="w-3 h-3 text-gray-400" />
            <div>
              <p className="font-medium">Category</p>
              <p className="text-gray-600">{businessData.category}</p>
            </div>
          </div>

          {currentStep >= 3 && (
            <>
              <div className="flex items-start space-x-2">
                <MapPin className="w-3 h-3 text-gray-400 mt-0.5" />
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-600">
                    {businessData.streetAddress}, {businessData.houseInfo}, {businessData.localArea},{" "}
                    {businessData.city}, {businessData.postalCode}, {businessData.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-3 h-3 text-gray-400" />
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-600">{businessData.mobile}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Globe className="w-3 h-3 text-gray-400" />
                <div>
                  <p className="font-medium">Website</p>
                  <p className="text-blue-600">{businessData.website}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Facebook className="w-3 h-3 text-gray-400" />
                <div>
                  <p className="font-medium">Facebook</p>
                  <p className="text-blue-600">{businessData.facebook}</p>
                </div>
              </div>
            </>
          )}

          {currentStep >= 1 && (
            <div className="flex items-start space-x-2">
              <Clock className="w-3 h-3 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">Business Hours</p>
                {businessData.is24x7 ? (
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    Open 24 hours a day, 7 days a week
                  </Badge>
                ) : (
                  <div className="space-y-1">
                    {Object.entries(businessData.businessHours).map(([day, hours]) => (
                      <div key={day} className="flex justify-between text-xs">
                        <span>{day}</span>
                        <span className={hours.isOpen ? "text-green-600" : "text-red-600"}>
                          {hours.isOpen ? `${hours.openTime} - ${hours.closeTime}` : "Closed"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                {businessData.closedOnHolidays && (
                  <Badge variant="secondary" className="text-xs bg-red-100 text-red-800 mt-1">
                    Closed on public holidays
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-2 bg-purple-50 rounded text-xs text-purple-700">
          This preview shows how your business {currentStep < 3 ? "hours will appear" : "information will appear"} to
          customers. Make sure all {currentStep < 3 ? "times" : "details"} are accurate.
        </div>
      </CardContent>
    </Card>
  )

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-semibold">Business Information</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Tell us about your business</p>

                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input
                        id="businessName"
                        value={businessData.name}
                        onChange={(e) => updateBusinessData("name", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tagline">Tagline *</Label>
                      <div className="flex justify-between items-center mb-1">
                        <span></span>
                        <span className="text-xs text-gray-500">{businessData.tagline.length}/100 characters</span>
                      </div>
                      <Input
                        id="tagline"
                        value={businessData.tagline}
                        onChange={(e) => updateBusinessData("tagline", e.target.value)}
                        maxLength={100}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="about">About *</Label>
                      <div className="flex justify-between items-center mb-1">
                        <span></span>
                        <span className="text-xs text-gray-500">{businessData.about.length}/1000 characters</span>
                      </div>
                      <Textarea
                        id="about"
                        value={businessData.about}
                        onChange={(e) => updateBusinessData("about", e.target.value)}
                        maxLength={1000}
                        rows={6}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="startingDate">Business Starting Date *</Label>
                      <Input
                        id="startingDate"
                        value={businessData.startingDate}
                        onChange={(e) => updateBusinessData("startingDate", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="category">Business Category *</Label>
                      <Select
                        value={businessData.category}
                        onValueChange={(value) => updateBusinessData("category", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Business Platform">Business Platform</SelectItem>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="sticky top-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <h3 className="font-semibold">Business Preview</h3>
                </div>
                {renderBusinessPreview()}
              </div>
            </div>
          </div>
        )

      case 1:
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
                            className={`h-8 text-xs ${
                              businessData.businessHours[day].isOpen ? "bg-purple-600 hover:bg-purple-700" : ""
                            }`}
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

      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Camera className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-semibold">Media & Business Branding</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Add Visuals to Represent Your Business</p>

                  <div className="space-y-8">
                    <div>
                      <Label className="text-sm font-medium">Business Logo *</Label>
                      <p className="text-xs text-gray-500 mb-3">Logo for your business profile</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drop your business logo here to browse</p>
                        <p className="text-xs text-gray-500 mt-1">Recommended size: 200x200</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Banner Image</Label>
                      <p className="text-xs text-gray-500 mb-3">Banner image for your business profile</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drop your business banner here to browse</p>
                        <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x400</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Verified License</Label>
                      <p className="text-xs text-gray-500 mb-3">Upload your business license</p>
                      <div className="grid grid-cols-2 gap-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Document" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="license">Business License</SelectItem>
                            <SelectItem value="permit">Business Permit</SelectItem>
                            <SelectItem value="certificate">Certificate</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Issued" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="2024">2024</SelectItem>
                            <SelectItem value="2023">2023</SelectItem>
                            <SelectItem value="2022">2022</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-3">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drop your business license here to browse</p>
                        <p className="text-xs text-gray-500 mt-1">Recommended size: 1200x800</p>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Business Starting Days</Label>
                      <Input className="mt-2" placeholder="Enter starting days" />
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Business Gallery</Label>
                      <p className="text-xs text-gray-500 mb-3">Add photos of your business</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Drop your business gallery here to browse</p>
                        <p className="text-xs text-gray-500 mt-1">Recommended size: 800x600</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                          <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                            <Camera className="w-6 h-6 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="sticky top-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <h3 className="font-semibold">Business Card Preview</h3>
                </div>
                <Card className="w-full max-w-sm">
                  <CardContent className="p-0">
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg relative">
                      <div className="absolute bottom-4 left-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm">{businessData.name}</h3>
                      <p className="text-xs text-gray-600 mb-3">{businessData.tagline}</p>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center space-x-2">
                          <Star className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">Business Gallery</span>
                          <Badge variant="secondary" className="text-xs">
                            Request
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">Business Info</span>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="font-medium">Opening Hours</span>
                          <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                            Available
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4 p-2 bg-purple-50 rounded text-xs text-purple-700">
                        Upload your business card and logo, banner, and gallery to make your business profile more
                        attractive to customers.
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="mt-6">
                  <h4 className="font-semibold text-sm mb-3">Business Gallery</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                        <Camera className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <h2 className="text-lg font-semibold">Location & Contact</h2>
                  </div>
                  <p className="text-gray-600 mb-6">Where is your business located?</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="streetAddress">Street Address *</Label>
                      <Input
                        id="streetAddress"
                        value={businessData.streetAddress}
                        onChange={(e) => updateBusinessData("streetAddress", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="houseInfo">House / Road Info *</Label>
                      <Input
                        id="houseInfo"
                        value={businessData.houseInfo}
                        onChange={(e) => updateBusinessData("houseInfo", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="localArea">Local Area *</Label>
                      <Input
                        id="localArea"
                        value={businessData.localArea}
                        onChange={(e) => updateBusinessData("localArea", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={businessData.city}
                        onChange={(e) => updateBusinessData("city", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code *</Label>
                      <Input
                        id="postalCode"
                        value={businessData.postalCode}
                        onChange={(e) => updateBusinessData("postalCode", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Select
                        value={businessData.country}
                        onValueChange={(value) => updateBusinessData("country", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="Pakistan">Pakistan</SelectItem>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="mobile">Mobile Number *</Label>
                      <Input
                        id="mobile"
                        value={businessData.mobile}
                        onChange={(e) => updateBusinessData("mobile", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="website">Website URL (Optional)</Label>
                      <Input
                        id="website"
                        value={businessData.website}
                        onChange={(e) => updateBusinessData("website", e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="facebook">Facebook Page (Optional)</Label>
                      <Input
                        id="facebook"
                        value={businessData.facebook}
                        onChange={(e) => updateBusinessData("facebook", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <div className="sticky top-6">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  <h3 className="font-semibold">Location Preview</h3>
                </div>
                {renderBusinessPreview()}
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-4">🎉 Business Published!</h2>
            <p className="text-gray-600 mb-2">Your business listing has been submitted for review.</p>
            <p className="text-gray-600">We'll notify you once it goes live on our platform.</p>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentStep < STEPS.length - 1 && renderProgressBar()}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStep()}

        {currentStep < STEPS.length - 1 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex items-center space-x-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <Button onClick={nextStep} className="bg-purple-600 hover:bg-purple-700 flex items-center space-x-2">
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
