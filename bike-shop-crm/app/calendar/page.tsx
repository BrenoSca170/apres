"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"

const appointments = [
  {
    id: 1,
    customer: "Carlos Oliveira",
    service: "Gear adjustment",
    date: "2024-01-15",
    time: "14:30",
    duration: 45,
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    customer: "Lucia Ferreira",
    service: "Wheel alignment",
    date: "2024-01-15",
    time: "16:00",
    duration: 30,
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    customer: "Roberto Alves",
    service: "Full service",
    date: "2024-01-16",
    time: "09:00",
    duration: 120,
    status: "pending",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    customer: "Fernanda Souza",
    service: "Brake replacement",
    date: "2024-01-16",
    time: "11:30",
    duration: 60,
    status: "confirmed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const currentWeek = [
  { date: "15", day: "Mon", full: "2024-01-15" },
  { date: "16", day: "Tue", full: "2024-01-16" },
  { date: "17", day: "Wed", full: "2024-01-17" },
  { date: "18", day: "Thu", full: "2024-01-18" },
  { date: "19", day: "Fri", full: "2024-01-19" },
  { date: "20", day: "Sat", full: "2024-01-20" },
]

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState("2024-01-15")

  const getAppointmentsForDate = (date: string) => {
    return appointments.filter((apt) => apt.date === date)
  }

  const getAppointmentForTimeSlot = (date: string, time: string) => {
    return appointments.find((apt) => apt.date === date && apt.time === time)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Service Calendar</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Appointment
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>January 2024</CardTitle>
                <CardDescription>Weekly view</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2 mb-4">
              <div className="p-2 text-sm font-medium text-center">Time</div>
              {currentWeek.map((day) => (
                <div
                  key={day.full}
                  className={`p-2 text-sm font-medium text-center rounded cursor-pointer transition-colors ${
                    selectedDate === day.full ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedDate(day.full)}
                >
                  <div>{day.day}</div>
                  <div className="text-lg">{day.date}</div>
                </div>
              ))}
            </div>

            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-7 gap-2">
                {timeSlots.map((time) => (
                  <div key={time} className="contents">
                    <div className="p-2 text-xs text-muted-foreground text-center border-r">{time}</div>
                    {currentWeek.map((day) => {
                      const appointment = getAppointmentForTimeSlot(day.full, time)
                      return (
                        <div key={`${day.full}-${time}`} className="p-1 min-h-[40px] border-b border-gray-100">
                          {appointment && (
                            <div className={`p-2 rounded text-xs border ${getStatusColor(appointment.status)}`}>
                              <div className="font-medium truncate">{appointment.customer}</div>
                              <div className="truncate">{appointment.service}</div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Today's Schedule</CardTitle>
            <CardDescription>
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {getAppointmentsForDate(selectedDate).length === 0 ? (
              <p className="text-sm text-muted-foreground">No appointments scheduled</p>
            ) : (
              getAppointmentsForDate(selectedDate).map((appointment) => (
                <div key={appointment.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(appointment.status)}>{appointment.status}</Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.duration}min
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.customer} />
                      <AvatarFallback>
                        {appointment.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{appointment.customer}</p>
                      <p className="text-xs text-muted-foreground">{appointment.time}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{appointment.service}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
