'use client'
import { cn } from "@/lib/utils"
import React, { useState } from "react"

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

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault() 
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
    
      </form>
    </div>
  )
}

