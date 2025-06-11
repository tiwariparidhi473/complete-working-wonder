
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Search, 
  Calendar, 
  MessageSquare, 
  Star, 
  Clock,
  User,
  GraduationCap,
  Settings,
  LogOut
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [userRole] = useState<"mentor" | "mentee">("mentee"); // This would come from auth context

  const pendingRequests = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Senior Developer",
      department: "Computer Science",
      skills: ["React", "Node.js", "System Design"],
      message: "Hi! I'd love to learn more about system architecture and scalable web applications.",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Product Manager",
      department: "Product Management",
      skills: ["Strategy", "Analytics", "Leadership"],
      message: "Looking for guidance on transitioning from developer to product management.",
      status: "pending", 
      date: "2024-01-14"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      mentor: "Dr. Emily Watson",
      mentee: "Alex Johnson",
      date: "2024-01-20",
      time: "2:00 PM",
      topic: "Career Development Strategy",
      status: "confirmed"
    },
    {
      id: 2,
      mentor: "James Liu",
      mentee: "Maria Garcia", 
      date: "2024-01-22",
      time: "10:00 AM",
      topic: "Technical Interview Preparation",
      status: "pending"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "session_completed",
      message: "Completed mentorship session with Dr. Emily Watson",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "request_received",
      message: "New mentorship request from Alex Chen",
      time: "1 day ago"
    },
    {
      id: 3,
      type: "rating_received",
      message: "Received 5-star rating from previous mentee",
      time: "3 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MentorMatch
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/search">
                <Button variant="ghost" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  {userRole === "mentee" ? "Find Mentors" : "Find Mentees"}
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                JD
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, John!</h1>
              <div className="flex items-center space-x-2 mt-1">
                {userRole === "mentor" ? (
                  <GraduationCap className="h-4 w-4 text-purple-600" />
                ) : (
                  <User className="h-4 w-4 text-blue-600" />
                )}
                <span className="text-gray-600 capitalize">{userRole}</span>
                <Badge variant="secondary">Computer Science</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {userRole === "mentor" ? "Active Mentees" : "Active Mentors"}
                </CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Pending Requests</CardTitle>
                <MessageSquare className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Sessions This Month</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="requests">
              Requests 
              <Badge variant="secondary" className="ml-2">
                {pendingRequests.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Sessions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Sessions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingSessions.slice(0, 3).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">
                          {userRole === "mentor" ? session.mentee : session.mentor}
                        </p>
                        <p className="text-sm text-gray-600">{session.topic}</p>
                        <p className="text-sm text-gray-500">{session.date} at {session.time}</p>
                      </div>
                      <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                        {session.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Requests */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Recent Requests
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pendingRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{request.name}</p>
                          <p className="text-sm text-gray-600">{request.role}</p>
                        </div>
                        <Badge>{request.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{request.message}</p>
                      <div className="flex gap-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700">
                          Accept
                        </Button>
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Requests</CardTitle>
                <CardDescription>
                  Manage incoming requests from {userRole === "mentor" ? "mentees" : "mentors"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{request.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">{request.name}</h3>
                          <p className="text-gray-600">{request.role}</p>
                          <Badge variant="outline">{request.department}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{request.status}</Badge>
                        <p className="text-sm text-gray-500 mt-1">{request.date}</p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-gray-700 mb-3">{request.message}</p>
                      <div className="flex flex-wrap gap-2">
                        {request.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="bg-green-600 hover:bg-green-700">
                        Accept Request
                      </Button>
                      <Button variant="outline">
                        Decline
                      </Button>
                      <Button variant="ghost">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
                <CardDescription>View and manage your mentorship sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {upcomingSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{session.topic}</h3>
                        <p className="text-gray-600">
                          with {userRole === "mentor" ? session.mentee : session.mentor}
                        </p>
                      </div>
                      <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                        {session.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{session.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{session.time}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline">Reschedule</Button>
                      <Button variant="ghost" className="text-red-600 hover:text-red-700">
                        Cancel Session
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your recent mentorship activities and updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
