import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserX, Eye, AlertTriangle } from "lucide-react";
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

// Extended mock data - current approved members with social & coding profiles
const currentMembers = [
  {
    id: 1,
    name: "Robert Johnson",
    email: "robert@example.com",
    session: "2020",
    role: "Member",
    joinedDate: "2020-09-15",
    lastActive: "2024-01-10",
    phone: "123-456-7890",
    linkedin: "linkedin.com/in/robertjohnson",
    github: "github.com/robertjohnson",
    codeforces: "robert_cf",
    codechef: "robert_cc",
    hackerrank: "robert_hr",
    toph: "robert_toph",
  },
  {
    id: 2,
    name: "Lisa Anderson",
    email: "lisa@example.com",
    session: "2021",
    role: "Executive",
    joinedDate: "2021-02-20",
    lastActive: "2024-01-12",
    phone: "987-654-3210",
    linkedin: "linkedin.com/in/lisaanderson",
    github: "github.com/lisaanderson",
    codeforces: "lisa_cf",
    codechef: "lisa_cc",
    hackerrank: "lisa_hr",
    toph: "lisa_toph",
  },
  // Add more members here as needed
];

export function RemoveMembership() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const filteredMembers = currentMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemove = (member: any) => {
    console.log("Removing membership:", member);
    // API call to remove member goes here
  };

  const isInactive = (lastActive: string) => {
    const lastActiveDate = new Date(lastActive);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return lastActiveDate < threeMonthsAgo;
  };

  return (
    <AdminLayout title="Remove Membership">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserX className="h-5 w-5" />
              Membership Removal Management
            </CardTitle>
            <CardDescription>
              Remove member access and revert their approval status. This action will hide them from the website.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Warning Banner */}
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="h-5 w-5" />
                <span className="font-medium">Caution: Sensitive Operation</span>
              </div>
              <p className="text-sm text-destructive/80 mt-1">
                Removing membership will revoke all access and hide the member from public listings. This action should be used carefully.
              </p>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search current members by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50"
                />
              </div>
              <Badge variant="secondary" className="px-3 py-1">
                {filteredMembers.length} Active
              </Badge>
            </div>

            {/* Members Table */}
            <div className="rounded-lg border border-border/50 bg-card/30 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Session</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Last Active</TableHead>
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
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.email}</TableCell>
                      <TableCell>{member.session}</TableCell>
                      <TableCell>
                        <Badge variant={member.role === "Executive" ? "default" : "secondary"}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.joinedDate}</TableCell>
                      <TableCell>
                        <span className={isInactive(member.lastActive) ? "text-warning" : "text-foreground"}>
                          {member.lastActive}
                        </span>
                      </TableCell>
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
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-success">
                            Active
                          </Badge>
                          {isInactive(member.lastActive) && (
                            <Badge variant="outline" className="text-warning">
                              Inactive
                            </Badge>
                          )}
                        </div>
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
                              <Button size="sm" variant="destructive">
                                <UserX className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-destructive">Confirm Membership Removal</AlertDialogTitle>
                                <AlertDialogDescription>
                                  <div className="space-y-3">
                                    <p>
                                      Are you absolutely sure you want to remove <strong>{member.name}</strong> from the platform?
                                    </p>
                                    <div className="bg-destructive/10 p-3 rounded border border-destructive/20">
                                      <p className="font-medium text-destructive mb-2">This action will:</p>
                                      <ul className="text-sm space-y-1 text-destructive/80">
                                        <li>• Revoke all member privileges</li>
                                        <li>• Hide their profile from the website</li>
                                        <li>• Set their approval status to "Not Approved"</li>
                                        <li>• Remove access to member-only features</li>
                                      </ul>
                                    </div>
                                    <p className="text-sm">
                                      <strong>Member Details:</strong>
                                      <br />• Role: {member.role}
                                      <br />• Joined: {member.joinedDate}
                                      <br />• Last Active: {member.lastActive}
                                    </p>
                                  </div>
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleRemove(member)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Remove Membership
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

            {/* Member Details Modal */}
            {selectedMember && (
              <Card className="bg-card/80 backdrop-blur border-border/50 mt-6">
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
                      <label className="text-sm font-medium text-muted-foreground">Name</label>
                      <p className="text-foreground">{selectedMember.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="text-foreground">{selectedMember.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Session</label>
                      <p className="text-foreground">{selectedMember.session}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Role</label>
                      <p className="text-foreground">{selectedMember.role}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Joined Date</label>
                      <p className="text-foreground">{selectedMember.joinedDate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Last Active</label>
                      <p className={isInactive(selectedMember.lastActive) ? "text-warning" : "text-foreground"}>
                        {selectedMember.lastActive}
                        {isInactive(selectedMember.lastActive) && " (Inactive)"}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-foreground">{selectedMember.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">LinkedIn</label>
                      <p>
                        <a
                          href={`https://${selectedMember.linkedin}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedMember.linkedin}
                        </a>
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">GitHub</label>
                      <p>
                        <a
                          href={`https://${selectedMember.github}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-primary hover:underline"
                        >
                          {selectedMember.github}
                        </a>
                      </p>
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

                  {isInactive(selectedMember.lastActive) && (
                    <div className="mt-6 p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <h4 className="font-medium text-warning mb-2">Activity Warning</h4>
                      <p className="text-sm text-warning/80">
                        This member has been inactive for more than 3 months. Consider reviewing their membership status.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
