
import { useState, useEffect } from "react";
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
  Clock,
  Filter
} from "lucide-react";
import { Link } from "react-router-dom";
import { useMentors } from "@/hooks/useMentors";
import { useUserProfile } from "@/hooks/useUserProfile";
import MentorshipRequest from "@/components/MentorshipRequest";
import MentorProfile from "@/components/MentorProfile";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedSkill, setSelectedSkill] = useState("all");
  const { mentors, loading } = useMentors();
  const { profile } = useUserProfile();

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

  // Get all unique skills from mentors
  const allSkills = Array.from(new Set(
    mentors.flatMap(mentor => mentor.skills || [])
  )).sort();

  const filteredMentors = mentors.filter(mentor => {
    const fullName = `${mentor.first_name} ${mentor.last_name}`.toLowerCase();
    const skills = mentor.skills || [];
    
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDepartment = selectedDepartment === "all" || mentor.department === selectedDepartment;
    const matchesSkill = selectedSkill === "all" || skills.includes(selectedSkill);
    
    return matchesSearch && matchesDepartment && matchesSkill;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
                    <SelectItem value="all">All departments</SelectItem>
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
                    <SelectItem value="all">All skills</SelectItem>
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
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mentor Cards */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => {
            const mentorName = `${mentor.first_name} ${mentor.last_name}`;
            const initials = `${mentor.first_name?.[0] || ''}${mentor.last_name?.[0] || ''}`.toUpperCase();
            const skills = mentor.skills || [];
            
            return (
              <Card key={mentor.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{mentorName}</CardTitle>
                      <CardDescription className="text-sm">{mentor.role || 'Mentor'}</CardDescription>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className="text-xs">{mentor.department}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* Rating and Stats */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.8</span>
                      <span className="text-gray-500">(12 sessions)</span>
                    </div>
                  </div>

                  {/* Availability */}
                  {mentor.availability && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>{mentor.availability}</span>
                    </div>
                  )}

                  {/* Bio */}
                  {mentor.bio && (
                    <p className="text-sm text-gray-700 line-clamp-3">{mentor.bio}</p>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {skills.slice(0, 4).map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {skills.length > 4 && (
                      <Badge variant="secondary" className="text-xs">
                        +{skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <MentorshipRequest mentorName={mentorName} mentorId={mentor.id} />
                    <MentorProfile mentor={{
                      id: mentor.id,
                      name: mentorName,
                      role: mentor.role || 'Mentor',
                      department: mentor.department,
                      company: 'Company',
                      skills: skills,
                      rating: 4.8,
                      sessions: 12,
                      availability: mentor.availability || 'Flexible',
                      bio: mentor.bio || '',
                      hourlyRate: '$80/hour'
                    }}>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </MentorProfile>
                  </div>
                </CardContent>
              </Card>
            );
          })}
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
                  setSelectedDepartment("all");
                  setSelectedSkill("all");
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
