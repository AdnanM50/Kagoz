"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Check, ArrowRight, Diamond } from "lucide-react"

export default function PageUpgrade() {
  const [isUpgraded, setIsUpgraded] = useState(false)

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Section - Content */}
          <div className="space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-900">
                Page Upgrades
              </h1>
              <p className="text-lg text-gray-600">
                Upgrade and enhance existing pages anytime
              </p>
            </div>

            {/* Main Benefit */}
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-gray-900">
                Businesses see an average of 50 more page visits 14 days after setting it up
              </h2>
              <p className="text-gray-600">
                A set of features that boosts the appeal of your page and your business.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-900">Remove competitor ads from your business page</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-900">Stand out in search results and take more control of your business page</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-900">Convert more page views into calls, messages, and visits</span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Diamond className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-purple-900 text-sm">
                  Bundle all Upgrade Package features at $6/day avg (compared to $16/day avg when purchased individually)
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <Button 
              variant="submit" 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-4"
            >
              Get started with a 14 day free trial
              <ArrowRight className="w-5 h-5" />
            </Button>

            {/* Disclaimer */}
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                Based on a sample of businesses that set up Upgrade Package between November 2021 and March 2022. Study compared page views received 14 days before setting up versus 14 days after.
              </p>
              <p>
                Cancel anytime during your free trial. Charges apply after. Additional terms apply.
              </p>
            </div>

            {/* Question Link */}
            <div>
              <a href="#" className="text-purple-600 hover:text-purple-700 font-medium">
                How is this different from Yelp Ads?
              </a>
            </div>
          </div>

          {/* Right Section - Mobile Mockup */}
          <div className="flex flex-col items-center space-y-6">
            {/* Toggle Switch */}
            <div className="flex items-center gap-4">
              <span className={`text-sm font-medium ${!isUpgraded ? 'text-gray-900' : 'text-gray-500'}`}>
                Before upgrade
              </span>
              <Switch
                checked={isUpgraded}
                onCheckedChange={setIsUpgraded}
                className="w-12 h-6"
              />
              <span className={`text-sm font-medium ${isUpgraded ? 'text-gray-900' : 'text-gray-500'}`}>
                After upgrade
              </span>
            </div>

            {/* Mobile Phone Mockup */}
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-80 h-[600px] bg-white border-2 border-purple-200 rounded-[40px] shadow-xl relative overflow-hidden">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl z-10"></div>
                
                {/* Screen Content */}
                <div className="h-full overflow-y-auto bg-gray-50">
                  {/* Header */}
                  <div className="bg-white p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                          <span className="text-purple-600 font-bold text-sm">LV</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">Louis Vuitton</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400">★</span>
                            <span className="text-sm text-gray-600">4.5</span>
                          </div>
                        </div>
                      </div>
                      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Follow
                      </button>
                    </div>
                  </div>

                  {/* Essential Info */}
                  <div className="bg-white p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Essential Info</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📍 123 Fashion Ave, New York, NY</p>
                      <p>📞 (555) 123-4567</p>
                      <p>🌐 louisvuitton.com</p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-white p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Contact Info</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📧 info@louisvuitton.com</p>
                      <p>📱 @louisvuitton</p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-white p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Mon-Fri: 10:00 AM - 8:00 PM</p>
                      <p>Sat-Sun: 11:00 AM - 7:00 PM</p>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="bg-white p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">Wheelchair Accessible</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">Free WiFi</span>
                      <span className="bg-gray-100 px-2 py-1 rounded text-xs">Parking</span>
                    </div>
                  </div>

                  {/* About */}
                  <div className="bg-white p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">About the Business</h4>
                    <p className="text-sm text-gray-600">
                      Luxury fashion house offering premium leather goods, accessories, and ready-to-wear collections.
                    </p>
                  </div>

                  {/* Photos */}
                  <div className="bg-white p-4 border-b border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">Photos</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="aspect-square bg-gray-200 rounded-lg"></div>
                      ))}
                    </div>
                  </div>

                  {/* Sponsored Section (Before Upgrade) */}
                  {!isUpgraded && (
                    <div className="bg-white p-4 border-b border-gray-200">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-yellow-600 text-xs font-medium">SPONSORED</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                            <div>
                              <p className="text-sm font-medium">Gucci Store</p>
                              <p className="text-xs text-gray-600">Luxury Fashion</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gray-300 rounded"></div>
                            <div>
                              <p className="text-sm font-medium">Prada Boutique</p>
                              <p className="text-xs text-gray-600">Designer Bags</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* You might also like (Before Upgrade) */}
                  {!isUpgraded && (
                    <div className="bg-white p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">You might also like</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-300 rounded"></div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">Hermès</p>
                            <p className="text-xs text-gray-600">Luxury Goods</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-yellow-400 text-xs">★</span>
                              <span className="text-xs text-gray-600">4.8</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gray-300 rounded"></div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">Chanel</p>
                            <p className="text-xs text-gray-600">Fashion House</p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-yellow-400 text-xs">★</span>
                              <span className="text-xs text-gray-600">4.7</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* After Upgrade Content */}
                  {isUpgraded && (
                    <div className="bg-white p-4">
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Check className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-green-900 mb-2">Upgrade Active</h4>
                        <p className="text-sm text-green-700">
                          Competitor ads removed. Your business now stands out!
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Background Pattern */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 left-10 w-4 h-4 bg-purple-200 rounded-full opacity-50"></div>
                <div className="absolute top-40 right-20 w-6 h-6 bg-purple-100 rounded-full opacity-30"></div>
                <div className="absolute bottom-20 left-20 w-3 h-3 bg-purple-200 rounded-full opacity-40"></div>
                <div className="absolute bottom-40 right-10 w-5 h-5 bg-purple-100 rounded-full opacity-25"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
