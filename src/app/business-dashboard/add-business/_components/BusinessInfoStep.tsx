"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building, MessageSquare, FileText } from "lucide-react"

interface BusinessInfoData {
  businessName: string
  tagline: string
  about: string
  startYear: string
  startMonth: string
  startDay: string
  category: string
}

interface BusinessInfoStepProps {
  data: BusinessInfoData
  onUpdate: (data: BusinessInfoData) => void
  onNext: () => void
}

export default function BusinessInfoStep({ data, onUpdate, onNext }: BusinessInfoStepProps) {
  const [formData, setFormData] = useState<BusinessInfoData>(data)
  const [errors, setErrors] = useState<Partial<BusinessInfoData>>({})

  const handleInputChange = (field: keyof BusinessInfoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onUpdate({ ...formData, [field]: value })
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<BusinessInfoData> = {}
    
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }
    if (!formData.tagline.trim()) {
      newErrors.tagline = "Tagline is required"
    }
    if (formData.tagline.length > 150) {
      newErrors.tagline = "Tagline must be 150 characters or less"
    }
    if (!formData.about.trim()) {
      newErrors.about = "About section is required"
    }
    if (formData.about.length > 5000) {
      newErrors.about = "About section must be 5000 characters or less"
    }
    if (!formData.startYear || !formData.startMonth || !formData.startDay) {
      newErrors.startYear = "Business starting date is required"
    }
    if (!formData.category) {
      newErrors.category = "Business category is required"
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
          <Building className="w-3 h-3 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Business Information</h3>
      </div>
      <p className="text-gray-600 mb-6">Tell us about your business</p>

      <div className="space-y-4">
        <div>
          <Label htmlFor="businessName" className="text-sm font-medium">Business Name *</Label>
          <div className="relative mt-1">
           
            <Input 
            placeholderIcon={Building}
            width="100%"
              placeholder="Business Name"
              id="businessName" 
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              className={` ${errors.businessName ? 'border-red-500' : ''}`}
            />
          </div>
          {errors.businessName && (
            <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tagline" className="text-sm font-medium">Tagline *</Label>
          <div className="relative mt-1">
            
            <Textarea
            placeholderIcon={MessageSquare}
            rows={1}
              id="tagline"
              value={formData.tagline}
              onChange={(e) => handleInputChange('tagline', e.target.value)}
              className={` ${errors.tagline ? 'border-red-500' : ''}`}
            />
          </div>
          <div className="flex justify-end
           items-center mt-1">
            {errors.tagline && (
              <p className="text-xs text-red-500">{errors.tagline}</p>
            )}
            <p className="text-xs text-gray-500">{formData.tagline.length}/150 characters</p>
          </div>
        </div>

        <div>
          <Label htmlFor="about" className="text-sm font-medium">About *</Label>
          <div className="relative mt-1">
        
            <Textarea
            rows={5}
              id="about"
              placeholderIcon={FileText}
              value={formData.about}
              onChange={(e) => handleInputChange('about', e.target.value)}
              className={` ${errors.about ? 'border-red-500' : ''}`}
            />
          </div>
          <div className="flex justify-between items-center mt-1">
            {errors.about && (
              <p className="text-xs text-red-500">{errors.about}</p>
            )}
            <p className="text-xs text-gray-500">{formData.about.length}/5000 characters</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
           
            <div className="flex gap-2 mt-1">
              <Select
                label="Year"
                required
                placeholder="Year"
                value={formData.startYear}
                onValueChange={(value) => handleInputChange('startYear', value)}
                width="w-full"
              >
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => 2020 + i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                label="Month"
                required
                placeholder="Month"
                value={formData.startMonth}
                onValueChange={(value) => handleInputChange('startMonth', value)}
                width="w-full"
              >
                <SelectContent>
                  <SelectItem value="january">January</SelectItem>
                  <SelectItem value="february">February</SelectItem>
                  <SelectItem value="march">March</SelectItem>
                  <SelectItem value="april">April</SelectItem>
                  <SelectItem value="may">May</SelectItem>
                  <SelectItem value="june">June</SelectItem>
                  <SelectItem value="july">July</SelectItem>
                  <SelectItem value="august">August</SelectItem>
                  <SelectItem value="september">September</SelectItem>
                  <SelectItem value="october">October</SelectItem>
                  <SelectItem value="november">November</SelectItem>
                  <SelectItem value="december">December</SelectItem>
                </SelectContent>
              </Select>
              <Select
                label="Day"
                required
                placeholder="Day"
                value={formData.startDay}
                onValueChange={(value) => handleInputChange('startDay', value)}
                width="w-full"
              >
                <SelectContent>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {errors.startYear && (
              <p className="text-xs text-red-500 mt-1">{errors.startYear}</p>
            )}
          </div>

          
        </div>
    
          <Select
  label="Business Category"
  required
  placeholder="Business Platform"
  value={formData.category}
  onValueChange={(value) => handleInputChange("category", value)}
  width="w-full "
>
  <SelectContent>
    <SelectItem value="platform">Business Platform</SelectItem>
    <SelectItem value="retail">Retail</SelectItem>
    <SelectItem value="restaurant">Restaurant</SelectItem>
    <SelectItem value="service">Service</SelectItem>
    <SelectItem value="healthcare">Healthcare</SelectItem>
    <SelectItem value="education">Education</SelectItem>
  </SelectContent>
</Select>

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
