
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Users, 
  Search as SearchIcon, 
  Star, 
  MapPin, 
  Clock,
  MessageSquare,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Senior Software Engineer",
      department: "Computer Science",
      company: "Tech Corp",
      skills: ["React", "Python", "System Design", "Leadership"],
      rating: 4.9,
      sessions: 45,
      availability: "Weekday Evenings",
      bio: "Passionate about helping junior developers grow their technical and leadership skills. 8+ years of experience in full-stack development.",
      hourlyRate: "$80/hour"
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Product Manager",
      department: "Product Management", 
      company: "StartupXYZ",
      skills: ["Strategy", "Analytics", "User Research", "Agile"],
      rating: 4.8,
      sessions: 32,
      availability: "Flexible",
      bio: "Former engineer turned PM. Love helping others transition into product management and build great products.",
      hourlyRate: "$100/hour"
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Data Science Manager",
      department: "Data Science",
      company: "DataFlow Inc",
      skills: ["Machine Learning", "Python", "SQL", "Visualization"],
      rating: 4.7,
      sessions: 28,
      availability: "Weekend Mornings",
      bio: "Experienced data scientist passionate about making data science accessible and helping others break into the field.",
      hourlyRate: "$90/hour"
    },
    {
      id: 4,
      name: "James Liu",
      role: "UX Design Lead",
      department: "Design",
      company: "Creative Studio",
      skills: ["UI/UX", "Figma", "User Research", "Prototyping"],
      rating: 4.9,
      sessions: 38,
      availability: "Weekday Afternoons",
      bio: "10+ years in design. Specialize in helping designers develop their craft and build compelling user experiences.",
      hourlyRate: "$85/hour"
    },
    {
      id: 5,
      name: "Rachel Green",
      role: "Marketing Director",
      department: "Marketing",
      company: "Growth Co",
      skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"],
      rating: 4.6,
      sessions: 25,
      availability: "Weekday Mornings",
      bio: "Marketing professional with expertise in growth marketing and brand building. Love helping marketers advance their careers.",
      hourlyRate: "$75/hour"
    },
    {
      id: 6,
      name: "David Kim",
      role: "Finance Manager",
      department: "Finance",
      company: "FinTech Solutions",
      skills: ["Financial Analysis", "Modeling", "Excel", "Strategy"],
      rating: 4.8,
      sessions: 22,
      availability: "Weekend Afternoons",
      bio: "CPA with 12+ years experience. Passionate about helping others understand finance and advance in their careers.",
      hourlyRate: "$95/hour"
    }
  ];

  const departments = [
    "Computer Science",
    "Product Management", 
    "Data Science",
    "Design",
    "Marketing",
    "Finance",
    "Engineering",
    "Business",
    "Sales",
    "Operations"
  ];

  const allSkills = [
    "React", "Python", "System Design", "Leadership", "Strategy", "Analytics", 
    "User Research", "Agile", "Machine Learning", "SQL", "Visualization",
    "UI/UX", "Figma", "Prototyping", "Digital Marketing", "SEO", "Content Strategy",
    "Financial Analysis", "Modeling", "Excel"
  ];

  const filteredMentors = mentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = !selectedDepartment || mentor.department === selectedDepartment;
    const matchesSkill = !selectedSkill || mentor.skills.includes(selectedSkill);
    
    return matchesSearch && matchesDepartment && matchesSkill;
  });

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
              <Link to="/profile">
                <Button variant="ghost">Profile</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Your Perfect Mentor</h1>
          <p className="text-gray-600">Browse through our community of experienced professionals ready to guide your journey</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <Label htmlFor="search">Search mentors</Label>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, role, or skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="department">Department</Label>
                <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                  <SelectTrigger>
                    <SelectValue placeholder="All departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="skill">Skill</Label>
                <Select value={selectedSkill} onValueChange={setSelectedSkill}>
                  <SelectTrigger>
                    <SelectValue placeholder="All skills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All skills</SelectItem>
                    {allSkills.map((skill) => (
                      <SelectItem key={skill} value={skill}>{skill}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">
            Found {filteredMentors.length} mentors matching your criteria
          </p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="sessions">Most Sessions</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mentor Cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {mentor.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{mentor.name}</CardTitle>
                    <CardDescription className="text-sm">{mentor.role}</CardDescription>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">{mentor.department}</Badge>
                      <span className="text-xs text-gray-500">at {mentor.company}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Rating and Stats */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mentor.rating}</span>
                    <span className="text-gray-500">({mentor.sessions} sessions)</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-600">{mentor.hourlyRate}</p>
                  </div>
                </div>

                {/* Availability */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{mentor.availability}</span>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1">
                  {mentor.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.skills.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{mentor.skills.length - 4} more
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Request
                  </Button>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <SearchIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search criteria or browse all mentors</p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedDepartment("");
                  setSelectedSkill("");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Search;
