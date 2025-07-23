import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Code, Users, Trophy, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const contests = [
    {
      title: "Weekly Long Contest",
      description: "Challenge yourself with algorithmic problems every week",
      icon: Code,
      color: "from-primary to-accent"
    },
    {
      title: "JKKNIU Weekly Contest",
      description: "University-wide programming competition for all students",
      icon: Trophy,
      color: "from-accent to-primary"
    },
    {
      title: "JKKNIU Monthly Contest",
      description: "Monthly championship to showcase your programming skills",
      icon: Calendar,
      color: "from-primary to-primary-glow"
    },
    {
      title: "Team Formation Contest",
      description: "Prepare for IUPC/ICPC with team-based challenges",
      icon: Users,
      color: "from-accent to-primary-glow"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % contests.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % contests.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + contests.length) % contests.length);
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-32 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Welcome to{' '}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Mid Day Programming Club
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join the most vibrant programming community at JKKNIU. Enhance your coding skills,
                participate in contests, and build lasting connections with fellow programmers.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Join Now
              </Button>
              <Button variant="outline" size="lg" className="hover:shadow-elegant transition-all duration-300">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">250+</div>
                <div className="text-sm text-muted-foreground">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100+</div>
                <div className="text-sm text-muted-foreground">Contests Held</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </div>
            </div>
          </div>

          {/* Right Content - Contest Carousel */}
          <div className="relative">
            <Card className="overflow-hidden shadow-glow bg-gradient-card border-0">
              <CardContent className="p-0">
                <div className="relative h-96 flex items-center justify-center">
                  <div className={`absolute inset-0 bg-gradient-to-br ${contests[currentSlide].color} opacity-10`}></div>
                  
                  <div className="relative z-10 text-center p-8">
                    <div className="mb-6">
                      {React.createElement(contests[currentSlide].icon, {
                        className: "h-16 w-16 mx-auto text-primary mb-4"
                      })}
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">
                      {contests[currentSlide].title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {contests[currentSlide].description}
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center space-x-2 p-4">
                  {contests.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentSlide ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;