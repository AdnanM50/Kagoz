"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"




export default function BusinessDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="min-h-screen bg-[#FCFCFD] inter-font">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Main content */}
          <div className="lg:ml-60">
            <Header setSidebarOpen={setSidebarOpen} className="fixed top-0 left-0 right-0 z-30 lg:ml-64" />
            <main className="pt-[72px]">{children}</main>
          </div>
        </div>
      </body>
    </html>
  )
}
