"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Building, Phone, Globe, Facebook } from "lucide-react"

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

interface LocationContactStepProps {
  data: LocationContactData
  onUpdate: (data: LocationContactData) => void
  onNext: () => void
  onBack: () => void
}

export default function LocationContactStep({ data, onUpdate, onNext, onBack }: LocationContactStepProps) {
  const [formData, setFormData] = useState<LocationContactData>(data)
  const [errors, setErrors] = useState<Partial<LocationContactData>>({})

  const handleInputChange = (field: keyof LocationContactData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onUpdate({ ...formData, [field]: value })
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<LocationContactData> = {}
    
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = "Street address is required"
    }
    if (!formData.houseRoad.trim()) {
      newErrors.houseRoad = "House/Road info is required"
    }
    if (!formData.localArea.trim()) {
      newErrors.localArea = "Local area is required"
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required"
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
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
          <MapPin className="w-3 h-3 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Location & Contact</h3>
      </div>
      <p className="text-gray-600 mb-6">Where is your business located?</p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="streetAddress" className="text-sm font-medium">Street Address *</Label>
          <div className="relative mt-1">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              id="streetAddress" 
              value={formData.streetAddress}
              onChange={(e) => handleInputChange('streetAddress', e.target.value)}
              className={`pl-10 ${errors.streetAddress ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.streetAddress && (
            <p className="text-xs text-red-500 mt-1">{errors.streetAddress}</p>
          )}
        </div>

        <div>
          <Label htmlFor="houseRoad" className="text-sm font-medium">House / Road Info *</Label>
          <Input 
            id="houseRoad" 
            value={formData.houseRoad}
            onChange={(e) => handleInputChange('houseRoad', e.target.value)}
            className={`mt-1 ${errors.houseRoad ? 'border-red-500' : ''}`}
          />
          {errors.houseRoad && (
            <p className="text-xs text-red-500 mt-1">{errors.houseRoad}</p>
          )}
        </div>

        <div>
          <Label htmlFor="localArea" className="text-sm font-medium">Local Area *</Label>
          <Input 
            id="localArea" 
            value={formData.localArea}
            onChange={(e) => handleInputChange('localArea', e.target.value)}
            className={`mt-1 ${errors.localArea ? 'border-red-500' : ''}`}
          />
          {errors.localArea && (
            <p className="text-xs text-red-500 mt-1">{errors.localArea}</p>
          )}
        </div>

        <div>
          <Label htmlFor="city" className="text-sm font-medium">City *</Label>
          <Input 
            id="city" 
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            className={`mt-1 ${errors.city ? 'border-red-500' : ''}`}
          />
          {errors.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <Label htmlFor="postalCode" className="text-sm font-medium">Postal Code *</Label>
          <Input 
            id="postalCode" 
            value={formData.postalCode}
            onChange={(e) => handleInputChange('postalCode', e.target.value)}
            className={`mt-1 ${errors.postalCode ? 'border-red-500' : ''}`}
          />
          {errors.postalCode && (
            <p className="text-xs text-red-500 mt-1">{errors.postalCode}</p>
          )}
        </div>

        <div>
          <Label htmlFor="country" className="text-sm font-medium">Country</Label>
          <Input 
            id="country" 
            value={formData.country}
            onChange={(e) => handleInputChange('country', e.target.value)}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number *</Label>
          <div className="relative mt-1">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              id="mobile" 
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
              className={`pl-10 ${errors.mobile ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.mobile && (
            <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>
          )}
        </div>

        <div>
          <Label htmlFor="website" className="text-sm font-medium">Website URL (Optional)</Label>
          <div className="relative mt-1">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              id="website" 
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="facebook" className="text-sm font-medium">Facebook Page (Optional)</Label>
          <div className="relative mt-1">
            <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              id="facebook" 
              value={formData.facebook}
              onChange={(e) => handleInputChange('facebook', e.target.value)}
              className="pl-10"
            />
          </div>
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
          onClick={handleNext}
          className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  )
}
