"use client"

import * as React from "react"
import { X, Upload } from "lucide-react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function ImageUploader({
  multiple = true,
  maxSizeMB = 10,
}: {
  multiple?: boolean
  maxSizeMB?: number
}) {
  const [files, setFiles] = React.useState<File[]>([])
  const fileInputRef = React.useRef<HTMLInputElement | null>(null)

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return
    const validFiles = Array.from(newFiles).filter(
      (file) => file.size <= maxSizeMB * 1024 * 1024
    )
    setFiles(multiple ? [...files, ...validFiles] : [validFiles[0]])
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-medium">
        Business Logo <span className="text-red-500">*</span>
      </Label>
      <p className="text-xs text-muted-foreground">
        Logo for your business profile
      </p>

      {/* Dropzone / Browse */}
      {files.length === 0 && (
        <div
          className="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm">Drop your image here or click to browse</p>
          <p className="text-xs text-muted-foreground">
            PNG, JPG up to {maxSizeMB}MB <br />
            Recommended size: 500×500 px
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg"
            multiple={multiple}
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      )}

      {/* Preview */}
      {files.length > 0 && (
        <div
          className={cn(
            "grid gap-2 mt-2",
            multiple
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              : "grid-cols-1"
          )}
        >
          {files.map((file, index) => {
            const url = URL.createObjectURL(file)
            return (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden group"
              >
                <img
                  src={url}
                  alt={file.name}
                  className={cn(
                    "object-cover w-full",
                    multiple ? "h-32" : "h-20"
                  )}
                />
                <div className="absolute top-1 right-1">
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="rounded-full bg-black/70 p-1 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {!multiple && (
                  <div className="p-2 text-xs">
                    <p className="truncate">{file.name}</p>
                    <p className="text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
