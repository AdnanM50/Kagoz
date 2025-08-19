'use client'

import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowLeft, CheckCircle, Lock, Mail, Phone, Send, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {

    const [otp, setOtp] = useState("")
    const isComplete = otp.length === 6
    return (
        <div className=" flex items-center justify-center inter-font my-[54px] ">
            <div className="max-w-[942px] place-items-center grid md:grid-cols-2 gap-[56px] bg-white rounded-2xl ">
                {/* Left side */}
                <div className="relative hidden md:flex items-center justify-center  pl-7 mx-1.5">
                    {/* Background gradient image */}
                    <div className="absolute bottom-12 left-1 inset-0 flex items-center justify-center ">
                        <Image
                            src="/images/authbg.png"
                            alt="Background"
                            width={600}
                            height={600}
                            className="w-[430px]  object-cover rounded-2xl rotate-1"
                        />
                    </div>
                    <div className="bg-white px-[23.5px] authform2-shadow relative z-10 pt-[31px] pb-[62px] rounded-[16px] ">
                        <div className="text-center">
                            <div className="mx-auto size-16 sm:size-32 rounded-full bg-gradient-to-r from-[#9D6BFF] to-[#431799] flex items-center justify-center">
                          
                                  <Phone strokeWidth={1} className="text-white size-8 sm:size-16" />
                             
                            </div>
                            <h2 className="auth-heading  mt-2 mb-3 text-[#111827]">Verify OTP</h2>
                            <p className="common-text !text-[14px] !font-normal !text-[#2D3643] mb-8">
                                We've sent a 6-digit verification code to your email address. Please enter it to continue.
                            </p>
                            <ul className="text-left space-y-4 text-gray-700">
                                <li className="flex items-center text-[14px] ">
                                    <Shield className="size-4 text-[#6F00FF] mr-2" />
                                    Secure password reset process
                                </li>
                                <li className="flex items-center text-[14px] ">
                                    <Mail className="size-4 text-[#6F00FF] mr-2" />
                                    Link expires in 5 minutes
                                </li>
                                <li className="flex items-center text-[14px] ">
                                    <CheckCircle className="size-4 text-[#6F00FF] mr-2" />
                                    Quick and easy process
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>


                {/* Right side */}
                <div className="p-8 rounded-[16px] bg-white authform-shadow w-full">
                    <Link href="/signin" className="common-text  !font-normal text-[#111827] flex items-center mb-[23px]">
                        <ArrowLeft className="size-4 mr-1" /> Back to Sign In
                    </Link>

                    <h2 className="auth-heading !font-semibold text-[#111827]  mb-2">Verify OTP</h2>
                    <p className="common-text !font-normal  text-[#2D3643] mb-8">
                      Enter the 6-digit code sent to your phone
                    </p>
<form className="space-y-5 w-full" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col  gap-4">
              

              <InputOTP value={otp} onChange={setOtp} maxLength={6} label="Verification Code">
                {Array.from({ length: 6 }).map((_, index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTP>

              <p className="text-sm text-gray-500">
                Enter the 6-digit code sent to your email
              </p>
            </div>

            <Button
              type="submit"
              variant="submit"
              className="w-full"
              disabled={!isComplete}
            >
              <CheckCircle className="text-white siz-4" strokeWidth={2} />
              Verify OTP
            </Button>

            <p className="text-center !font-normal common-text text-[#2D3643] inter-font">
              Resend code in <span className="text-[#6F00FF] ml-0.5 font-semibold">54s</span>
            </p>

            <p className="text-center !font-normal common-text text-[#2D3643] inter-font">
              Didn't receive any code? <span className="text-[#6F00FF] font-semibold">Resend code</span>
            </p>
          </form>
                </div>
            </div>
        </div>
    )
}

export default Page