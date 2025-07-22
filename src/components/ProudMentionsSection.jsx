import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Medal } from 'lucide-react';

const ProudMentionsSection = () => {
  const proudMembers = [
    {
      name: "Md. Rahman Ahmed",
      designation: "ICPC World Finalist",
      achievement: "Represented Bangladesh in ICPC World Finals 2023",
      image: "/placeholder.svg",
      badges: ["World Finalist", "Regional Champion"],
      icon: Trophy,
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      name: "Fatima Khatun",
      designation: "Google Summer of Code",
      achievement: "Selected for GSoC 2023, contributed to TensorFlow",
      image: "/placeholder.svg",
      badges: ["GSoC", "Open Source"],
      icon: Star,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      name: "Karim Hossain",
      designation: "Software Engineer at Microsoft",
      achievement: "Secured position at Microsoft after graduation",
      image: "/placeholder.svg",
      badges: ["Microsoft", "Alumni"],
      icon: Award,
      gradient: "from-green-500 to-teal-600"
    },
    {
      name: "Nasir Uddin",
      designation: "ACM-ICPC Regional Rank 5",
      achievement: "Achieved 5th position in ACM-ICPC Dhaka Regional",
      image: "/placeholder.svg",
      badges: ["ICPC", "Regional Winner"],
      icon: Medal,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      name: "Rashida Begum",
      designation: "Researcher at MIT",
      achievement: "Pursuing PhD in Computer Science at MIT",
      image: "/placeholder.svg",
      badges: ["MIT", "Researcher"],
      icon: Star,
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      name: "Omar Faruk",
      designation: "Startup Founder",
      achievement: "Founded successful EdTech startup serving 10K+ students",
      image: "/placeholder.svg",
      badges: ["Founder", "EdTech"],
      icon: Trophy,
      gradient: "from-red-500 to-orange-600"
    }
  ];

  return (
    <section id="proud-mentions" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Proud Mentions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating the outstanding achievements of our club members who have made us proud 
            with their excellence in programming, research, and professional success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proudMembers.map((member, index) => (
            <Card key={index} className="group hover:shadow-glow transition-all duration-500 transform hover:-translate-y-3 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${member.gradient}`}></div>
              <CardContent className="p-6">
                {/* Profile Section */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-card flex items-center justify-center shadow-elegant">
                      <member.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${member.gradient} flex items-center justify-center`}>
                      <Trophy className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-primary">
                      {member.designation}
                    </p>
                  </div>
                </div>

                {/* Achievement */}
                <div className="mb-6">
                  <p className="text-muted-foreground leading-relaxed">
                    {member.achievement}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {member.badges.map((badge, badgeIndex) => (
                    <Badge 
                      key={badgeIndex} 
                      variant="secondary" 
                      className="text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>

                {/* Decoration */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <member.icon className="h-12 w-12 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join the Legacy</h3>
              <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                Be part of our success story. With dedication, practice, and the right community support, 
                you too can achieve greatness and make us proud.
              </p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">15+</div>
                  <div className="text-sm opacity-80">ICPC Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">8</div>
                  <div className="text-sm opacity-80">Industry Leaders</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">25+</div>
                  <div className="text-sm opacity-80">Success Stories</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ProudMentionsSection;