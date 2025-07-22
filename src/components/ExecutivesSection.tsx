import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Crown, Star, Users, Shield } from 'lucide-react';

const ExecutivesSection = () => {
  const seniorExecutives = [
    {
      name: "Md. Rafiqul Islam",
      position: "President",
      email: "president@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000001",
      session: "2019-20",
      image: "/placeholder.svg",
      icon: Crown,
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      name: "Ayesha Siddique",
      position: "Vice President",
      email: "vp@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000002",
      session: "2020-21",
      image: "/placeholder.svg",
      icon: Star,
      gradient: "from-purple-500 to-blue-600"
    },
    {
      name: "Md. Kamal Hossain",
      position: "General Secretary",
      email: "secretary@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000003",
      session: "2020-21",
      image: "/placeholder.svg",
      icon: Shield,
      gradient: "from-green-500 to-teal-600"
    }
  ];

  const executives = [
    {
      name: "Fatima Rahman",
      position: "Joint Secretary",
      email: "joint.secretary@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000004",
      session: "2021-22",
      image: "/placeholder.svg"
    },
    {
      name: "Md. Nasir Ahmed",
      position: "Treasurer",
      email: "treasurer@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000005",
      session: "2021-22",
      image: "/placeholder.svg"
    },
    {
      name: "Rashida Khatun",
      position: "Organizing Secretary",
      email: "organizing@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000006",
      session: "2022-23",
      image: "/placeholder.svg"
    },
    {
      name: "Omar Faruque",
      position: "Publicity Secretary",
      email: "publicity@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000007",
      session: "2022-23",
      image: "/placeholder.svg"
    },
    {
      name: "Salma Begum",
      position: "Cultural Secretary",
      email: "cultural@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000008",
      session: "2022-23",
      image: "/placeholder.svg"
    },
    {
      name: "Md. Aminul Islam",
      position: "Sports Secretary",
      email: "sports@mdpc.jkkniu.edu.bd",
      phone: "+880 1700-000009",
      session: "2023-24",
      image: "/placeholder.svg"
    }
  ];

  return (
    <section id="executives" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Executive Committee
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our dedicated leadership team who work tirelessly to organize events, 
            contests, and activities that make our club the best programming community at JKKNIU.
          </p>
        </div>

        {/* Senior Executives */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <Crown className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-2xl font-bold text-foreground">Senior Executives</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {seniorExecutives.map((executive, index) => (
              <Card key={index} className="group hover:shadow-glow transition-all duration-500 transform hover:-translate-y-3 overflow-hidden">
                <div className={`h-3 bg-gradient-to-r ${executive.gradient}`}></div>
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-card flex items-center justify-center shadow-elegant">
                      <executive.icon className="h-12 w-12 text-primary" />
                    </div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r ${executive.gradient} flex items-center justify-center`}>
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {executive.name}
                  </h4>
                  <Badge variant="default" className="mb-4 bg-gradient-primary">
                    {executive.position}
                  </Badge>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center justify-center space-x-2">
                      <span className="font-medium">Session:</span>
                      <span>{executive.session}</span>
                    </p>
                    <p className="break-all">{executive.email}</p>
                    <p>{executive.phone}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Executives */}
        <div>
          <div className="flex items-center justify-center mb-8">
            <Users className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-2xl font-bold text-foreground">Executive Members</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {executives.map((executive, index) => (
              <Card key={index} className="group hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-card flex items-center justify-center shadow-lg">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {executive.name}
                      </h4>
                      <p className="text-sm text-primary font-medium">
                        {executive.position}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="flex justify-between">
                      <span className="font-medium">Session:</span>
                      <span>{executive.session}</span>
                    </p>
                    <p className="break-all text-xs">{executive.email}</p>
                    <p className="text-xs">{executive.phone}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
              <p className="text-lg opacity-90 mb-6">
                Have questions or want to collaborate? Our executive team is always ready to help!
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">General Inquiries</h4>
                  <p className="text-sm opacity-80">info@mdpc.jkkniu.edu.bd</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Contest Related</h4>
                  <p className="text-sm opacity-80">contests@mdpc.jkkniu.edu.bd</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Membership</h4>
                  <p className="text-sm opacity-80">join@mdpc.jkkniu.edu.bd</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExecutivesSection;