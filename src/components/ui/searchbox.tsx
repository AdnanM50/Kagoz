import Image from 'next/image'
import React from 'react'

const SearchBox: React.FC = () => {
  return (
   <div className="relative max-w-[585px]  mx-auto">
                               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                   <Image
                                       src="/icons/serch.png" 
                                       alt="Search icon"
                                       width={20}
                                       height={20}
                                       className="h-5 w-5 text-gray-400"
                                   />
                               </div>
                               <input
                                   type="text"
                                   placeholder="Start typing your business name"
                                   className="w-full pl-10 pr-4 py-[11px] border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 placeholder-gray-500"
                               />
                           </div>
  )
}

export default SearchBox
