
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, MapPin, Clock, Award, Users, MessageSquare } from "lucide-react";

interface MentorProfileProps {
  mentor: {
    id: number;
    name: string;
    role: string;
    department: string;
    company: string;
    skills: string[];
    rating: number;
    sessions: number;
    availability: string;
    bio: string;
    hourlyRate: string;
    experience?: string;
    education?: string;
    achievements?: string[];
  };
  children: React.ReactNode;
}

const MentorProfile = ({ mentor, children }: MentorProfileProps) => {
  const achievements = mentor.achievements || [
    "Led team of 10+ developers",
    "Mentored 25+ junior engineers",
    "Published 5 technical articles",
    "Speaker at tech conferences"
  ];

  const experience = mentor.experience || "8+ years of full-stack development experience with expertise in React, Node.js, and cloud architecture. Previously worked at Google and Microsoft.";
  
  const education = mentor.education || "M.S. Computer Science, Stanford University\nB.S. Software Engineering, UC Berkeley";

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Mentor Profile</DialogTitle>
          <DialogDescription>
            Learn more about {mentor.name} and their expertise
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-start space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                {mentor.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{mentor.name}</h3>
              <p className="text-lg text-gray-600">{mentor.role}</p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline">{mentor.department}</Badge>
                <span className="text-sm text-gray-500">at {mentor.company}</span>
              </div>
              <div className="flex items-center space-x-4 mt-3">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{mentor.rating}</span>
                  <span className="text-gray-500 text-sm">({mentor.sessions} sessions)</span>
                </div>
                <div className="text-lg font-semibold text-green-600">{mentor.hourlyRate}</div>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2 text-gray-600">
            <Clock className="h-5 w-5" />
            <span><strong>Available:</strong> {mentor.availability}</span>
          </div>

          {/* Bio */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">About</h4>
            <p className="text-gray-700">{mentor.bio}</p>
          </div>

          {/* Experience */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Experience</h4>
            <p className="text-gray-700">{experience}</p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Skills & Expertise</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Education</h4>
            <p className="text-gray-700 whitespace-pre-line">{education}</p>
          </div>

          {/* Achievements */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Achievements</h4>
            <ul className="space-y-1">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-center space-x-2 text-gray-700">
                  <Award className="h-4 w-4 text-blue-600" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MentorProfile;
