import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Mail, Phone, Github, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';

const GeneralMembersSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 10;

  const members = [
    {
      sl: 1,
      name: "Abdullah Al Mahmud",
      session: "2020-21",
      email: "abdullah@student.jkkniu.edu.bd",
      phone: "+880 1700-100001",
      github: "abdullah-dev",
      linkedin: "abdullah-mahmud",
      status: "Active",
      specialty: "Web Development"
    },
    {
      sl: 2,
      name: "Fariha Tasnim",
      session: "2021-22",
      email: "fariha@student.jkkniu.edu.bd",
      phone: "+880 1700-100002",
      github: "fariha-dev",
      linkedin: "fariha-tasnim",
      status: "Active",
      specialty: "Data Science"
    },
    {
      sl: 3,
      name: "Md. Shakil Ahmed",
      session: "2022-23",
      email: "shakil@student.jkkniu.edu.bd",
      phone: "+880 1700-100003",
      github: "shakil-ahmed",
      linkedin: "shakil-ahmed",
      status: "Active",
      specialty: "Algorithm"
    },
    {
      sl: 4,
      name: "Nusrat Jahan",
      session: "2021-22",
      email: "nusrat@student.jkkniu.edu.bd",
      phone: "+880 1700-100004",
      github: "nusrat-dev",
      linkedin: "nusrat-jahan",
      status: "Active",
      specialty: "Mobile Development"
    },
    {
      sl: 5,
      name: "Rifat Hasan",
      session: "2020-21",
      email: "rifat@student.jkkniu.edu.bd",
      phone: "+880 1700-100005",
      github: "rifat-hasan",
      linkedin: "rifat-hasan",
      status: "Active",
      specialty: "Machine Learning"
    },
    // Add more members...
    ...Array.from({ length: 20 }, (_, i) => ({
      sl: i + 6,
      name: `Member ${i + 6}`,
      session: ["2020-21", "2021-22", "2022-23", "2023-24"][i % 4],
      email: `member${i + 6}@student.jkkniu.edu.bd`,
      phone: `+880 1700-10000${i + 6}`,
      github: `member${i + 6}`,
      linkedin: `member-${i + 6}`,
      status: "Active",
      specialty: ["Web Development", "Data Science", "Algorithm", "Mobile Development", "Machine Learning"][i % 5]
    }))
  ];

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.session.includes(searchTerm) ||
    member.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMembers.length / membersPerPage);
  const currentMembers = filteredMembers.slice(
    (currentPage - 1) * membersPerPage,
    currentPage * membersPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section id="general-members" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            General Members
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our vibrant community of passionate programmers from different sessions, 
            each bringing unique skills and perspectives to the club.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, session, or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Total Members: {filteredMembers.length}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Page {currentPage} of {totalPages}
            </Badge>
          </div>
        </div>

        {/* Members Table */}
        <Card className="overflow-hidden shadow-elegant">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-primary text-primary-foreground">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">SL</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Session</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Specialty</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Social</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {currentMembers.map((member, index) => (
                    <tr key={member.sl} className={`hover:bg-muted/50 transition-colors ${index % 2 === 0 ? 'bg-background' : 'bg-card'}`}>
                      <td className="px-6 py-4 text-sm font-medium text-foreground">
                        {member.sl}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary-foreground">
                              {member.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-foreground">{member.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="text-xs">
                          {member.session}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {member.specialty}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span className="truncate max-w-32">{member.email}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <a
                            href={`https://github.com/${member.github}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                          <a
                            href={`https://linkedin.com/in/${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Linkedin className="h-4 w-4" />
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="default" className="text-xs bg-green-100 text-green-800">
                          {member.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-muted-foreground">
            Showing {(currentPage - 1) * membersPerPage + 1} to {Math.min(currentPage * membersPerPage, filteredMembers.length)} of {filteredMembers.length} members
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <div className="flex space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">25</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Active Sessions</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">5</div>
              <div className="text-sm text-muted-foreground">Specialties</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Active Rate</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default GeneralMembersSection;