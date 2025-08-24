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
  "Location & Contact",
  "Business Hours & Availability",
  "Media & Business Branding",
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
    streetAddress: "123/A, Mohammadia Ltd",
    houseInfo: "Road 7, House 22",
    localArea: "Mohammadpur",
    city: "Dhaka",
    postalCode: "1207",
    country: "Bangladesh",
    mobile: "+8801712345678",
    website: "https://www.kagoz.com",
    facebook: "https://facebook.com/kagoz",
    businessHours: {
      Mon: { isOpen: false, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Tue: { isOpen: false, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Wed: { isOpen: false, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Thu: { isOpen: false, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Fri: { isOpen: false, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Sat: { isOpen: false, openTime: "9:00 AM", closeTime: "6:00 PM" },
      Sun: { isOpen: false, openTime: "9:00 AM", closeTime: "6:00 PM" },
    },
    is24x7: false,
    closedOnHolidays: false,
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

  // Check if current step is valid
  const isCurrentStepValid = () => {
    switch (currentStep) {
      case 0: // Business Info
        return businessData.name && businessData.tagline && businessData.about
      case 1: // Location & Contact
        return businessData.streetAddress && businessData.city && businessData.mobile
      case 2: // Business Hours
        return Object.values(businessData.businessHours).some(hours => hours.isOpen) || businessData.is24x7
      case 3: // Media & Branding
        return true // Optional step
      default:
        return true
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }


const renderProgressBar = () => (
  <div className="w-full bg-white border-b border-gray-200 py-[25px] ">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <h1 className="learge-headeing ">Business Setup</h1>
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of 4 - {Math.round(((currentStep + 1) / (STEPS.length - 1)) * 100)}% Complete
        </div>
      </div>
      {/* Progress container */}
      <div className="relative mt-10">
        {/* Gray background line */}
        <div className="absolute top-5 left-0 w-full h-2 bg-[#F2F2F2] rounded-full">
          {/* Purple active line */}
          <div
            className="h-2 bg-purple-600 rounded-full transition-all duration-300"
            style={{
              width: `${((currentStep + 0.5) / (STEPS.length - 1)) * 100}%`,
            }}
          />
        </div>
        {/* Step circles */}
        <div className="relative flex justify-between">
          {Array.from({ length: STEPS.length }, (_, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`sm:size-8 size-6 rounded-full mb-8 flex items-center justify-center text-sm font-medium z-10 ${
                  index < currentStep
                    ? "bg-purple-600 text-white"
                    : index === currentStep
                    ? "bg-purple-600 text-white"
                    : "bg-white border-2 border-[#D1D1D1] text-gray-500"
                }`}
                style={{ marginTop: "-18px" }}
              >
                {index < currentStep ? (
                  <Check className="w-4 h-4" />
                ) : index === STEPS.length - 1 ? (
                  <Check className="w-4 h-4" />
                ) : (
                  index + 1
                )}
              </div>
            
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
)

  const renderBusinessPreview = () => (
    <div className="w-full border border-[#E4E4E4] rounded-2xl">
      <div className="p-4">
          <div className="flex items-center space-x-3 mb-4 bg-gradient-to-r border border-[#CCFBF1] rounded-[12px] px-4 py-[20px] from-[#F0FDFA] to-[#FAF5FF]">
            <div className="size-16 basis-16 shrink-0 bg-purple-600 rounded-lg flex items-center justify-center">
              <Building2 className="size-8 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{businessData.name}</h3>
              <p className="text-xs text-gray-600 break-words">{businessData.tagline}</p>
            </div>
          </div>

        <div className="space-y-6 text-xs">
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

          {currentStep >= 1 && (
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

          {currentStep >= 2 && (
            <div className="flex items-start space-x-2">
              <Clock className="w-3 h-3 text-gray-400 mt-0.5" />
              <div>
                <p className="font-medium">Business Hours</p>
                {businessData.is24x7 ? (
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                      Open 24 hours a day, 7 days a week
                    </Badge>
                    {businessData.closedOnHolidays && (
                      <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                        Closed on public holidays
                      </Badge>
                    )}
                  </div>
                ) : (
                  <div className="space-y-1">
                    {(() => {
                      const hasOpenDays = Object.values(businessData.businessHours).some(hours => hours.isOpen)
                      if (!hasOpenDays) {
                        return <p className="text-xs text-gray-500">Business hours will appear here</p>
                      }
                      return (
                        <>
                          {Object.entries(businessData.businessHours).map(([day, hours]) => (
                            <div key={day} className="flex justify-between text-xs">
                              <span>{day}</span>
                              <span className={hours.isOpen ? "text-green-600" : "text-red-600"}>
                                {hours.isOpen ? `${hours.openTime} - ${hours.closeTime}` : "Closed"}
                              </span>
                            </div>
                          ))}
                          {businessData.closedOnHolidays && (
                            <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800 mt-1">
                              Closed on public holidays
                            </Badge>
                          )}
                        </>
                      )
                    })()}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 py-3 px-5 rounded-[8px] bg-[#F9FAFB] border-l-[4px] border-[#6F00FF]  text-xs text-[#717684]">
          This preview shows how your business {currentStep < 1 ? "information will appear" : currentStep < 2 ? "location and contact information will appear" : currentStep < 3 ? "hours will appear" : "information will appear"} to
          customers. Make sure all {currentStep < 1 ? "details" : currentStep < 2 ? "details" : currentStep < 3 ? "times" : "details"} are accurate.
        </div>
      </div>
    </div>
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
          <StepLocationContact
            businessData={businessData}
            updateBusinessData={updateBusinessData}
            renderBusinessPreview={renderBusinessPreview}
          />
        )
      case 2:
        return (
          <StepHours
            businessData={businessData}
            updateBusinessData={updateBusinessData}
            renderBusinessPreview={renderBusinessPreview}
          />
        )
      case 3:
        return (
          <StepMediaBranding
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
    <div className="min-h-screen bg-white">
      {currentStep < STEPS.length - 1 && renderProgressBar()}

      <div className="max-w-[1184px] mx-auto mt-8">
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

            <Button 
              onClick={nextStep} 
              disabled={!isCurrentStepValid()}
              className={`flex items-center space-x-2 ${
                isCurrentStepValid() 
                  ? "bg-purple-600 hover:bg-purple-700" 
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
