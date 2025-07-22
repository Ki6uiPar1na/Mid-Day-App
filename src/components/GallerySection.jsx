import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Play, Image, Video, ChevronLeft, ChevronRight, Calendar, Users } from 'lucide-react';

const GallerySection = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [filter, setFilter] = useState('All');

  const galleryItems = [
    {
      id: 1,
      type: 'image',
      src: '/placeholder.svg',
      title: 'ICPC Regional Contest 2023',
      description: 'Our team preparing for the regional contest',
      category: 'Contests',
      date: '2023-11-15'
    },
    {
      id: 2,
      type: 'video',
      src: '/placeholder.svg',
      title: 'Programming Workshop',
      description: 'Weekly programming workshop highlights',
      category: 'Workshops',
      date: '2023-10-20'
    },
    // Add more gallery items...
  ];

  const categories = ['All', 'Contests', 'Workshops', 'Events', 'Achievements'];

  const filteredItems = filter === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-gradient-card">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Gallery
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Capturing memorable moments from our programming contests, workshops, events, and achievements.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(category)}
              className="hover:shadow-elegant transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <Card key={item.id} className="group hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square bg-muted overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  
                  {item.type === 'video' && (
                    <div className="absolute top-2 right-2 z-20">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Video className="h-3 w-3" />
                        Video
                      </Badge>
                    </div>
                  )}
                  
                  <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedMedia(item)}
                      className="flex items-center gap-2"
                    >
                      {item.type === 'video' ? <Play className="h-4 w-4" /> : <Image className="h-4 w-4" />}
                      View
                    </Button>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20 text-white">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-xs opacity-80">
                      <Calendar className="h-3 w-3" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedMedia && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full bg-background rounded-lg overflow-hidden">
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="aspect-video bg-muted">
                {selectedMedia.type === 'video' ? (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Video Player Placeholder
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Image Viewer Placeholder
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{selectedMedia.title}</h3>
                <p className="text-muted-foreground mb-4">{selectedMedia.description}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <Badge variant="outline">{selectedMedia.category}</Badge>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {selectedMedia.date}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;