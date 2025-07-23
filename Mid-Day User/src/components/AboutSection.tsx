import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Lightbulb, Heart } from 'lucide-react';

const AboutSection = () => {
  const organizers = [
    {
      role: "Club President",
      message: "Mid Day Programming Club has been the cornerstone of programming excellence at JKKNIU. We foster a community where innovation meets dedication, creating future tech leaders.",
      name: "President's Message",
      icon: Users
    },
    {
      role: "Vice President",
      message: "Our commitment to nurturing programming talent goes beyond contests. We build problem-solvers, critical thinkers, and collaborative team players for tomorrow's challenges.",
      name: "Vice President's Vision",
      icon: Target
    },
    {
      role: "General Secretary",
      message: "Through consistent practice, peer learning, and mentorship, we've created an ecosystem where every member can thrive and achieve their programming potential.",
      name: "Secretary's Commitment",
      icon: Lightbulb
    }
  ];

  const values = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in programming and problem-solving",
      icon: Target
    },
    {
      title: "Community",
      description: "Building strong bonds among programmers and fostering collaboration",
      icon: Users
    },
    {
      title: "Innovation",
      description: "Encouraging creative thinking and innovative approaches to challenges",
      icon: Lightbulb
    },
    {
      title: "Growth",
      description: "Supporting continuous learning and personal development",
      icon: Heart
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About Our Club
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mid Day Programming Club is the premier programming community at JKKNIU, dedicated to 
            fostering programming excellence, innovation, and collaborative learning among students.
          </p>
        </div>

        {/* Organizers' Speeches */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {organizers.map((organizer, index) => (
            <Card key={index} className="hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <organizer.icon className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {organizer.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {organizer.role}
                  </p>
                </div>
                <blockquote className="text-muted-foreground italic leading-relaxed">
                  "{organizer.message}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Club Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 group">
                <CardContent className="p-6">
                  <value.icon className="h-10 w-10 mx-auto text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-semibold mb-3 text-foreground">
                    {value.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Club History */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Our Journey</h3>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto opacity-90">
              Established with the vision of creating a vibrant programming community, Mid Day Programming Club 
              has grown from a small group of passionate programmers to one of the most active and successful 
              clubs at JKKNIU. Our journey is marked by countless hours of practice, numerous victories in 
              programming contests, and the success stories of our members who have gone on to achieve 
              excellence in their careers.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;