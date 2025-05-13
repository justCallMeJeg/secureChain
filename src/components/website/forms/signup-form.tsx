"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(1, {
      message: "Confirm Password must not be empty.",
    })
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Password must contain at least one special character.")
    .min(8, {
      message: "Password must be at least 8 characters long.",
    }),
  confirmPassword: z.string().min(1, {
    message: "Confirm Password must not be empty.",
  }),
})

const passwordRequirements = [
  {
    label: "At least 8 characters",
    test: (pw: string) => pw.length >= 8,
  },
  {
    label: "At least one lowercase letter",
    test: (pw: string) => /[a-z]/.test(pw),
  },
  {
    label: "At least one uppercase letter",
    test: (pw: string) => /[A-Z]/.test(pw),
  },
  {
    label: "At least one number",
    test: (pw: string) => /[0-9]/.test(pw),
  },
  {
    label: "At least one special character",
    test: (pw: string) => /[^a-zA-Z0-9]/.test(pw),
  },
]

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isPasswordFocused, setIsPasswordFocused] = useState(false)
  const [loading, setLoading] = useState(false) // Add loading state

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TO DO: Handle sign in logic here

    // Temporary logic demonstration (update in production)
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      })
      return
    }

    setLoading(true)
    // Simulate async background logic
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    console.log(values)
    
    toast("You submitted the following values:", {
      description: JSON.stringify(values, null, 2),
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => {
            const passwordValue = form.watch("password") || ""
            const unmetRequirements = passwordRequirements.filter(req => !req.test(passwordValue))
            const showIndicator = isPasswordFocused && unmetRequirements.length > 0

            return (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      onFocus={async () => {
                        await new Promise((resolve) => setTimeout(resolve, 100))
                        setIsPasswordFocused(true)
                      }}
                      onBlur={async () => {
                        await new Promise((resolve) => setTimeout(resolve, 100))
                        setIsPasswordFocused(false)
                      }}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                {showIndicator && (
                  <div className="mt-2 space-y-1 text-sm">
                    {unmetRequirements.map((req) => (
                      <div
                        key={req.label}
                        className={cn(
                          "flex items-center gap-2 text-muted-foreground"
                        )}
                      >
                        <span
                          className={cn(
                            "inline-block w-2 h-2 rounded-full border border-gray-400 bg-transparent"
                          )}
                        />
                        {req.label}
                      </div>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )
          }}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>
    </Form>
  )
}
