import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Clock, DollarSign, Wrench } from "lucide-react"

const services = [
  {
    id: 1,
    name: "Basic Tune-up",
    description: "Basic maintenance including chain lubrication and brake adjustment",
    price: 50,
    duration: 45,
    category: "maintenance",
  },
  {
    id: 2,
    name: "Full Service",
    description: "Complete bike overhaul including all components check",
    price: 120,
    duration: 120,
    category: "maintenance",
  },
  {
    id: 3,
    name: "Brake Replacement",
    description: "Replace brake pads and adjust brake system",
    price: 80,
    duration: 60,
    category: "repair",
  },
  {
    id: 4,
    name: "Tire Replacement",
    description: "Replace tires and inner tubes",
    price: 60,
    duration: 30,
    category: "repair",
  },
  {
    id: 5,
    name: "Gear Adjustment",
    description: "Fine-tune gear shifting and derailleur alignment",
    price: 40,
    duration: 30,
    category: "adjustment",
  },
]

const recentServiceOrders = [
  {
    id: 1,
    customer: "Maria Silva",
    service: "Brake Replacement",
    status: "in-progress",
    startTime: "14:30",
    estimatedCompletion: "15:30",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    customer: "João Santos",
    service: "Full Service",
    status: "pending",
    startTime: "16:00",
    estimatedCompletion: "18:00",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 3,
    customer: "Ana Costa",
    service: "Basic Tune-up",
    status: "completed",
    startTime: "13:00",
    estimatedCompletion: "13:45",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function ServicesPage() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "maintenance":
        return "bg-blue-100 text-blue-800"
      case "repair":
        return "bg-red-100 text-red-800"
      case "adjustment":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Services</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Service Catalog</CardTitle>
            <CardDescription>Available services and pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{service.name}</h3>
                      <Badge className={getCategoryColor(service.category)}>{service.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium">${service.price}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span>{service.duration} min</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Wrench className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Service Orders</CardTitle>
            <CardDescription>Currently being worked on</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentServiceOrders.map((order) => (
              <div key={order.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={order.avatar || "/placeholder.svg"} alt={order.customer} />
                      <AvatarFallback>
                        {order.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{order.customer}</p>
                      <p className="text-sm text-muted-foreground">{order.service}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Started: {order.startTime}</span>
                  <span>ETA: {order.estimatedCompletion}</span>
                </div>
                {order.status === "in-progress" && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">60% complete</p>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
