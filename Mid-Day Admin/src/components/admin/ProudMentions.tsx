import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Award, Upload, Save, Eye, X, Plus, Trash2, Edit2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // Adjust to your supabase client path

export function ProudMentions() {
  const [formData, setFormData] = useState({
    id: null as number | null,
    name: "",
    short_description: "",
    tags: [""],
    image: null as File | null,
    image_url: "", // to store uploaded image URL for editing existing entries
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [mentions, setMentions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load proud mentions on mount
  useEffect(() => {
    fetchMentions();
  }, []);

  async function fetchMentions() {
    setLoading(true);
    const { data, error } = await supabase
      .from("proud_mentions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Failed to fetch mentions: " + error.message);
    } else {
      setMentions(data || []);
    }
    setLoading(false);
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...formData.tags];
    newTags[index] = value;
    setFormData((prev) => ({
      ...prev,
      tags: newTags,
    }));
  };

  const addTag = () => {
    if (formData.tags.length < 3) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, ""],
      }));
    }
  };

  const removeTag = (index: number) => {
    if (formData.tags.length > 1) {
      const newTags = formData.tags.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        tags: newTags,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      short_description: "",
      tags: [""],
      image: null,
      image_url: "",
    });
    setImagePreview("");
  };

  // Upload image to Supabase Storage and get public URL
  async function uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("proud-mentions-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) throw uploadError;

    // Get public URL
    const { data } = supabase.storage
      .from("proud-mentions-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.short_description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.tags.filter((t) => t.trim() !== "").length === 0) {
      alert("Please add at least one tag.");
      return;
    }

    let imageUrl = formData.image_url; // For update

    try {
      if (formData.image) {
        // Upload new image
        imageUrl = await uploadImage(formData.image);
      } else if (!formData.image_url) {
        alert("Please upload an image.");
        return;
      }

      if (formData.id) {
        // Update existing proud mention
        const { error } = await supabase
          .from("proud_mentions")
          .update({
            name: formData.name,
            short_description: formData.short_description,
            tags: formData.tags.filter((t) => t.trim() !== ""),
            image_url: imageUrl,
          })
          .eq("id", formData.id);

        if (error) {
          alert("Failed to update proud mention: " + error.message);
          return;
        }
        alert("Proud mention updated successfully!");
      } else {
        // Insert new proud mention
        const { error } = await supabase.from("proud_mentions").insert([
          {
            name: formData.name,
            short_description: formData.short_description,
            tags: formData.tags.filter((t) => t.trim() !== ""),
            image_url: imageUrl,
          },
        ]);

        if (error) {
          alert("Failed to add proud mention: " + error.message);
          return;
        }
        alert("Proud mention added successfully!");
      }

      resetForm();
      fetchMentions();
    } catch (error: any) {
      alert("Error: " + error.message);
    }
  };

  // Load mention data into form for editing
  const handleEdit = (mention: any) => {
    setFormData({
      id: mention.id,
      name: mention.name,
      short_description: mention.short_description,
      tags: mention.tags.length > 0 ? mention.tags : [""],
      image: null,
      image_url: mention.image_url,
    });
    setImagePreview(mention.image_url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete mention by id
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this proud mention?")) return;

    const { error } = await supabase.from("proud_mentions").delete().eq("id", id);

    if (error) {
      alert("Failed to delete proud mention: " + error.message);
    } else {
      alert("Proud mention deleted successfully!");
      fetchMentions();
    }
  };

  const validTags = formData.tags.filter((tag) => tag.trim() !== "");

  return (
    <AdminLayout title="Proud Mentions Management">
      <div className="space-y-6">
        {/* Form Card */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              {formData.id ? "Edit Proud Mention" : "Add Proud Mention"}
            </CardTitle>
            <CardDescription>
              Highlight notable achievements, awards, or recognitions of members or
              the organization.
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
                    <Label htmlFor="short_description">Short Description *</Label>
                    <Textarea
                      id="short_description"
                      placeholder="Brief description of the achievement or recognition..."
                      value={formData.short_description}
                      onChange={(e) =>
                        handleInputChange("short_description", e.target.value)
                      }
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
                            setFormData((prev) => ({ ...prev, image: null, image_url: "" }));
                          }}
                        >
                          Remove Image
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <div>
                          <p className="text-foreground font-medium">
                            Upload Achievement Image
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Recommended: 600x400px, Max 3MB
                          </p>
                        </div>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          required={!formData.image_url}
                          className="bg-background/50"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Clear
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  {formData.id ? "Update Proud Mention" : "Add Proud Mention"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {(formData.name ||
          formData.short_description ||
          imagePreview ||
          validTags.length > 0) && (
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
                    {formData.short_description ||
                      "Achievement description will appear here..."}
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

        {/* Existing Proud Mentions List */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Existing Proud Mentions</CardTitle>
            <CardDescription>
              Manage existing proud mentions below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : mentions.length === 0 ? (
              <p>No proud mentions found.</p>
            ) : (
              <ul className="space-y-4">
                {mentions.map((mention) => (
                  <li
                    key={mention.id}
                    className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-border/20 pb-4"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={mention.image_url}
                        alt={mention.name}
                        className="h-16 w-24 object-cover rounded"
                      />
                      <div>
                        <h4 className="font-semibold">{mention.name}</h4>
                        <p className="text-sm text-muted-foreground truncate max-w-xs">
                          {mention.short_description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(mention.tags || []).map((tag: string, i: number) => (
                            <Badge key={i} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(mention)}
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(mention.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
