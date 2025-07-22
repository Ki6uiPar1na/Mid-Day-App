import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Image, Video, Calendar, Users, Trophy, Code, X, ChevronLeft, ChevronRight } from 'lucide-react';

const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const galleryItems = [
    {
      id: 1,
      type: "image",
      title: "ICPC Regional Contest 2023",
      description: "Our team participating in the ACM-ICPC Dhaka Regional Contest",
      url: "/placeholder.svg",
      category: "contests",
      date: "2023-11-15",
      participants: ["Team Alpha", "Team Beta", "Team Gamma"]
    },
    {
      id: 2,
      type: "image",
      title: "Weekly Contest Session",
      description: "Members solving problems during our weekly programming contest",
      url: "/placeholder.svg",
      category: "events",
      date: "2023-12-01",
      participants: ["50+ Members"]
    },
    {
      id: 3,
      type: "video",
      title: "Algorithm Workshop",
      description: "Dynamic Programming workshop conducted by senior members",
      url: "/placeholder.svg",
      category: "workshops",
      date: "2023-10-20",
      participants: ["Workshop Attendees"]
    },
    {
      id: 4,
      type: "image",
      title: "Club Inauguration Ceremony",
      description: "Grand opening ceremony of Mid Day Programming Club",
      url: "/placeholder.svg",
      category: "events",
      date: "2023-03-15",
      participants: ["All Members", "Faculty", "Guests"]
    },
    {
      id: 5,
      type: "image",
      title: "Trophy Ceremony",
      description: "Celebrating our achievements in various programming contests",
      url: "/placeholder.svg",
      category: "achievements",
      date: "2023-12-10",
      participants: ["Winners", "Executives"]
    },
    {
      id: 6,
      type: "video",
      title: "Coding Marathon",
      description: "24-hour coding marathon event with exciting challenges",
      url: "/placeholder.svg",
      category: "events",
      date: "2023-09-30",
      participants: ["Marathon Participants"]
    },
    {
      id: 7,
      type: "image",
      title: "Guest Lecture",
      description: "Industry expert sharing insights on software development",
      url: "/placeholder.svg",
      category: "workshops",
      date: "2023-11-05",
      participants: ["Club Members", "Guest Speaker"]
    },
    {
      id: 8,
      type: "image",
      title: "Team Building Activity",
      description: "Fun team building session to strengthen member bonds",
      url: "/placeholder.svg",
      category: "events",
      date: "2023-08-20",
      participants: ["All Members"]
    },
    {
      id: 9,
      type: "video",
      title: "Contest Preparation",
      description: "Intensive preparation session for upcoming ICPC",
      url: "/placeholder.svg",
      category: "contests",
      date: "2023-10-15",
      participants: ["ICPC Teams"]
    }
  ];

  const categories = [
    { id: "all", name: "All", icon: Image },
    { id: "contests", name: "Contests", icon: Trophy },
    { id: "events", name: "Events", icon: Calendar },
    { id: "workshops", name: "Workshops", icon: Code },
    { id: "achievements", name: "Achievements", icon: Trophy }
  ];

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const imageItems = filteredItems.filter(item => item.type === "image");
  const videoItems = filteredItems.filter(item => item.type === "video");

  const openLightbox = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of memorable moments, achievements, and events that showcase 
            the vibrant life of our programming club.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center space-x-2 hover:shadow-elegant transition-all duration-300"
            >
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Gallery Tabs */}
        <Tabs defaultValue="images" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="images" className="flex items-center space-x-2">
              <Image className="h-4 w-4" />
              <span>Photos ({imageItems.length})</span>
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center space-x-2">
              <Video className="h-4 w-4" />
              <span>Videos ({videoItems.length})</span>
            </TabsTrigger>
          </TabsList>

          {/* Images Tab */}
          <TabsContent value="images">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {imageItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-glow transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="m-4"
                        onClick={() => openLightbox(item.url)}
                      >
                        View Full Size
                      </Button>
                    </div>
                    <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                      {new Date(item.date).toLocaleDateString()}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{item.participants.join(', ')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="grid md:grid-cols-2 gap-6">
              {videoItems.map((item) => (
                <Card key={item.id} className="group hover:shadow-glow transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <div className="w-full h-64 bg-muted flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                      <div className="text-center">
                        <Video className="h-16 w-16 mx-auto text-primary mb-4" />
                        <p className="text-sm text-muted-foreground">Video Content</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="absolute top-3 right-3 text-xs">
                      {new Date(item.date).toLocaleDateString()}
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="secondary" size="lg" className="flex items-center space-x-2">
                        <Video className="h-5 w-5" />
                        <span>Play Video</span>
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>{item.participants.join(', ')}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Gallery Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{imageItems.length}</div>
              <div className="text-sm text-muted-foreground">Total Photos</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">{videoItems.length}</div>
              <div className="text-sm text-muted-foreground">Total Videos</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">20+</div>
              <div className="text-sm text-muted-foreground">Events Covered</div>
            </CardContent>
          </Card>
          <Card className="text-center hover:shadow-elegant transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Memories Captured</div>
            </CardContent>
          </Card>
        </div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl max-h-full">
              <img
                src={selectedImage}
                alt="Gallery Image"
                className="max-w-full max-h-full object-contain"
              />
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
              >
                <X className="h-8 w-8" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;