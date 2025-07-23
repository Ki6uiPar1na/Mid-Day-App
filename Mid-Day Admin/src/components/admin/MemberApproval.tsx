import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye } from "lucide-react";
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

// Mock data - update with your Supabase data fetching
const pendingMembers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "123-456-7890",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
    codeforces: "johndoe_cf",
    codechef: "johndoe_cc",
    hackerrank: "johndoe_hr",
    toph: "johndoe_toph",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "987-654-3210",
    linkedin: "linkedin.com/in/janesmith",
    github: "github.com/janesmith",
    codeforces: "janesmith_cf",
    codechef: "janesmith_cc",
    hackerrank: "janesmith_hr",
    toph: "janesmith_toph",
  },
];

export function MemberApproval() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const filteredMembers = pendingMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.github.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.linkedin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApprove = (member: any) => {
    console.log("Approving member:", member);
    // Implement approval API call here
  };

  return (
    <AdminLayout title="Valid Member Approval">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Member Approval Management
            </CardTitle>
            <CardDescription>
              Review and approve new member registrations. Only approved members will be visible on the website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search Bar */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Input
                  placeholder="Search members by name, email, GitHub or LinkedIn..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {filteredMembers.length} Pending
              </Badge>
            </div>

            {/* Members Table */}
            <div className="rounded-lg border border-border/50 bg-card/30 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>GitHub</TableHead>
                    <TableHead>Codeforces</TableHead>
                    <TableHead>CodeChef</TableHead>
                    <TableHead>HackerRank</TableHead>
                    <TableHead>Toph</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>{member.id}</TableCell>
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
                      <TableCell>
                        <Badge variant="outline" className="text-warning">
                          Pending
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
                              <Button size="sm" className="bg-success hover:bg-success/90">
                                Approve
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirm Member Approval</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to approve <strong>{member.name}</strong>? This will make them a valid member.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleApprove(member)}
                                  className="bg-success hover:bg-success/90"
                                >
                                  Approve Member
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
                {searchTerm ? "No members found matching your search." : "No pending approvals at this time."}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Member Details Modal */}
        {selectedMember && (
          <Card className="bg-card/80 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle>Member Details</CardTitle>
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
                  <label className="text-sm font-medium text-muted-foreground">ID</label>
                  <p className="text-foreground">{selectedMember.id}</p>
                </div>
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
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
