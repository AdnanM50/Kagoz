import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React from 'react'
import { Mail, Phone, Lock } from 'lucide-react'

const LoginForm = () => {
  return (
    <form className="space-y-5 w-full">
            {/* Email */}
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              icon={Mail}
            />


            {/* Password */}
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              icon={Lock}
            />

            {/* Checkbox */}
          <div className="flex justify-between">
              <div className="flex items-center  space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm text-[#353535] leading-5 font-normal inter-font"
              >
              Remember me
              </label>
            </div>
            <p className="text-sm text-[#DC3545] leading-5 font-normal inter-font">Forgot password?</p>
          </div>

            {/* Sign up button */}
            <Button variant="submit" className="w-full cursor-pointer">
              Sign Up
            </Button>
        <div className="flex items-center">
            <div className="h-[1px] bg-[#E4E4E4] w-full"></div>
            <p className="text-center text-gray-500 whitespace-pre mx-1.5">Or sign up with</p>
            <div className="h-[1px] bg-[#E4E4E4] w-full"></div>
        </div>
            <Button
              variant="outline"
              className="w-full flex cursor-pointer text-[#111827] items-center justify-center gap-2"
            >
              <Image
                width={20}
                height={20}
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="size-4"
              />
              Continue with Google
            </Button>

            <p className="text-center common-text text-[#2D3643] inter-font">
              Already have an account?{" "}
              <a href="#" className="text-[#6F00FF] font-semibold">
                Sign in
              </a>
            </p>
          </form>
  )
}

export default LoginForm
