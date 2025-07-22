import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ExternalLink, Clock, Users, Trophy, Target, Calendar, Code, BookOpen } from 'lucide-react';

const ContestsSection = () => {
  const contestTypes = [
    {
      id: "weekly-long",
      name: "Weekly Long Contest",
      icon: Clock,
      description: "Extended problem-solving sessions with complex algorithmic challenges",
      color: "from-blue-500 to-purple-600"
    },
    {
      id: "weekly-jkkniu",
      name: "JKKNIU Weekly Contest",
      icon: Trophy,
      description: "University-specific weekly programming competitions",
      color: "from-green-500 to-teal-600"
    },
    {
      id: "monthly-jkkniu",
      name: "JKKNIU Monthly Contest",
      icon: Calendar,
      description: "Monthly championship events with prizes and recognition",
      color: "from-purple-500 to-pink-600"
    },
    {
      id: "team-formation",
      name: "Team Formation Contest",
      icon: Users,
      description: "Collaborative contests for IUPC/ICPC preparation",
      color: "from-orange-500 to-red-600"
    }
  ];

  const contestData = {
    "weekly-long": [
      {
        name: "Algorithm Mastery Week 1",
        topics: ["Dynamic Programming", "Graph Theory", "Greedy Algorithms"],
        resources: ["CP-Algorithms", "GeeksforGeeks", "Codeforces Edu"],
        link: "https://codeforces.com/group/contest",
        status: "Active",
        duration: "7 days",
        participants: 45,
        difficulty: "Medium"
      },
      {
        name: "Data Structures Deep Dive",
        topics: ["Segment Trees", "Fenwick Trees", "Disjoint Set Union"],
        resources: ["CLRS Book", "Competitive Programming 3", "YouTube Tutorials"],
        link: "https://codeforces.com/group/contest",
        status: "Upcoming",
        duration: "7 days",
        participants: 38,
        difficulty: "Hard"
      },
      {
        name: "Mathematical Algorithms",
        topics: ["Number Theory", "Combinatorics", "Linear Algebra"],
        resources: ["Art of Computer Programming", "Concrete Mathematics"],
        link: "https://codeforces.com/group/contest",
        status: "Completed",
        duration: "7 days",
        participants: 52,
        difficulty: "Medium"
      }
    ],
    "weekly-jkkniu": [
      {
        name: "JKKNIU Weekly Round 15",
        topics: ["Implementation", "Brute Force", "Sorting"],
        resources: ["Codeforces Practice", "AtCoder Beginner"],
        link: "https://vjudge.net/contest",
        status: "Active",
        duration: "3 hours",
        participants: 67,
        difficulty: "Easy"
      },
      {
        name: "JKKNIU Weekly Round 16",
        topics: ["Binary Search", "Two Pointers", "Sliding Window"],
        resources: ["LeetCode", "HackerRank", "Codeforces"],
        link: "https://vjudge.net/contest",
        status: "Upcoming",
        duration: "3 hours",
        participants: 45,
        difficulty: "Medium"
      }
    ],
    "monthly-jkkniu": [
      {
        name: "JKKNIU Monthly Championship March",
        topics: ["Graph Algorithms", "Dynamic Programming", "String Algorithms"],
        resources: ["Competitive Programming Handbook", "Algorithm Design Manual"],
        link: "https://vjudge.net/contest",
        status: "Registration Open",
        duration: "5 hours",
        participants: 89,
        difficulty: "Hard"
      },
      {
        name: "JKKNIU Monthly Championship February",
        topics: ["Tree Algorithms", "Computational Geometry", "Game Theory"],
        resources: ["CSES Problem Set", "Codeforces Blog"],
        link: "https://vjudge.net/contest",
        status: "Completed",
        duration: "5 hours",
        participants: 94,
        difficulty: "Hard"
      }
    ],
    "team-formation": [
      {
        name: "ICPC Team Practice 1",
        topics: ["Team Coordination", "Problem Distribution", "Time Management"],
        resources: ["ICPC World Finals Problems", "Kattis Problem Archive"],
        link: "https://vjudge.net/contest",
        status: "Active",
        duration: "5 hours",
        participants: 30,
        difficulty: "Hard"
      },
      {
        name: "Mock Regional Contest",
        topics: ["Advanced Algorithms", "Implementation", "Debugging"],
        resources: ["Previous Regional Problems", "Team Reference Document"],
        link: "https://vjudge.net/contest",
        status: "Upcoming",
        duration: "5 hours",
        participants: 24,
        difficulty: "Expert"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Upcoming": return "bg-blue-100 text-blue-800";
      case "Registration Open": return "bg-purple-100 text-purple-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      case "Expert": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section id="contests" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Programming Contests
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Participate in our diverse range of programming contests designed to enhance your 
            problem-solving skills and prepare you for competitive programming.
          </p>
        </div>

        <Tabs defaultValue="weekly-long" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
            {contestTypes.map((type) => (
              <TabsTrigger key={type.id} value={type.id} className="flex items-center space-x-2">
                <type.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{type.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {contestTypes.map((type) => (
            <TabsContent key={type.id} value={type.id}>
              <Card className="mb-6 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${type.color}`}></div>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center`}>
                      <type.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">{type.name}</h3>
                      <p className="text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid gap-6">
                {contestData[type.id as keyof typeof contestData]?.map((contest, index) => (
                  <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        {/* Contest Info */}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-3">
                            <h4 className="text-lg font-semibold text-foreground">{contest.name}</h4>
                            <Badge className={getStatusColor(contest.status)}>
                              {contest.status}
                            </Badge>
                            <Badge className={getDifficultyColor(contest.difficulty)}>
                              {contest.difficulty}
                            </Badge>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h5 className="text-sm font-medium text-foreground mb-2 flex items-center">
                                <Target className="h-4 w-4 mr-1" />
                                Topics
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {contest.topics.map((topic, topicIndex) => (
                                  <Badge key={topicIndex} variant="outline" className="text-xs">
                                    {topic}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-foreground mb-2 flex items-center">
                                <BookOpen className="h-4 w-4 mr-1" />
                                Learning Resources
                              </h5>
                              <div className="flex flex-wrap gap-1">
                                {contest.resources.map((resource, resourceIndex) => (
                                  <Badge key={resourceIndex} variant="secondary" className="text-xs">
                                    {resource}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-4 w-4" />
                              <span>Duration: {contest.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="h-4 w-4" />
                              <span>Participants: {contest.participants}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2">
                          <Button 
                            className="flex items-center space-x-2"
                            onClick={() => window.open(contest.link, '_blank')}
                          >
                            <Code className="h-4 w-4" />
                            <span>Join Contest</span>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            View Problems
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Contest Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Total Contests</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Problems Solved</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">250+</div>
              <div className="text-sm text-muted-foreground">Participants</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">4</div>
              <div className="text-sm text-muted-foreground">Contest Types</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContestsSection;