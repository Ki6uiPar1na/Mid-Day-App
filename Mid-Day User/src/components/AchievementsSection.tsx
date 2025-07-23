import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Trophy, Medal, Award, Star, Target, Zap } from 'lucide-react';

const AchievementsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const achievements = [
    {
      title: "ICPC World Finals 2023",
      description: "Our team secured 45th position among 132 teams worldwide in the prestigious ICPC World Finals.",
      image: "/placeholder.svg",
      link: "https://icpc.global/worldfinals/results",
      category: "International",
      date: "2023",
      icon: Trophy,
      gradient: "from-yellow-400 to-orange-500"
    },
    {
      title: "ACM-ICPC Dhaka Regional 2022",
      description: "Multiple teams qualified for regionals with top 10 positions, showcasing our competitive programming excellence.",
      image: "/placeholder.svg",
      link: "https://icpc.global/regionals/finder/dhaka-2022",
      category: "Regional",
      date: "2022",
      icon: Medal,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      title: "Google Code Jam 2023",
      description: "5 members qualified for Round 2, with 2 advancing to Round 3 in this global programming competition.",
      image: "/placeholder.svg",
      link: "https://codingcompetitions.withgoogle.com/codejam",
      category: "Global",
      date: "2023",
      icon: Award,
      gradient: "from-green-500 to-teal-600"
    },
    {
      title: "Facebook Hacker Cup 2022",
      description: "Our members achieved remarkable success with 3 participants reaching the final round.",
      image: "/placeholder.svg",
      link: "https://www.facebook.com/hackercup",
      category: "International",
      date: "2022",
      icon: Star,
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Codeforces Global Round",
      description: "Consistent performance by our members in global rounds, with multiple achieving Expert ratings.",
      image: "/placeholder.svg",
      link: "https://codeforces.com",
      category: "Global",
      date: "2023",
      icon: Target,
      gradient: "from-red-500 to-orange-600"
    },
    {
      title: "National Programming Contest",
      description: "Champions of the National Programming Contest organized by Bangladesh Computer Society.",
      image: "/placeholder.svg",
      link: "https://bcs.org.bd",
      category: "National",
      date: "2023",
      icon: Zap,
      gradient: "from-indigo-500 to-blue-600"
    }
  ];

  const categories = ["All", "International", "Regional", "Global", "National"];

  const filteredAchievements = selectedCategory === "All"
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  return (
    <section id="achievements" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Our Achievements
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Celebrating our journey of success in programming competitions, contests, and 
            recognition on national and international platforms.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              size="sm"
              className="hover:shadow-elegant transition-all duration-300"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredAchievements.map((achievement, index) => (
            <Card
              key={index}
              className="group hover:shadow-glow transition-all duration-500 transform hover:-translate-y-3 overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${achievement.gradient}`}></div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${achievement.gradient} flex items-center justify-center`}>
                      <achievement.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="text-xs mb-1">
                        {achievement.category}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{achievement.date}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 group-hover:border-primary group-hover:text-primary transition-colors"
                    onClick={() => window.open(achievement.link, '_blank')}
                  >
                    <span>Learn More</span>
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Trophy className="h-3 w-3" />
                    <span>Achievement</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Total Achievements</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">15</div>
              <div className="text-sm text-muted-foreground">International</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <div className="text-sm text-muted-foreground">National</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">10</div>
              <div className="text-sm text-muted-foreground">Regional</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-primary text-primary-foreground shadow-glow">
          <CardContent className="p-8 text-center">
            <Trophy className="h-16 w-16 mx-auto mb-4 opacity-80" />
            <h3 className="text-2xl font-bold mb-4">Join Our Success Story</h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              These achievements represent the dedication, hard work, and collaborative spirit of our club members. 
              With proper guidance and consistent practice, you too can be part of our next success story.
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="hover:shadow-elegant transition-all duration-300"
            >
              Start Your Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AchievementsSection;
