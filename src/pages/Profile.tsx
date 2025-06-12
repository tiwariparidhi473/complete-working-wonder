
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  User,
  Settings,
  Star,
  Calendar,
  X,
  Save,
  Upload
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useUserProfile } from "@/hooks/useUserProfile";

const Profile = () => {
  const { profile, loading, updateProfile } = useUserProfile();
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    department: "",
    bio: "",
    availability: ""
  });
  const { toast } = useToast();

  // Initialize form data when profile loads
  useState(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || "",
        last_name: profile.last_name || "",
        department: profile.department || "",
        bio: profile.bio || "",
        availability: profile.availability || ""
      });
      setSkills(profile.skills || []);
    }
  }, [profile]);

  const departments = [
    "Computer Science",
    "Engineering", 
    "Business",
    "Marketing",
    "Design",
    "Data Science",
    "Product Management",
    "Sales",
    "Finance",
    "Operations"
  ];

  const availabilityOptions = [
    "Weekday Mornings",
    "Weekday Afternoons", 
    "Weekday Evenings",
    "Weekend Mornings",
    "Weekend Afternoons",
    "Weekend Evenings",
    "Flexible"
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleSave = async () => {
    const updates = {
      ...formData,
      skills
    };

    const { error } = await updateProfile(updates);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      });
    }
  };

  const mockSessions = [
    {
      id: 1,
      mentee: "Alex Johnson",
      topic: "React Best Practices",
      date: "2024-01-15",
      rating: 5,
      feedback: "Extremely helpful session! Great insights into React optimization and code structure."
    },
    {
      id: 2,
      mentee: "Maria Garcia",
      topic: "System Design Interview Prep",
      date: "2024-01-10",
      rating: 5,
      feedback: "Great mentor! Helped me understand distributed systems concepts clearly."
    },
    {
      id: 3,
      mentee: "David Chen",
      topic: "Career Development",
      date: "2024-01-05",
      rating: 4,
      feedback: "Very insightful discussion about career progression in tech. Highly recommend!"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Profile Not Found</CardTitle>
            <CardDescription>Please complete your profile setup.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const userInitials = `${profile.first_name?.[0] || ''}${profile.last_name?.[0] || ''}`.toUpperCase();
  const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim();

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
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/search">
                <Button variant="ghost">Search</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-8">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="sm" 
              className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
              variant="secondary"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{fullName}</h1>
            <p className="text-gray-600 capitalize">{profile.role}</p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge>{profile.department}</Badge>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.9</span>
                <span className="text-gray-500 text-sm">(24 reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="sessions">Session History</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>
                  Update your profile information to help others find and connect with you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={profile.email || ''} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={(value) => setFormData({...formData, department: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Skills</Label>
                  <div className="flex gap-2">
                    <Input 
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="Add a skill"
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                    />
                    <Button type="button" onClick={addSkill} variant="outline">Add</Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="h-3 w-3 cursor-pointer" 
                          onClick={() => removeSkill(skill)}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availability">Availability</Label>
                  <Select 
                    value={formData.availability} 
                    onValueChange={(value) => setFormData({...formData, availability: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your availability" />
                    </SelectTrigger>
                    <SelectContent>
                      {availabilityOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell others about your experience, expertise, and mentoring style..."
                    className="min-h-[120px]"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>

                <Button onClick={handleSave} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Session History & Reviews
                </CardTitle>
                <CardDescription>
                  View your past mentorship sessions and feedback from mentees
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockSessions.map((session) => (
                  <div key={session.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{session.topic}</h3>
                        <p className="text-gray-600">with {session.mentee}</p>
                        <p className="text-sm text-gray-500">{session.date}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < session.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-2 font-medium">{session.rating}/5</span>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Feedback:</h4>
                      <p className="text-gray-700 italic">"{session.feedback}"</p>
                    </div>
                  </div>
                ))}
                
                <div className="text-center py-8">
                  <p className="text-gray-500">That's all your sessions so far!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account Settings
                </CardTitle>
                <CardDescription>
                  Manage your account preferences and security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={profile.email || ''} disabled />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>

                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Update Account
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
