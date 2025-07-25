import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Clock, Users, Trophy, Target, Calendar, Code, BookOpen } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const contestTypes = [
  {
    id: "weekly-long",
    name: "Weekly Long Contest",
    icon: Clock,
    description: "Extended problem-solving sessions with complex algorithmic challenges",
    color: "from-blue-500 to-purple-600",
  },
  {
    id: "jkkniu-weekly",
    name: "JKKNIU Weekly Contest",
    icon: Trophy,
    description: "University-specific weekly programming competitions",
    color: "from-green-500 to-teal-600",
  },
  {
    id: "jkkniu-monthly",
    name: "JKKNIU Monthly Contest",
    icon: Calendar,
    description: "Monthly championship events with prizes and recognition",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: "team-formation",
    name: "Team Formation Contest",
    icon: Users,
    description: "Collaborative contests for IUPC/ICPC preparation",
    color: "from-orange-500 to-red-600",
  },
];

type Contest = {
  contest_name: string;
  topic: string; // You may want to parse this as string[] if stored as JSON
  contest_type: string;
  status: string;
  difficulty: string;
  learning_resources: string[]; // array
  start_time: string;
  end_time: string;
  link?: string; // Optional field, you can add it to your DB or hardcode
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800";
    case "upcoming":
      return "bg-blue-100 text-blue-800";
    case "registration open":
      return "bg-purple-100 text-purple-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "hard":
      return "bg-red-100 text-red-800";
    case "expert":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const ContestsSection = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("contests")
          .select("*")
          .order("start_time", { ascending: true });
        if (error) throw error;
        if (data) {
          setContests(data);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load contests");
      }
      setLoading(false);
    };

    fetchContests();
  }, []);

  // Group contests by contest_type for easy tab access
  const groupedContests = contestTypes.reduce((acc, type) => {
    acc[type.id] = contests.filter(c => c.contest_type === type.id);
    return acc;
  }, {} as Record<string, Contest[]>);

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

        {loading ? (
          <p className="text-center text-lg text-muted-foreground">Loading contests...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : contests.length === 0 ? (
          <p className="text-center text-muted-foreground">No contests available.</p>
        ) : (
          <Tabs defaultValue={contestTypes[0].id} className="w-full">
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
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${type.color} flex items-center justify-center`}
                      >
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
                  {groupedContests[type.id]?.map((contest, index) => {
                    // Parse topics from string to array, assuming comma-separated or JSON array string
                    let topics: string[] = [];
                    try {
                      topics = JSON.parse(contest.topic);
                      if (!Array.isArray(topics)) topics = [];
                    } catch {
                      // fallback: comma separated string
                      topics = contest.topic ? contest.topic.split(",").map(t => t.trim()) : [];
                    }

                    return (
                      <Card key={index} className="hover:shadow-elegant transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                            {/* Contest Info */}
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h4 className="text-lg font-semibold text-foreground">
                                  {contest.contest_name}
                                </h4>
                                <Badge className={getStatusColor(contest.status)}>{contest.status}</Badge>
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
                                    {topics.map((topic, topicIndex) => (
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
                                    {contest.learning_resources?.map((resource, resourceIndex) => (
                                      <Badge
                                        key={resourceIndex}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {resource}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  {/* Calculate duration from start_time and end_time */}
                                  <span>
                                    Duration:{" "}
                                    {(() => {
                                      if (contest.start_time && contest.end_time) {
                                        const start = new Date(contest.start_time);
                                        const end = new Date(contest.end_time);
                                        const diff = end.getTime() - start.getTime();
                                        if (diff > 0) {
                                          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                                          const hours = Math.floor(
                                            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                                          );
                                          const minutes = Math.floor(
                                            (diff % (1000 * 60 * 60)) / (1000 * 60)
                                          );
                                          let durationText = "";
                                          if (days > 0) durationText += `${days}d `;
                                          if (hours > 0) durationText += `${hours}h `;
                                          if (minutes > 0) durationText += `${minutes}m`;
                                          return durationText.trim() || "0m";
                                        } else {
                                          return "Invalid";
                                        }
                                      }
                                      return "-";
                                    })()}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Users className="h-4 w-4" />
                                  <span>Participants: -</span> {/* You can extend DB to add this */}
                                </div>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col space-y-2">
                              <Button
                                className="flex items-center space-x-2"
                                onClick={() => window.open(contest.link ?? "#", "_blank")}
                                disabled={!contest.link}
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
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}
        {/* Contest Statistics - you can fetch or keep static */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{contests.length}+</div>
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
