"use client"

import type { BusinessData } from "./businessSetup"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Building2, Camera, Clock, Star, Upload } from "lucide-react"
import { JSX } from "react"

interface StepProps {
  businessData: BusinessData
  updateBusinessData: (field: string, value: any) => void
  renderBusinessPreview: () => JSX.Element
}

export function StepMediaBranding({ businessData, updateBusinessData }: StepProps) {
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
                  Upload your business card and logo, banner, and gallery to make your business profile more attractive to customers.
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
}


