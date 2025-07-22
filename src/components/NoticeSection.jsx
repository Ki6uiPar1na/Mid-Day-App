import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, Clock, Pin, Bell } from 'lucide-react';

const NoticeSection = () => {
  const notices = [
    {
      id: 1,
      title: "ICPC Dhaka Regional 2024 Registration Open",
      description: "Registration is now open for ICPC Dhaka Regional 2024. Teams must register before the deadline.",
      date: "2024-01-15",
      priority: "high",
      category: "Contest",
      link: "https://icpc.global/regionals/finder/dhaka-2024",
      isPinned: true
    },
    {
      id: 2,
      title: "Weekly Programming Contest Schedule",
      description: "Updated schedule for weekly programming contests starting from next month.",
      date: "2024-01-10",
      priority: "medium",
      category: "Schedule",
      link: "#contests",
      isPinned: false
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="notice" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Notice Board
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest announcements, contest schedules, and important information.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {notices.map((notice) => (
            <Card key={notice.id} className="hover:shadow-elegant transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {notice.isPinned && (
                        <Pin className="h-4 w-4 text-primary" />
                      )}
                      <h3 className="text-lg font-semibold text-foreground">
                        {notice.title}
                      </h3>
                      <Badge className={getPriorityColor(notice.priority)}>
                        {notice.priority}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {notice.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {notice.date}
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {notice.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(notice.link, '_blank')}
                      className="flex items-center gap-2"
                    >
                      <span>Read More</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NoticeSection;