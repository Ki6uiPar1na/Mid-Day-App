import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trophy, Save, Eye, X, Plus, Calendar, Link } from "lucide-react";

export function Achievements() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    date: "",
    link: "",
    tags: [""],
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData(prev => ({
      ...prev,
      tags: newTags
    }));
  };

  const addTag = () => {
    if (formData.tags.length < 5) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, ""]
      }));
    }
  };

  const removeTag = (index: number) => {
    if (formData.tags.length > 1) {
      const newTags = formData.tags.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        tags: newTags
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding achievement:", formData);
  };

  const validTags = formData.tags.filter(tag => tag.trim() !== "");

  return (
    <AdminLayout title="Achievements Management">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Add Achievement
            </CardTitle>
            <CardDescription>
              Post member or club achievements to showcase accomplishments and recognitions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., ICPC World Finals 2024"
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
                      placeholder="Brief description of the achievement..."
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      required
                      rows={4}
                      className="bg-background/50"
                    />
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
                    <Label htmlFor="link">Link</Label>
                    <div className="relative">
                      <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="link"
                        type="url"
                        placeholder="https://example.com/achievement-details"
                        value={formData.link}
                        onChange={(e) => handleInputChange("link", e.target.value)}
                        className="bg-background/50 pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Tags Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Tags (Multiple allowed)</Label>
                    {formData.tags.length < 5 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addTag}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Tag
                      </Button>
                    )}
                  </div>
                  <div className="space-y-2">
                    {formData.tags.map((tag, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          placeholder={`Tag ${index + 1}`}
                          value={tag}
                          onChange={(e) => handleTagChange(index, e.target.value)}
                          className="bg-background/50"
                        />
                        {formData.tags.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeTag(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Tags Preview */}
                  {validTags.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm text-muted-foreground">Tags Preview:</Label>
                      <div className="flex flex-wrap gap-2">
                        {validTags.map((tag, index) => (
                          <Badge key={index} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Add Achievement
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {(formData.title || formData.shortDescription || validTags.length > 0) && (
          <Card className="bg-card/30 backdrop-blur border-border/30">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How this will appear on the website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {formData.title || "Achievement Title"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formData.date || "Date"}
                  </p>
                  <p className="text-muted-foreground">
                    {formData.shortDescription || "Achievement description will appear here..."}
                  </p>
                  {formData.link && (
                    <a 
                      href={formData.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Link className="h-4 w-4" />
                      View Details
                    </a>
                  )}
                  {validTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {validTags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}