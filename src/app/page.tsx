import SearchBox from '@/components/ui/searchbox';
import Image from 'next/image';
import React from 'react'

const Page: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto px-4 py-12">
                {/* Header Illustration */}
                <div className="flex justify-center mb-8">
                    <Image src="/images/Illustration1.png" alt="Business listing illustration" width={1000} height={1000} className="w-[270px] h-[174px]" />
                </div>
                {/* Main Content */}
                <div className="text-center ">
                    {/* Main Heading */}
                    <h1 className="heading mb-4 inter-font">
                        Let's Check If Your Business is Already Listed
                    </h1>
                    {/* Subheading */}
                    <p className="Subheading inter-font">
                        We'll avoid duplicates and help you take control of your listing if it already exists.
                    </p>
                    {/* Search Form */}
                    <div className="mt-[32px] ">

                        <SearchBox />
                        {/* Example Text */}
                        <p className="mt-3 example-text inter-font">
                            e.g. Rahman Electronics or Molla Pharmacy
                        </p>

                        <div className="mt-8 mb-4 flex justify-center items-center">

                            <Image
                                src="/icons/searchicon.png"
                                alt="Search icon"
                                width={1000}
                                height={1000}
                                className="size-16"
                            />
                            {/* </button> */}
                        </div>
                        {/* Bottom Helper Text */}
                        <p className="bottom-text inter-font">
                            Start typing to search for your business
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page;