"use client"

import type { BusinessData } from "./businessSetup"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2 } from "lucide-react"
import { JSX } from "react"

interface StepProps {
  businessData: BusinessData
  updateBusinessData: (field: string, value: any) => void
  renderBusinessPreview: () => JSX.Element
}

export function StepBusinessInfo({ businessData, updateBusinessData, renderBusinessPreview }: StepProps) {
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
                {/* <Label htmlFor="businessName">Business Name *</Label> */}
                <Input
                width="100%"
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
                <Select value={businessData.category} onValueChange={(value) => updateBusinessData("category", value)}>
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
          </div>
        </div>
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


