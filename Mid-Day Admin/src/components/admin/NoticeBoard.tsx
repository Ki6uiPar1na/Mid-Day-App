import { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Save, Eye, Calendar, Link, Trash2, Edit2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient"; // Adjust the path to your supabase client

export function NoticeBoard() {
  const [formData, setFormData] = useState({
    id: null as number | null,
    date: "",
    title: "",
    short_description: "",
    link: "",
  });

  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Load all notices on mount
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("notices")
      .select("*")
      .order("date", { ascending: false });

    if (error) {
      alert("Error fetching notices: " + error.message);
    } else {
      setNotices(data || []);
    }
    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      date: "",
      title: "",
      short_description: "",
      link: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields (date, title, short_description)
    if (!formData.date || !formData.title || !formData.short_description) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.id) {
      // UPDATE existing notice
      const { error } = await supabase
        .from("notices")
        .update({
          date: formData.date,
          title: formData.title,
          short_description: formData.short_description,
          link: formData.link || null,
        })
        .eq("id", formData.id);

      if (error) {
        alert("Failed to update notice: " + error.message);
      } else {
        alert("Notice updated successfully!");
        resetForm();
        fetchNotices();
      }
    } else {
      // CREATE new notice
      const { error } = await supabase
        .from("notices")
        .insert([
          {
            date: formData.date,
            title: formData.title,
            short_description: formData.short_description,
            link: formData.link || null,
          },
        ]);

      if (error) {
        alert("Failed to add notice: " + error.message);
      } else {
        alert("Notice added successfully!");
        resetForm();
        fetchNotices();
      }
    }
  };

  const handleEdit = (notice: any) => {
    setFormData({
      id: notice.id,
      date: notice.date,
      title: notice.title,
      short_description: notice.short_description,
      link: notice.link || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    const { error } = await supabase.from("notices").delete().eq("id", id);

    if (error) {
      alert("Failed to delete notice: " + error.message);
    } else {
      alert("Notice deleted successfully!");
      fetchNotices();
    }
  };

  return (
    <AdminLayout title="Notice Board Management">
      <div className="space-y-6">
        {/* Form Card */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              {formData.id ? "Edit Notice" : "Add New Notice"}
            </CardTitle>
            <CardDescription>
              Update notices on the website to keep members informed about important announcements and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
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
                      placeholder="Enter notice title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="short_description">Short Description *</Label>
                    <Textarea
                      id="short_description"
                      placeholder="Brief description of the notice..."
                      value={formData.short_description}
                      onChange={(e) => handleInputChange("short_description", e.target.value)}
                      required
                      rows={6}
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="link">Link (Optional)</Label>
                    <div className="relative">
                      <Link className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="link"
                        type="url"
                        placeholder="https://example.com/notice-details"
                        value={formData.link}
                        onChange={(e) => handleInputChange("link", e.target.value)}
                        className="bg-background/50 pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Optional: Add a link for more details about the notice
                    </p>
                  </div>
                </div>

                {/* Additional Info/Instructions */}
                <div className="space-y-4">
                  <div className="bg-muted/20 border border-muted-foreground/20 rounded-lg p-4">
                    <h3 className="font-semibold text-foreground mb-2">Notice Guidelines</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Keep titles concise and descriptive</li>
                      <li>• Include important dates and deadlines</li>
                      <li>• Provide clear action items if needed</li>
                      <li>• Use professional language</li>
                      <li>• Double-check all information before posting</li>
                    </ul>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-medium text-primary mb-2">Notice Categories</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p>
                        <strong>Urgent:</strong> Immediate action required
                      </p>
                      <p>
                        <strong>General:</strong> Information and updates
                      </p>
                      <p>
                        <strong>Events:</strong> Upcoming activities
                      </p>
                      <p>
                        <strong>Academic:</strong> Contest and competition related
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Clear
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  {formData.id ? "Update Notice" : "Add Notice"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {(formData.title || formData.short_description) && (
          <Card className="bg-card/30 backdrop-blur border-border/30">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How this notice will appear on the website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {formData.date || "Date"}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {formData.title || "Notice Title"}
                      </h3>
                      <p className="text-muted-foreground">
                        {formData.short_description || "Notice description will appear here..."}
                      </p>
                      {formData.link && (
                        <a
                          href={formData.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline inline-flex items-center gap-1 text-sm"
                        >
                          <Link className="h-3 w-3" />
                          Read More
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List all notices */}
        <Card className="bg-card/50 backdrop-blur border-border/50 mt-6">
          <CardHeader>
            <CardTitle>All Notices {loading && "(Loading...)"}</CardTitle>
            <CardDescription>Manage existing notices here</CardDescription>
          </CardHeader>
          <CardContent>
            {notices.length === 0 && !loading && <p>No notices found.</p>}
            <ul className="space-y-4">
              {notices.map((notice) => (
                <li
                  key={notice.id}
                  className="border border-muted-foreground/20 rounded p-4 flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-semibold text-foreground">{notice.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(notice.date).toLocaleDateString()} - {notice.short_description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(notice)}>
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(notice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
