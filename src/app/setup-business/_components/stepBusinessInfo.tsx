"use client"

import type { BusinessData } from "./businessSetup"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, Tag, Search } from "lucide-react"
import { JSX, useState, useMemo } from "react"
import  { TiptapEditor } from "@/components/ui/texteditor"
import BusinessStartDate from "@/components/ui/date-selector"

interface StepProps {
  businessData: BusinessData
  updateBusinessData: (field: string, value: any) => void
  renderBusinessPreview: () => JSX.Element
}

export function StepBusinessInfo({ businessData, updateBusinessData, renderBusinessPreview }: StepProps) {
  const [searchQuery, setSearchQuery] = useState("")
  
  const categories = [
    { value: "pharmacy", label: "Pharmacy" },
    { value: "restaurant", label: "Restaurant" },
    { value: "retail-store", label: "Retail Store" },
    { value: "grocery-store", label: "Grocery Store" },
    { value: "clothing-store", label: "Clothing Store" },
    { value: "electronics-shop", label: "Electronics Shop" },
    { value: "beauty-salon", label: "Beauty Salon" },
    { value: "barbershop", label: "Barbershop" },
    { value: "cafe", label: "Cafe" },
    { value: "bakery", label: "Bakery" },
    { value: "bookstore", label: "Bookstore" },
    { value: "gym-fitness", label: "Gym/Fitness Center" },
    { value: "medical-clinic", label: "Medical Clinic" },
    { value: "dental-clinic", label: "Dental Clinic" },
    { value: "law-firm", label: "Law Firm" },
    { value: "accounting-firm", label: "Accounting Firm" },
    { value: "real-estate", label: "Real Estate" },
    { value: "travel-agency", label: "Travel Agency" },
    { value: "photography-studio", label: "Photography Studio" },
    { value: "auto-repair", label: "Auto Repair" },
    { value: "pet-store", label: "Pet Store" },
    { value: "jewelry-store", label: "Jewelry Store" },
    { value: "hardware-store", label: "Hardware Store" },
    { value: "flower-shop", label: "Flower Shop" },
    { value: "laundry-service", label: "Laundry Service" },
    { value: "other", label: "Other" }
  ]

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [searchQuery])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-2">
        <div>
          <div className="">
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="size-6 text-[#6F00FF]" />
              <h2 className="auth-heading !font-medium text-[#111827]">Business Information</h2>
            </div>
            <p className="text-[#2D3643] mb-6">Tell us about your business</p>

            <div className="space-y-6">
              <div>
                <Input
                  placeholderIcon={Building2}
                  label="Business Name"
                  required
                  width="100%"
                  placeholder="Enter your business name"
                  id="businessName"
                  value={businessData.name}
                  onChange={(e) => updateBusinessData("name", e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>

                <Textarea
                  placeholderIcon={Tag}
                  label="Tagline"
                  required
                  id="tagline"
                  value={businessData.tagline}
                  onChange={(e) => updateBusinessData("tagline", e.target.value)}
                  maxLength={150}
                  rows={2}
                  className="mt-1"
                  placeholder="Brief description of your business"
                />
                <div className="flex justify-between items-center mb-1">
                  <span></span>
                  <span className="text-xs text-gray-500">{businessData.tagline.length}/150 characters</span>
                </div>
              </div>

              
<div className="">
      <TiptapEditor label="About" value={businessData.about}
                  onChange={(e) => updateBusinessData("about", e)}  required id="about" placeholder="Detailed description of your business, services, and what makes you unique..." />
    </div>
              <div>
                
                      <BusinessStartDate
                        id="startingDate"
                        label="Business Starting Date"
                        required
                        value={
                          typeof businessData.startingDate === "string"
                            ? { year: "", month: "", day: "" }
                            : businessData.startingDate
                        }
                        onChange={e => updateBusinessData("startingDate", e)}
                      />

              </div>

              <div>
                <Select
                  label="Business Category"
                  required
                  placeholder="Search categories..."
                  value={businessData.category}
                  onValueChange={(value) => updateBusinessData("category", value)}
                  width="w-full"
                >
                  <SelectContent>
                    {/* Search Bar */}
                    <div className="relative mb-3 p-2">
                      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search categories..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>

                    {/* Category Grid */}
                    <div className="grid grid-cols-2 gap-1 p-2 max-h-60 overflow-y-auto">
                      {filteredCategories.map((category) => (
                        <SelectItem
                          key={category.value}
                          value={category.value}
                          className="text-sm"
                        >
                          {category.label}
                        </SelectItem>
                      ))}
                    </div>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
         {/* <Button variant="submit" className="w-full mt-8 cursor-pointer">
                      Next
                    </Button> */}
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
}


