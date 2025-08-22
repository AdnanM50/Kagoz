"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, Camera, X } from "lucide-react"

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

interface MediaBrandingStepProps {
  data: MediaBrandingData
  onUpdate: (data: MediaBrandingData) => void
  onBack: () => void
  onSubmit: () => void
}

export default function MediaBrandingStep({ data, onUpdate, onBack, onSubmit }: MediaBrandingStepProps) {
  const [formData, setFormData] = useState<MediaBrandingData>(data)
  const [errors, setErrors] = useState<{ logo?: string }>({})
  
  const logoRef = useRef<HTMLInputElement>(null)
  const bannerRef = useRef<HTMLInputElement>(null)
  const galleryRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const createFilePreview = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.readAsDataURL(file)
    })
  }

  const handleFileUpload = async (file: File, type: 'logo' | 'banner' | 'gallery') => {
    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    const preview = await createFilePreview(file)
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview,
      name: file.name,
      size: formatFileSize(file.size)
    }

    let newData: MediaBrandingData

    if (type === 'logo') {
      newData = { ...formData, logo: uploadedFile }
    } else if (type === 'banner') {
      newData = { ...formData, banner: uploadedFile }
    } else {
      newData = { ...formData, gallery: [...formData.gallery, uploadedFile] }
    }

    setFormData(newData)
    onUpdate(newData)
    
    // Clear error when file is uploaded
    if (errors.logo) {
      setErrors({})
    }
  }

  const removeFile = (type: 'logo' | 'banner' | 'gallery', id?: string) => {
    let newData: MediaBrandingData

    if (type === 'logo') {
      newData = { ...formData, logo: null }
    } else if (type === 'banner') {
      newData = { ...formData, banner: null }
    } else {
      newData = { 
        ...formData, 
        gallery: formData.gallery.filter(file => file.id !== id) 
      }
    }

    setFormData(newData)
    onUpdate(newData)
  }

  const validateForm = () => {
    const newErrors: { logo?: string } = {}
    
    if (!formData.logo) {
      newErrors.logo = "Business logo is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-purple-600 rounded flex items-center justify-center">
          <Camera className="w-3 h-3 text-white" />
        </div>
        <h3 className="text-lg font-semibold">Media & Business Branding</h3>
      </div>
      <p className="text-gray-600 mb-6">Add Visuals to Represent Your Business</p>

      <div className="space-y-6">
        {/* Business Logo */}
        <div>
          <Label className="text-sm font-medium">Business Logo *</Label>
          <p className="text-xs text-gray-500 mb-2">Logo for your business profile</p>
          
          {formData.logo ? (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <img 
                  src={formData.logo.preview} 
                  alt="Logo preview" 
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{formData.logo.name}</p>
                  <p className="text-xs text-gray-500">{formData.logo.size}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile('logo')}
                  className="p-1 h-auto"
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
              onClick={() => logoRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drop your image here or click to browse</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              <p className="text-xs text-gray-500">Recommended size: 500x500 px</p>
            </div>
          )}
          {errors.logo && (
            <p className="text-xs text-red-500 mt-1">{errors.logo}</p>
          )}
          <input
            ref={logoRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(file, 'logo')
            }}
          />
        </div>

        {/* Banner Image */}
        <div>
          <Label className="text-sm font-medium">Banner Image</Label>
          <p className="text-xs text-gray-500 mb-2">Banner image for your business profile</p>
          
          {formData.banner ? (
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <img 
                  src={formData.banner.preview} 
                  alt="Banner preview" 
                  className="w-12 h-12 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{formData.banner.name}</p>
                  <p className="text-xs text-gray-500">{formData.banner.size}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile('banner')}
                  className="p-1 h-auto"
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
              onClick={() => bannerRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Drop your image here or click to browse</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
              <p className="text-xs text-gray-500">Recommended size: 1200x500 px</p>
            </div>
          )}
          <input
            ref={bannerRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(file, 'banner')
            }}
          />
        </div>

        {/* Business Gallery */}
        <div>
          <Label className="text-sm font-medium">Business Gallery</Label>
          <p className="text-xs text-gray-500 mb-2">Add gallery images</p>
          
          {formData.gallery.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-4">
              {formData.gallery.map((file) => (
                <div key={file.id} className="relative group">
                  <img 
                    src={file.preview} 
                    alt="Gallery preview" 
                    className="w-full h-24 object-cover rounded"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile('gallery', file.id)}
                    className="absolute top-1 right-1 p-1 h-auto bg-white/80 hover:bg-white"
                  >
                    <X className="h-3 w-3 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
          
          <div 
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
            onClick={() => galleryRef.current?.click()}
          >
            <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Drop your image here or click to browse</p>
            <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 10MB</p>
          </div>
          <input
            ref={galleryRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const files = Array.from(e.target.files || [])
              files.forEach(file => handleFileUpload(file, 'gallery'))
            }}
          />
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
          onClick={handleSubmit}
          className="px-8 py-2 bg-purple-600 hover:bg-purple-700 text-white"
        >
          Save & Continue
        </Button>
      </div>
    </div>
  )
}
