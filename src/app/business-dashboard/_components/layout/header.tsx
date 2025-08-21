"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
  className?: string
}

export function Header({ setSidebarOpen,className }: HeaderProps) {
  return (
    <header className="bg-white border-b fixed top-0 left-0 right-0 z-30 lg:ml-64">
      <div className="flex items-center justify-between px-4 sm:py-[26px] p-4">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2 lg:hidden">
            <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">KAGOZ</span>
          </div>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-purple-100 text-purple-600">U</AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}
