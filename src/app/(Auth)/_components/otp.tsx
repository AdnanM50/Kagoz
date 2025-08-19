'use client'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowLeft, CheckCircle, Lock, Mail, Phone, Send, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import SuccessModal from './successDialog';
import LeftSideOtp from './leftsideOtp'

const OtpPage = () => {
  
    const [otp, setOtp] = useState("")
    const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
    setIsVerified(true);
  };
    return (
        <div className=" flex items-center justify-center inter-font my-[54px] ">
            <div className="max-w-[942px] place-items-center grid md:grid-cols-2 gap-[56px] bg-white rounded-2xl ">
                {/* Left side */}
              <LeftSideOtp />
                {/* Right side */}
                <div className="p-8 rounded-[16px] bg-white authform-shadow w-full">
   {isVerified && (
     <SuccessModal
       open={isVerified}
       onOpenChange={setIsVerified}
       title="Success"
       description="Your account has been successfully verified and created."
       actionLabel="Continue to business setup"
       actionHref="/setup"
     />
   )}
                    <Link href="/signin" className="common-text  !font-normal text-[#111827] flex items-center mb-[23px]">
                        <ArrowLeft className="size-4 mr-1" /> Back to Sign In
                    </Link>

                    <h2 className="auth-heading !font-semibold text-[#111827]  mb-2">Verify OTP</h2>
                    <p className="common-text !font-normal  text-[#2D3643] mb-8">
                      Enter the 6-digit code sent to your phone
                    </p>

                   <form className="space-y-5 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col  gap-4">
            
              
              <InputOTP
                value={otp}
                onChange={setOtp}
                maxLength={6}
                label='Verification Code'
              >
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
              className="w-full cursor-pointer"
              disabled={otp.length !== 6} 
            >
              <CheckCircle className=" text-white siz-4" strokeWidth={2} />
              Verify OTP
            </Button>

            <p className="text-center !font-normal common-text text-[#2D3643] inter-font">
              Resend code in 
              <span className="text-[#6F00FF] ml-0.5 font-semibold">
                54s
              </span>
            </p>

            <p className="text-center !font-normal common-text text-[#2D3643] inter-font">
              Didn't receive any code? 
              <span className="text-[#6F00FF] font-semibold ml-1">
                Resend code
              </span>
            </p>
          </form>
                </div>
            </div>
        </div>
    )
}

export default OtpPage