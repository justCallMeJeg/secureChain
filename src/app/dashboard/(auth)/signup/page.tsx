import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import SignUpForm from "@/components/website/forms/signup-form"
import { GoogleIconColored } from "@/components/ui/icons"

export const metadata: Metadata = {
  title: "Sign Up | SECURE Chain",
  description: "Create a new SECURE Chain account",
}

export default function SignUpPage() {
  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
          <p className="text-sm text-muted-foreground">Enter your information to create a new account.</p>
        </div>
        <div className="grid gap-6">
          <SignUpForm/>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <Button variant="outline" type="button" className="w-full">
            <GoogleIconColored className="mr-2 h-4 w-4"/>
            Google
          </Button>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/dashboard/login" className="underline underline-offset-4 hover:text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
