"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Send, Calendar, CheckCircle } from "lucide-react"

const whatsappMessages = [
  {
    id: 1,
    customer: "Maria Silva",
    phone: "+55 11 99999-1234",
    message: "Oi! Minha bike está com problema no freio. Vocês podem dar uma olhada?",
    time: "10:30",
    status: "unread",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    customer: "João Santos",
    phone: "+55 11 99999-5678",
    message: "Preciso trocar os pneus da minha mountain bike. Quanto custa?",
    time: "09:15",
    status: "replied",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    customer: "Ana Costa",
    phone: "+55 11 99999-9012",
    message: "Bom dia! Gostaria de agendar uma revisão completa da minha bike.",
    time: "08:45",
    status: "scheduled",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function WhatsAppPage() {
  const [selectedMessage, setSelectedMessage] = useState(whatsappMessages[0])
  const [reply, setReply] = useState("")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800"
      case "replied":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleSendReply = () => {
    if (reply.trim()) {
      // Here you would integrate with WhatsApp Business API
      console.log("Sending reply:", reply)
      setReply("")
    }
  }

  const handleScheduleService = () => {
    // Here you would open the calendar scheduling modal
    console.log("Opening calendar for:", selectedMessage.customer)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">WhatsApp Messages</h2>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Connected
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Recent Messages</CardTitle>
            <CardDescription>Customer service requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {whatsappMessages.map((msg) => (
              <div
                key={msg.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedMessage.id === msg.id ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedMessage(msg)}
              >
                <div className="flex items-start space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={msg.avatar || "/placeholder.svg"} alt={msg.customer} />
                    <AvatarFallback>
                      {msg.customer
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{msg.customer}</p>
                      <Badge className={`text-xs ${getStatusColor(msg.status)}`}>{msg.status}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{msg.phone}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">{msg.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={selectedMessage.avatar || "/placeholder.svg"} alt={selectedMessage.customer} />
                  <AvatarFallback>
                    {selectedMessage.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{selectedMessage.customer}</CardTitle>
                  <CardDescription>{selectedMessage.phone}</CardDescription>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleScheduleService}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </Button>
                <Button variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Done
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedMessage.avatar || "/placeholder.svg"} alt={selectedMessage.customer} />
                  <AvatarFallback>
                    {selectedMessage.customer
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{selectedMessage.customer}</p>
                  <p className="text-sm text-gray-600 mt-1">{selectedMessage.message}</p>
                  <p className="text-xs text-muted-foreground mt-2">{selectedMessage.time}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium">Reply to customer</label>
              <Textarea
                placeholder="Type your reply here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                rows={4}
              />
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    Quick Reply: "We'll check your bike"
                  </Button>
                  <Button variant="outline" size="sm">
                    Quick Reply: "Schedule appointment"
                  </Button>
                </div>
                <Button onClick={handleSendReply}>
                  <Send className="h-4 w-4 mr-2" />
                  Send Reply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
