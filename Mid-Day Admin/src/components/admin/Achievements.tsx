import { useEffect, useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Trophy, Save, Eye, X, Plus, Calendar, Link, Edit, Trash2 } from "lucide-react";

import { supabase } from "../../lib/supabaseClient";

type Achievement = {
  id: number;
  title: string;
  short_description: string;
  date: string;
  link: string | null;
  tags: string[];
};

export function Achievements() {
  const [formData, setFormData] = useState({
    id: null as number | null,
    title: "",
    shortDescription: "",
    date: "",
    link: "",
    tags: [""],
  });
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // Fetch all achievements on mount
  useEffect(() => {
    fetchAchievements();
  }, []);

  async function fetchAchievements() {
    setLoading(true);
    const { data, error } = await supabase
      .from("achievements")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      setMessage(`Error fetching achievements: ${error.message}`);
    } else {
      setAchievements((data as Achievement[]) || []);
      setMessage("");
    }
    setLoading(false);
  }

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

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      shortDescription: "",
      date: "",
      link: "",
      tags: [""],
    });
    setIsEditing(false);
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const tagsFiltered = formData.tags.filter(tag => tag.trim() !== "");

      if (isEditing && formData.id !== null) {
        // UPDATE
        const { error } = await supabase
          .from("achievements")
          .update({
            title: formData.title,
            short_description: formData.shortDescription,
            date: formData.date,
            link: formData.link || null,
            tags: tagsFiltered,
          })
          .eq("id", formData.id);

        if (error) throw error;
        setMessage("Achievement updated successfully!");
      } else {
        // CREATE
        const { error } = await supabase.from("achievements").insert({
          title: formData.title,
          short_description: formData.shortDescription,
          date: formData.date,
          link: formData.link || null,
          tags: tagsFiltered,
        });

        if (error) throw error;
        setMessage("Achievement added successfully!");
      }
      resetForm();
      await fetchAchievements();
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (achievement: Achievement) => {
    setFormData({
      id: achievement.id,
      title: achievement.title,
      shortDescription: achievement.short_description,
      date: achievement.date,
      link: achievement.link || "",
      tags: achievement.tags.length ? achievement.tags : [""],
    });
    setIsEditing(true);
    setMessage("");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this achievement?")) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase.from("achievements").delete().eq("id", id);
    if (error) {
      setMessage(`Delete failed: ${error.message}`);
    } else {
      setMessage("Achievement deleted successfully!");
      await fetchAchievements();
    }
    setLoading(false);
  };

  const validTags = formData.tags.filter(tag => tag.trim() !== "");

  return (
    <AdminLayout title="Achievements Management">
      <div className="space-y-6">
        {/* Form Card */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              {isEditing ? "Edit Achievement" : "Add Achievement"}
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
                <Button
                  type="button"
                  variant="outline"
                  disabled={loading}
                  onClick={() => {
                    // Preview functionality - can be extended if needed
                    alert(JSON.stringify(formData, null, 2));
                  }}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  {loading ? (isEditing ? "Updating..." : "Adding...") : (isEditing ? "Update Achievement" : "Add Achievement")}
                </Button>
                {isEditing && (
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </div>
              {message && (
                <p
                  className={`mt-4 text-center ${
                    message.startsWith("Error") ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>

        {/* List of Achievements with Edit/Delete */}
        <Card className="bg-card/30 backdrop-blur border-border/30 max-h-[600px] overflow-auto">
          <CardHeader>
            <CardTitle>All Achievements</CardTitle>
            <CardDescription>Click edit to modify or delete an achievement.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading achievements...</p>
            ) : achievements.length === 0 ? (
              <p>No achievements found.</p>
            ) : (
              <div className="space-y-4">
                {achievements.map((ach) => (
                  <div
                    key={ach.id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-4 border border-border rounded-lg p-4"
                  >
                    <div>
                      <h3 className="text-lg font-bold">{ach.title}</h3>
                      <p className="text-sm text-muted-foreground">{ach.date}</p>
                      <p>{ach.short_description}</p>
                      {ach.link && (
                        <a
                          href={ach.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1"
                        >
                          <Link className="h-4 w-4" />
                          View Details
                        </a>
                      )}
                      {ach.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {ach.tags.map((tag, idx) => (
                            <Badge key={idx} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(ach)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(ach.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
