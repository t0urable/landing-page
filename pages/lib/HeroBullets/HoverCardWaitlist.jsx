"use client"

import { CalendarDays } from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { InputForm } from "./PopupForm"

const HoverCardWaitlist = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost">Sign Up</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <InputForm></InputForm>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default HoverCardWaitlist;
