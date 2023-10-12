'use client'
import { cn } from "@/lib/utils"
import React, { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

import { signIn } from 'next-auth/react'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

interface IUser {
  email: string
  password: string
}
export const UserLoginForm = ({
  className,
  ...props
}: UserAuthFormProps) => {
  const [data, setData ] = useState<IUser>({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    setIsLoading(true) 

    const res = await signIn<'credentials'>('credentials', {
      ...data,
      redirect: false,
    })

    setData({
      email: '',
      password: ''
    })
    setIsLoading(false) 
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input 
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              name="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="senha"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
            )}
            Entra
          </Button>
        </div>
      </form>
    </div>
  )
}

