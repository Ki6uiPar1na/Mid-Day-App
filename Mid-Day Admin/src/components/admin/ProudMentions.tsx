import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Award, Upload, Save, Eye, X, Plus } from "lucide-react";

export function ProudMentions() {
  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    tags: [""],
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

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
    if (formData.tags.length < 3) {
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding proud mention:", formData);
  };

  const validTags = formData.tags.filter(tag => tag.trim() !== "");

  return (
    <AdminLayout title="Proud Mentions Management">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Add Proud Mention
            </CardTitle>
            <CardDescription>
              Highlight notable achievements, awards, or recognitions of members or the organization.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Fields */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name/Title *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., John Doe - ICPC World Finalist"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Textarea
                      id="shortDescription"
                      placeholder="Brief description of the achievement or recognition..."
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      required
                      rows={4}
                      className="bg-background/50"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Tags (2-3 recommended)</Label>
                      {formData.tags.length < 3 && (
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
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Achievement Image *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-48 w-full object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setImagePreview("");
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div>
                          <p className="text-foreground font-medium">Upload Achievement Image</p>
                          <p className="text-sm text-muted-foreground">
                            Recommended: 600x400px, Max 3MB
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
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
                  Add Proud Mention
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {(formData.name || formData.shortDescription || imagePreview || validTags.length > 0) && (
          <Card className="bg-card/30 backdrop-blur border-border/30">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How this will appear on the website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Achievement"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {formData.name || "Achievement Title"}
                  </h3>
                  <p className="text-muted-foreground">
                    {formData.shortDescription || "Achievement description will appear here..."}
                  </p>
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