import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bell, Save, Eye, Calendar, Link } from "lucide-react";

export function NoticeBoard() {
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    shortDescription: "",
    link: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Adding notice:", formData);
  };

  return (
    <AdminLayout title="Notice Board Management">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Change Notice Board
            </CardTitle>
            <CardDescription>
              Update notices on the website to keep members informed about important announcements and updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Form Fields */}
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
                    <Label htmlFor="shortDescription">Short Description *</Label>
                    <Textarea
                      id="shortDescription"
                      placeholder="Brief description of the notice..."
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
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
                      <p><strong>Urgent:</strong> Immediate action required</p>
                      <p><strong>General:</strong> Information and updates</p>
                      <p><strong>Events:</strong> Upcoming activities</p>
                      <p><strong>Academic:</strong> Contest and competition related</p>
                    </div>
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
                  Update Notice
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {(formData.title || formData.shortDescription) && (
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
                        {formData.shortDescription || "Notice description will appear here..."}
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
      </div>
    </AdminLayout>
  );
}