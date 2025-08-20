"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Clock,
  MapPin,
  Phone,
  Globe,
  Facebook,
  Check,
  Calendar,
  Building2,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { StepBusinessInfo } from "./stepBusinessInfo"
import { StepHours } from "./stepHours"
import { StepMediaBranding } from "./stepMediaBranding"
import { StepLocationContact } from "./stepLocationContact" 

export interface BusinessData {
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

// days moved to step component

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

  const nextStep = async () => {
    if (currentStep < STEPS.length - 1) {
      if (currentStep === 3) {
        await submitBusiness()
      }
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
          <StepBusinessInfo
            businessData={businessData}
            updateBusinessData={updateBusinessData}
            renderBusinessPreview={renderBusinessPreview}
          />
        )
      case 1:
        return (
          <StepHours
            businessData={businessData}
            updateBusinessData={updateBusinessData}
            renderBusinessPreview={renderBusinessPreview}
          />
        )
      case 2:
        return (
          <StepMediaBranding
            businessData={businessData}
            updateBusinessData={updateBusinessData}
            renderBusinessPreview={renderBusinessPreview}
          />
        )
      case 3:
        return (
          <StepLocationContact
            businessData={businessData}
            updateBusinessData={updateBusinessData}
            renderBusinessPreview={renderBusinessPreview}
          />
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

  const submitBusiness = async () => {
    try {
      const response = await fetch("/api/business/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(businessData),
      })
      if (!response.ok) {
        console.error("Failed to submit business data")
      }
    } catch (error) {
      console.error("Error submitting business data", error)
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
