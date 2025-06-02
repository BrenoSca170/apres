import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

const upcomingAppointments = [
  {
    id: 1,
    customer: "Carlos Oliveira",
    service: "Gear adjustment",
    date: "Today",
    time: "14:30",
    duration: "45 min",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    customer: "Lucia Ferreira",
    service: "Wheel alignment",
    date: "Today",
    time: "16:00",
    duration: "30 min",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    customer: "Roberto Alves",
    service: "Full service",
    date: "Tomorrow",
    time: "09:00",
    duration: "2 hours",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    customer: "Fernanda Souza",
    service: "Brake replacement",
    date: "Tomorrow",
    time: "11:30",
    duration: "1 hour",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function UpcomingAppointments() {
  return (
    <div className="space-y-4">
      {upcomingAppointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center space-x-4 p-3 border rounded-lg">
          <Avatar className="h-10 w-10">
            <AvatarImage src={appointment.avatar || "/placeholder.svg"} alt={appointment.customer} />
            <AvatarFallback>
              {appointment.customer
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium">{appointment.customer}</p>
            <p className="text-sm text-muted-foreground">{appointment.service}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>
                  {appointment.date} at {appointment.time}
                </span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {appointment.duration}
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
