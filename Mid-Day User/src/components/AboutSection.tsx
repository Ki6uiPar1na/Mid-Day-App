import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "../lib/supabaseClient";
import { Target, Users, Lightbulb, Heart } from "lucide-react";

export interface AboutEntry {
  id: number;
  name: string;
  designation: string;
  speech: string;
  image_url: string;
}

const AboutSection = () => {
  const [aboutList, setAboutList] = useState<AboutEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbouts = async () => {
      const { data, error } = await supabase
        .from("about_section")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching about_section data:", error);
      } else if (data) {
        setAboutList(data);
      }
      setLoading(false);
    };
    fetchAbouts();
  }, []);

  const values = [
    {
      title: "Excellence",
      description: "Striving for the highest standards in programming and problem-solving",
      icon: Target,
    },
    {
      title: "Community",
      description: "Building strong bonds among programmers and fostering collaboration",
      icon: Users,
    },
    {
      title: "Innovation",
      description: "Encouraging creative thinking and innovative approaches to challenges",
      icon: Lightbulb,
    },
    {
      title: "Growth",
      description: "Supporting continuous learning and personal development",
      icon: Heart,
    },
  ];

  if (loading) {
    return <p className="text-center mt-10">Loading About Section...</p>;
  }

  if (aboutList.length === 0) {
    return <p className="text-center mt-10">No about entries available.</p>;
  }

  return (
    <section id="about" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            About Our Club
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Mid Day Programming Club is the premier programming community at JKKNIU, dedicated to{" "}
            fostering programming excellence, innovation, and collaborative learning among students.
          </p>
        </div>

        {/* Marquee container */}
        <div
          className="overflow-hidden relative mb-20"
          style={{ height: "460px" }} // adjust to fit card height + padding
        >
          <div
            className="flex gap-8 absolute whitespace-nowrap animate-marquee"
            onMouseEnter={(e) => {
              (e.currentTarget.style as any).animationPlayState = "paused";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget.style as any).animationPlayState = "running";
            }}
          >
            {aboutList.concat(aboutList).map((organizer, index) => (
              <Card
                key={`${organizer.id}-${index}`} // unique key for duplicated items
                className="inline-block hover:shadow-elegant transition-all duration-300 transform hover:-translate-y-2"
                style={{ minWidth: "320px" }} // width to control spacing horizontally
              >
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    {organizer.image_url && (
                      <img
                        src={organizer.image_url}
                        alt={organizer.name}
                        className="h-48 w-48 mx-auto rounded-full mb-4 object-cover"
                      />
                    )}
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {organizer.name}
                    </h3>
                    <p className="text-sm text-primary font-medium">{organizer.designation}</p>
                  </div>
                  <blockquote className="text-muted-foreground italic leading-relaxed">
                    "{organizer.speech}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">
            Our Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-elegant transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <value.icon className="h-10 w-10 mx-auto text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="text-lg font-semibold mb-3 text-foreground">{value.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
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
              Established with the vision of creating a vibrant programming community, Mid Day Programming Club{" "}
              has grown from a small group of passionate programmers to one of the most active and successful{" "}
              clubs at JKKNIU. Our journey is marked by countless hours of practice, numerous victories in{" "}
              programming contests, and the success stories of our members who have gone on to achieve{" "}
              excellence in their careers.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AboutSection;
