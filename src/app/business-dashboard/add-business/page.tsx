"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import BusinessInfoStep from "./_components/BusinessInfoStep"
import LocationContactStep from "./_components/LocationContactStep"
import BusinessHoursStep from "./_components/BusinessHoursStep"
import MediaBrandingStep from "./_components/MediaBrandingStep"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

interface BusinessInfoData {
  businessName: string
  tagline: string
  about: string
  startYear: string
  startMonth: string
  startDay: string
  category: string
}

interface LocationContactData {
  streetAddress: string
  houseRoad: string
  localArea: string
  city: string
  postalCode: string
  country: string
  mobile: string
  website: string
  facebook: string
}

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

interface UploadedFile {
  id: string
  file: File
  preview: string
  name: string
  size: string
}

interface MediaBrandingData {
  logo: UploadedFile | null
  banner: UploadedFile | null
  gallery: UploadedFile[]
}

interface FormData {
  businessInfo: BusinessInfoData
  locationContact: LocationContactData
  businessHours: BusinessHoursData
  mediaBranding: MediaBrandingData
}

export default function AddBusiness() {
  const router = useRouter()
  const [currentTab, setCurrentTab] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    businessInfo: {
      businessName: "Kagoz.com",
      tagline: "KAGOZ stands out by offering both free and premium listing options to cater to the diverse needs of businesses.",
      about: "KAGOZ stands out by offering both free and premium listing options to cater to the diverse needs of businesses. Whether you are a startup or an established enterprise, our platform provides a comprehensive solution to showcase your services and reach potential customers. Free & Easy Listings: A simple, straightforward process to get businesses listed at no cost. Verified and Trusted Information: Each business listing undergoes verification to ensure accuracy and reliability. User-Friendly Search Experience: Advanced search features allow users to find businesses by category, name, or location.",
      startYear: "2025",
      startMonth: "july",
      startDay: "12",
      category: "platform"
    },
    locationContact: {
      streetAddress: "123/A, Mohammadia Ltd",
      houseRoad: "Road 7, House 22",
      localArea: "Mohammadpur",
      city: "Dhaka",
      postalCode: "1207",
      country: "Bangladesh",
      mobile: "+8801712345678",
      website: "https://www.kagoz.com",
      facebook: "https://facebook.com/kagoz"
    },
    businessHours: {
      is24Hours: false,
      closedOnHolidays: true,
      businessHours: days.reduce(
        (acc, day) => {
          acc[day] = {
            isOpen: day !== "Friday",
            slots: day === "Monday" ? [
              { start: "9:00 AM", end: "1:00 PM" },
              { start: "2:00 PM", end: "6:00 PM" }
            ] : [{ start: "9:00 AM", end: "6:00 PM" }],
          }
          return acc
        },
        {} as Record<string, DaySchedule>,
      ),
    },
    mediaBranding: {
      logo: null,
      banner: null,
      gallery: []
    }
  })

  const tabs = [
    "Business Information",
    "Location & Contact",
    "Business Hours & Availability",
    "Media & Business Branding",
  ]

  const updateBusinessInfo = (data: BusinessInfoData) => {
    setFormData(prev => ({ ...prev, businessInfo: data }))
  }

  const updateLocationContact = (data: LocationContactData) => {
    setFormData(prev => ({ ...prev, locationContact: data }))
  }

  const updateBusinessHours = (data: BusinessHoursData) => {
    setFormData(prev => ({ ...prev, businessHours: data }))
  }

  const updateMediaBranding = (data: MediaBrandingData) => {
    setFormData(prev => ({ ...prev, mediaBranding: data }))
  }

  const handleNext = () => {
    if (currentTab < tabs.length - 1) {
      setCurrentTab(currentTab + 1)
    }
  }

  const handleBack = () => {
    if (currentTab > 0) {
      setCurrentTab(currentTab - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Create FormData for file uploads
      const submitData = new FormData()
      
      // Add business info
      submitData.append('businessInfo', JSON.stringify(formData.businessInfo))
      
      // Add location contact
      submitData.append('locationContact', JSON.stringify(formData.locationContact))
      
      // Add business hours
      submitData.append('businessHours', JSON.stringify(formData.businessHours))
      
      // Add media files
      if (formData.mediaBranding.logo) {
        submitData.append('logo', formData.mediaBranding.logo.file)
      }
      if (formData.mediaBranding.banner) {
        submitData.append('banner', formData.mediaBranding.banner.file)
      }
      formData.mediaBranding.gallery.forEach((file, index) => {
        submitData.append(`gallery_${index}`, file.file)
      })

      // Make API call
      const response = await fetch('/api/businesses', {
        method: 'POST',
        body: submitData,
      })

      if (!response.ok) {
        throw new Error('Failed to create business')
      }

      const result = await response.json()
      
      // Redirect to business dashboard
      router.push('/business-dashboard')
      
    } catch (error) {
      console.error('Error creating business:', error)
      alert('Failed to create business. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderCurrentStep = () => {
    switch (currentTab) {
      case 0:
        return (
          <BusinessInfoStep
            data={formData.businessInfo}
            onUpdate={updateBusinessInfo}
            onNext={handleNext}
          />
        )
      case 1:
        return (
          <LocationContactStep
            data={formData.locationContact}
            onUpdate={updateLocationContact}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 2:
        return (
          <BusinessHoursStep
            data={formData.businessHours}
            onUpdate={updateBusinessHours}
            onNext={handleNext}
            onBack={handleBack}
          />
        )
      case 3:
        return (
          <MediaBrandingStep
            data={formData.mediaBranding}
            onUpdate={updateMediaBranding}
            onBack={handleBack}
            onSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="w-full mx-auto">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit Business</h1>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border mb-6">
          <div className="flex flex-wrap">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium transition-colors ${
                  currentTab === index
                    ? "bg-purple-600 text-white"
                    : "text-gray-600 hover:text-gray-900 bg-white"
                } ${index === 0 ? "rounded-l-lg" : ""} ${index === tabs.length - 1 ? "rounded-r-lg" : ""}`}
                onClick={() => setCurrentTab(index)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border p-6 lg:p-8">
          {renderCurrentStep()}
        </div>

        {/* Loading overlay */}
        {isSubmitting && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
              <p className="text-gray-700">Creating your business...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
