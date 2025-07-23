import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Save, Eye, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Gallery() {
  const [formData, setFormData] = useState({
    category: "",
    section: "",
    date: "",
    title: "",
    shortDescription: "",
    file: null as File | null,
  });

  const [filePreview, setFilePreview] = useState<string>("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding gallery item:", formData);
  };

  const isVideo = formData.category === "Video";
  const fileType = formData.file?.type || "";

  return (
    <AdminLayout title="Gallery Management">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Add Photo/Video to Gallery
            </CardTitle>
            <CardDescription>
              Upload images and videos to organize them by category and section for the gallery.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => handleInputChange("category", value)} required>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select media category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Image">Image</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="section">Section *</Label>
                    <Select onValueChange={(value) => handleInputChange("section", value)} required>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Contest">Contest</SelectItem>
                        <SelectItem value="Event">Event</SelectItem>
                        <SelectItem value="Workshops">Workshops</SelectItem>
                        <SelectItem value="Achievement">Achievement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                        className="bg-background/50 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter title for the media"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Textarea
                      id="shortDescription"
                      placeholder="Brief description of the media content..."
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      required
                      rows={4}
                      className="bg-background/50"
                    />
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-4">
                  <Label>Upload {isVideo ? "Video" : "Image"} *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {filePreview ? (
                      <div className="space-y-4">
                        {fileType.startsWith("video/") ? (
                          <video
                            src={filePreview}
                            controls
                            className="mx-auto h-48 w-full object-cover rounded-lg"
                          />
                        ) : (
                          <img
                            src={filePreview}
                            alt="Preview"
                            className="mx-auto h-48 w-full object-cover rounded-lg"
                          />
                        )}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setFilePreview("");
                            setFormData(prev => ({ ...prev, file: null }));
                          }}
                        >
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div>
                          <p className="text-foreground font-medium">
                            Upload {isVideo ? "Video" : "Image"} File
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isVideo 
                              ? "Recommended: MP4 format, Max 50MB" 
                              : "Recommended: 1200x800px, Max 5MB"
                            }
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept={isVideo ? "video/*" : "image/*"}
                          onChange={handleFileChange}
                          required
                          className="bg-background/50"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Add to Gallery
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {(formData.title || formData.shortDescription || filePreview) && (
          <Card className="bg-card/30 backdrop-blur border-border/30">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How this will appear in the gallery</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filePreview && (
                  <div className="space-y-2">
                    {fileType.startsWith("video/") ? (
                      <video
                        src={filePreview}
                        controls
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    ) : (
                      <img
                        src={filePreview}
                        alt="Gallery item"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                      {formData.category || "Category"}
                    </span>
                    <span className="px-2 py-1 bg-secondary/10 text-secondary-foreground rounded">
                      {formData.section || "Section"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {formData.title || "Media Title"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.date || "Date"}
                  </p>
                  <p className="text-muted-foreground">
                    {formData.shortDescription || "Media description will appear here..."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}