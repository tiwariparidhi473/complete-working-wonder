
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Users, User, GraduationCap, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const Register = () => {
  const [role, setRole] = useState<"mentor" | "mentee" | "">("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    department: "",
    bio: "",
    availability: ""
  });
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { signUp, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/search");
    }
  }, [user, navigate]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: role,
        department: formData.department,
        bio: formData.bio,
        skills: skills.join(','),
        availability: formData.availability
      };

      const { error } = await signUp(formData.email, formData.password, userData);
      
      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Registration Successful!",
          description: `Welcome to MentorMatch as a ${role}! Please check your email to verify your account.`,
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MentorMatch
              </span>
            </Link>
            <Link to="/login">
              <Button variant="ghost">Already have an account?</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Join MentorMatch</h1>
            <p className="text-gray-600">Create your profile and start your mentorship journey</p>
          </div>

          {!role && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Choose Your Role</CardTitle>
                <CardDescription>Select how you'd like to participate in our mentorship community</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-6">
                <div 
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                  onClick={() => setRole("mentee")}
                >
                  <div className="text-center">
                    <User className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">I'm a Mentee</h3>
                    <p className="text-gray-600 text-sm">I want to learn from experienced professionals and grow my skills</p>
                  </div>
                </div>
                <div 
                  className="p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all"
                  onClick={() => setRole("mentor")}
                >
                  <div className="text-center">
                    <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">I'm a Mentor</h3>
                    <p className="text-gray-600 text-sm">I want to share my knowledge and help others advance their careers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {role && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {role === "mentor" ? <GraduationCap className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  {role === "mentor" ? "Mentor" : "Mentee"} Registration
                </CardTitle>
                <CardDescription>
                  Complete your profile to get matched with the perfect {role === "mentor" ? "mentees" : "mentor"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        required 
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password" 
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      required 
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => setFormData({...formData, department: value})}
                      required
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
                      required
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
                    <Label htmlFor="bio">
                      {role === "mentor" ? "Professional Bio" : "About Me"}
                    </Label>
                    <Textarea 
                      id="bio" 
                      placeholder={role === "mentor" 
                        ? "Tell potential mentees about your experience, expertise, and mentoring style..." 
                        : "Tell potential mentors about your goals, interests, and what you're looking to learn..."
                      }
                      className="min-h-[100px]"
                      value={formData.bio}
                      onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      required
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setRole("")}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      disabled={loading}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
