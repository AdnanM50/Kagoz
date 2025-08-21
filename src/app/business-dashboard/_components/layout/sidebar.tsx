"use client"
import { Button } from "@/components/ui/button"
import { Home, Star, ArrowUp, LogOut, X, Award, Crown } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const navItems = [
    { label: "Home", href: "/business-dashboard", icon: Home },
    { label: "Special Features", href: "/business-dashboard/features", icon: Award },
    { label: "Page Upgrades", href: "/business-dashboard/upgrades", icon: Crown },
  ];
  return (
    <>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/10  z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white border border-gray-300 transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 flex flex-col ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between sm:p-[26.5px] p-4 border-b border-gray-300">
          <div className="flex items-center space-x-2">
            
            <Image src="/logo.png" alt="KAGOZ" width={1000} height={1000} className="w-[179px] object-cover h-[30px]" />
           
          </div>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-4">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center w-full px-[17px] py-3 rounded transition justify-start text-[18px]  leading-6 ${
                  pathname === href
                    ? "bg-[#F1EBFF] border border-[#6F00FF] text-[#6F00FF] rounded-[8px] font-medium"
                    : "text-[#353535] hover:text-gray-900 hover:bg-gray-100 font-normal"
                }`}
              >
                <Icon className="mr-3 size-6" />
                {label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Logout button */}
        <div className="p-4  mt-auto">
          <Button variant="destructive" className="w-full justify-start bg-red-500 hover:bg-red-600">
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </>
  )
}
