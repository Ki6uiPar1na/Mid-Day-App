import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Crown, Eye, UserCheck } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data - approved members eligible for promotion
const approvedMembers = [
  {
    id: 1,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "123-456-7890",
    linkedin: "linkedin.com/in/sarahwilson",
    github: "github.com/sarahwilson",
    codeforces: "sarah_cf",
    codechef: "sarah_cc",
    hackerrank: "sarah_hr",
    toph: "sarah_toph",
    session: "2022",
    specialty: "Algorithm Design",
    rating: 1850,
    contributions: 15,
  },
  {
    id: 2,
    name: "Mike Chen",
    email: "mike@example.com",
    phone: "987-654-3210",
    linkedin: "linkedin.com/in/mikechen",
    github: "github.com/mikechen",
    codeforces: "mike_cf",
    codechef: "mike_cc",
    hackerrank: "mike_hr",
    toph: "mike_toph",
    session: "2023",
    specialty: "Web Development",
    rating: 1920,
    contributions: 12,
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@example.com",
    phone: "555-555-5555",
    linkedin: "linkedin.com/in/emmadavis",
    github: "github.com/emmadavis",
    codeforces: "emma_cf",
    codechef: "emma_cc",
    hackerrank: "emma_hr",
    toph: "emma_toph",
    session: "2021",
    specialty: "Data Science",
    rating: 2100,
    contributions: 20,
  },
];

export function PromoteExecutive() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const filteredMembers = approvedMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePromote = (member: any) => {
    console.log("Promoting member to executive:", member);
    // API call to promote member goes here
  };

  return (
    <AdminLayout title="Promote to Executive">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Executive Promotion Management
            </CardTitle>
            <CardDescription>
              Promote eligible approved members to executive positions. Only valid members can be promoted.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search approved members by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {filteredMembers.length} Eligible
              </Badge>
            </div>

            {/* Members Table */}
            <div className="rounded-lg border border-border/50 bg-card/30 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>GitHub</TableHead>
                    <TableHead>Codeforces</TableHead>
                    <TableHead>CodeChef</TableHead>
                    <TableHead>HackerRank</TableHead>
                    <TableHead>Toph</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Contributions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <a
                          href={`https://${member.linkedin}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          {member.linkedin}
                        </a>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`https://${member.github}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          {member.github}
                        </a>
                      </TableCell>
                      <TableCell>{member.codeforces}</TableCell>
                      <TableCell>{member.codechef}</TableCell>
                      <TableCell>{member.hackerrank}</TableCell>
                      <TableCell>{member.toph}</TableCell>
                      <TableCell>{member.session}</TableCell>
                      <TableCell>{member.specialty}</TableCell>
                      <TableCell>
                        <Badge variant={member.rating > 1900 ? "default" : "secondary"}>
                          {member.rating}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.contributions}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-success">
                          Approved
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedMember(member)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" className="bg-warning hover:bg-warning/90">
                                <Crown className="h-4 w-4 mr-1" />
                                Promote
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Executive Promotion</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to promote <strong>{member.name}</strong> to Executive? 
                                  This will grant them executive privileges and responsibilities.
                                  <br /><br />
                                  <strong>Member Details:</strong>
                                  <br />• Rating: {member.rating}
                                  <br />• Contributions: {member.contributions}
                                  <br />• Specialty: {member.specialty}
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handlePromote(member)}
                                  className="bg-warning hover:bg-warning/90"
                                >
                                  Promote to Executive
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No eligible members found matching your search." : "No members eligible for promotion at this time."}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Member Details Modal */}
        {selectedMember && (
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Executive Candidate Details</CardTitle>
              <Button
                variant="outline"
                size="sm"
                className="w-fit"
                onClick={() => setSelectedMember(null)}
              >
                Close
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-foreground">{selectedMember.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-foreground">{selectedMember.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="text-foreground">{selectedMember.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">LinkedIn</label>
                  <p className="text-foreground">{selectedMember.linkedin}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">GitHub</label>
                  <p className="text-foreground">{selectedMember.github}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Codeforces</label>
                  <p className="text-foreground">{selectedMember.codeforces}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CodeChef</label>
                  <p className="text-foreground">{selectedMember.codechef}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">HackerRank</label>
                  <p className="text-foreground">{selectedMember.hackerrank}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Toph</label>
                  <p className="text-foreground">{selectedMember.toph}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Session</label>
                  <p className="text-foreground">{selectedMember.session}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Specialty</label>
                  <p className="text-foreground">{selectedMember.specialty}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Current Rating</label>
                  <p className="text-foreground">{selectedMember.rating}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Contributions</label>
                  <p className="text-foreground">{selectedMember.contributions} activities</p>
                </div>
              </div>

              <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
                <h4 className="font-medium text-warning mb-2">Promotion Eligibility</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Approved Member</span>
                    <UserCheck className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>High Rating ({selectedMember.rating > 1900 ? 'Excellent' : 'Good'})</span>
                    <span className={selectedMember.rating > 1900 ? 'text-success' : 'text-warning'}>
                      {selectedMember.rating > 1900 ? '✓' : '○'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Contributor</span>
                    <span className={selectedMember.contributions > 10 ? 'text-success' : 'text-warning'}>
                      {selectedMember.contributions > 10 ? '✓' : '○'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
