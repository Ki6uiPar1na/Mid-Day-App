import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

import { 
  Users, 
  UserCheck, 
  Crown, 
  Trophy, 
  Camera, 
  Bell, 
  TrendingUp,
  Activity,
  Calendar,
  FileText
} from "lucide-react";

const statsCards = [
  {
    title: "Total Members",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "Active registered members"
  },
  {
    title: "Pending Approvals",
    value: "23",
    change: "+5",
    trend: "up",
    icon: UserCheck,
    description: "Members awaiting approval"
  },
  {
    title: "Active Contests",
    value: "4",
    change: "2 ending soon",
    trend: "neutral",
    icon: Trophy,
    description: "Currently running contests"
  },
  {
    title: "Executives",
    value: "18",
    change: "+2 this month",
    trend: "up",
    icon: Crown,
    description: "Current executive members"
  }
];

const recentActivities = [
  { action: "New member registration", user: "John Doe", time: "2 minutes ago", type: "user" },
  { action: "Contest submission", user: "Jane Smith", time: "5 minutes ago", type: "contest" },
  { action: "Member promoted to Executive", user: "Alex Johnson", time: "1 hour ago", type: "promotion" },
  { action: "New achievement posted", user: "System", time: "2 hours ago", type: "achievement" },
  { action: "Gallery updated", user: "Admin", time: "3 hours ago", type: "media" },
];

const upcomingTasks = [
  { task: "Review pending member approvals", priority: "high", due: "Today" },
  { task: "Monthly contest setup", priority: "medium", due: "Tomorrow" },
  { task: "Update senior executive profiles", priority: "low", due: "This week" },
  { task: "Gallery cleanup", priority: "medium", due: "Next week" },
];

export function AdminDashboard() {
  return (
    <AdminLayout title="Executive Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-2">Welcome back, Executive!</h2>
          <p className="text-muted-foreground">
            Manage your platform efficiently with comprehensive administrative controls.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((stat, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur border-border/50 hover:bg-card/70 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className={`inline-flex items-center gap-1 ${
                    stat.trend === 'up' ? 'text-success' : 
                    stat.trend === 'down' ? 'text-destructive' : 
                    'text-muted-foreground'
                  }`}>
                    {stat.trend === 'up' && <TrendingUp className="h-3 w-3" />}
                    {stat.change}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <Card className="lg:col-span-2 bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activities
              </CardTitle>
              <CardDescription>Latest actions and system updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/30 border border-border/30">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.type === 'user' ? 'bg-info' :
                        activity.type === 'contest' ? 'bg-warning' :
                        activity.type === 'promotion' ? 'bg-success' :
                        activity.type === 'achievement' ? 'bg-primary' :
                        'bg-muted-foreground'
                      }`} />
                      <div>
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.user}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
              <CardDescription>Priority items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="p-3 rounded-lg bg-accent/20 border border-border/20">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{task.task}</p>
                        <p className="text-xs text-muted-foreground mt-1">{task.due}</p>
                      </div>
                      <Badge 
                        variant={
                          task.priority === 'high' ? 'destructive' :
                          task.priority === 'medium' ? 'default' :
                          'secondary'
                        }
                        className="text-xs ml-2"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quick Actions
            </CardTitle>
            <CardDescription>Frequently used administrative functions</CardDescription>
          </CardHeader>
          <CardContent>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                to="/admin/member-approval"
                className="block p-4 rounded-lg bg-primary/10 hover:bg-primary/20 transition-all border border-primary/20 group text-left"
              >
                <UserCheck className="h-6 w-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-foreground">Approve Members</h3>
                <p className="text-xs text-muted-foreground">Review pending applications</p>
              </Link>

              <Link
                to="/admin/host-contest"
                className="block p-4 rounded-lg bg-warning/10 hover:bg-warning/20 transition-all border border-warning/20 group text-left"
              >
                <Trophy className="h-6 w-6 text-warning mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-foreground">Host Contest</h3>
                <p className="text-xs text-muted-foreground">Create new competition</p>
              </Link>

              <Link
                to="/admin/gallery"
                className="block p-4 rounded-lg bg-info/10 hover:bg-info/20 transition-all border border-info/20 group text-left"
              >
                <Camera className="h-6 w-6 text-info mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-foreground">Update Gallery</h3>
                <p className="text-xs text-muted-foreground">Add photos and videos</p>
              </Link>

              <Link
                to="/admin/notice-board"
                className="block p-4 rounded-lg bg-success/10 hover:bg-success/20 transition-all border border-success/20 group text-left"
              >
                <Bell className="h-6 w-6 text-success mb-2 group-hover:scale-110 transition-transform" />
                <h3 className="font-medium text-foreground">Post Notice</h3>
                <p className="text-xs text-muted-foreground">Announce updates</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}