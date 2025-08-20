"use client"

import type { BusinessData } from "./businessSetup"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin } from "lucide-react"

interface StepProps {
  businessData: BusinessData
  updateBusinessData: (field: string, value: any) => void
  renderBusinessPreview: () => React.ReactNode
}

export function StepLocationContact({ businessData, updateBusinessData, renderBusinessPreview }: StepProps) {
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
                <Select value={businessData.country} onValueChange={(value) => updateBusinessData("country", value)}>
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
}


