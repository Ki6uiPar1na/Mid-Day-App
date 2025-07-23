import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Calendar, Bell, Pin, Clock, Users } from 'lucide-react';

const NoticeSection = () => {
  const notices = [
    {
      id: 1,
      title: "Registration Open for ICPC Regional Contest 2024",
      description: "Team registration is now open for the upcoming ACM-ICPC Dhaka Regional Contest. Form your teams and register before the deadline.",
      image: "/placeholder.svg",
      link: "https://icpc.global/regionals/finder/dhaka-2024",
      date: "2024-01-15",
      category: "Contest",
      priority: "High",
      isPinned: true,
      author: "Contest Committee"
    },
    {
      id: 2,
      title: "Weekly Contest Schedule Updated",
      description: "New timings for weekly programming contests have been announced. Check the updated schedule and prepare accordingly.",
      image: "/placeholder.svg",
      link: "https://mdpc.jkkniu.edu.bd/contests",
      date: "2024-01-12",
      category: "Schedule",
      priority: "Medium",
      isPinned: false,
      author: "Executive Committee"
    },
    {
      id: 3,
      title: "Algorithm Workshop by Industry Expert",
      description: "Join us for an exclusive workshop on advanced algorithms conducted by a senior software engineer from Google.",
      image: "/placeholder.svg",
      link: "https://mdpc.jkkniu.edu.bd/workshops",
      date: "2024-01-10",
      category: "Workshop",
      priority: "High",
      isPinned: true,
      author: "Workshop Organizer"
    },
    {
      id: 4,
      title: "Club Membership Renewal Notice",
      description: "All members are requested to renew their club membership for the spring semester. Membership fees must be paid by the deadline.",
      image: "/placeholder.svg",
      link: "https://mdpc.jkkniu.edu.bd/membership",
      date: "2024-01-08",
      category: "Membership",
      priority: "Medium",
      isPinned: false,
      author: "Treasurer"
    },
    {
      id: 5,
      title: "Programming Marathon Event Announcement",
      description: "Get ready for our biggest event of the year! 24-hour programming marathon with exciting prizes and recognition.",
      image: "/placeholder.svg",
      link: "https://mdpc.jkkniu.edu.bd/marathon",
      date: "2024-01-05",
      category: "Event",
      priority: "High",
      isPinned: true,
      author: "Event Organizer"
    },
    {
      id: 6,
      title: "New Study Resources Added",
      description: "We've added new programming books and online course subscriptions to our resource library. Available for all members.",
      image: "/placeholder.svg",
      link: "https://mdpc.jkkniu.edu.bd/resources",
      date: "2024-01-03",
      category: "Resources",
      priority: "Low",
      isPinned: false,
      author: "Resource Manager"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Contest": return "bg-purple-100 text-purple-800";
      case "Workshop": return "bg-blue-100 text-blue-800";
      case "Event": return "bg-green-100 text-green-800";
      case "Membership": return "bg-orange-100 text-orange-800";
      case "Schedule": return "bg-teal-100 text-teal-800";
      case "Resources": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const pinnedNotices = notices.filter(notice => notice.isPinned);
  const regularNotices = notices.filter(notice => !notice.isPinned);

  return (
    <section id="notice" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Notice Board
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest announcements, events, and important information 
            from Mid Day Programming Club.
          </p>
        </div>

        {/* Pinned Notices */}
        {pinnedNotices.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center mb-6">
              <Pin className="h-5 w-5 text-primary mr-2" />
              <h3 className="text-2xl font-bold text-foreground">Pinned Notices</h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pinnedNotices.map((notice) => (
                <Card key={notice.id} className="group hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2 border-2 border-primary/20">
                  <div className="relative">
                    <img
                      src={notice.image}
                      alt={notice.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <Pin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <Badge className={getPriorityColor(notice.priority)}>
                        {notice.priority}
                      </Badge>
                      <Badge className={getCategoryColor(notice.category)}>
                        {notice.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(notice.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{notice.author}</span>
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {notice.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {notice.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                      onClick={() => window.open(notice.link, '_blank')}
                    >
                      <span>Read More</span>
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Notices */}
        <div>
          <div className="flex items-center mb-6">
            <Bell className="h-5 w-5 text-primary mr-2" />
            <h3 className="text-2xl font-bold text-foreground">Recent Notices</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNotices.map((notice) => (
              <Card key={notice.id} className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img
                    src={notice.image}
                    alt={notice.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <Badge className={getPriorityColor(notice.priority)}>
                      {notice.priority}
                    </Badge>
                    <Badge className={getCategoryColor(notice.category)}>
                      {notice.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(notice.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{notice.author}</span>
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {notice.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {notice.description}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:border-primary group-hover:text-primary transition-colors"
                    onClick={() => window.open(notice.link, '_blank')}
                  >
                    <span>Read More</span>
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Notice Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{notices.length}</div>
              <div className="text-sm text-muted-foreground">Total Notices</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{pinnedNotices.length}</div>
              <div className="text-sm text-muted-foreground">Pinned Notices</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">6</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <div className="text-sm text-muted-foreground">High Priority</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
            <CardContent className="p-8">
              <Bell className="h-16 w-16 mx-auto mb-4 opacity-80" />
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Never miss important updates! Join our notification system to get instant alerts 
                about contests, events, and club activities.
              </p>
              <Button variant="secondary" size="lg" className="hover:shadow-elegant transition-all duration-300">
                Subscribe to Notifications
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NoticeSection;