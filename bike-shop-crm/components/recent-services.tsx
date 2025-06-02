import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar } from "lucide-react"

const recentServices = [
  {
    id: 1,
    customer: "Maria Silva",
    phone: "+55 11 99999-1234",
    service: "Brake adjustment",
    message: "Hi! My bike brakes are making noise. Can you help?",
    time: "2 hours ago",
    status: "pending",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    customer: "João Santos",
    phone: "+55 11 99999-5678",
    service: "Tire replacement",
    message: "Need new tires for my mountain bike",
    time: "4 hours ago",
    status: "scheduled",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    customer: "Ana Costa",
    phone: "+55 11 99999-9012",
    service: "Full maintenance",
    message: "My bike needs a complete check-up",
    time: "6 hours ago",
    status: "in-progress",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 4,
    customer: "Pedro Lima",
    phone: "+55 11 99999-3456",
    service: "Chain lubrication",
    message: "Chain is very dry and noisy",
    time: "1 day ago",
    status: "completed",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function RecentServices() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-orange-100 text-orange-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-4">
      {recentServices.map((service) => (
        <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={service.avatar || "/placeholder.svg"} alt={service.customer} />
              <AvatarFallback>
                {service.customer
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <p className="text-sm font-medium">{service.customer}</p>
                <Badge variant="outline" className={getStatusColor(service.status)}>
                  {service.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{service.service}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MessageSquare className="h-3 w-3" />
                <span>{service.message}</span>
              </div>
              <p className="text-xs text-muted-foreground">{service.time}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            {service.status === "pending" && (
              <Button size="sm" variant="outline">
                <Calendar className="h-4 w-4 mr-1" />
                Schedule
              </Button>
            )}
            <Button size="sm" variant="ghost">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
