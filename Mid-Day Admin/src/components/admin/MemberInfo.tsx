import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Users, Upload, Save, Eye } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MemberInfo() {
  const [formData, setFormData] = useState({
    name: "",
    session: "",
    specialty: "",
    gmail: "",
    phone: "",
    linkedin: "",
    github: "",
    codeforces: "",
    codechef: "",
    hackerrank: "",
    toph: "",
    rating: "",
    approveStatus: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
    console.log("Updating member info:", formData);
  };

  return (
    <AdminLayout title="General Member Information">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Member Profile Management
            </CardTitle>
            <CardDescription>
              Manage detailed member profiles including contact information and programming platform accounts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basic Information */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="session">Session *</Label>
                      <Input
                        id="session"
                        placeholder="e.g., 2020-2024"
                        value={formData.session}
                        onChange={(e) => handleInputChange("session", e.target.value)}
                        required
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty *</Label>
                      <Input
                        id="specialty"
                        placeholder="e.g., Web Development, Data Science"
                        value={formData.specialty}
                        onChange={(e) => handleInputChange("specialty", e.target.value)}
                        required
                        className="bg-background/50"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Input
                        id="rating"
                        placeholder="e.g., 1850"
                        value={formData.rating}
                        onChange={(e) => handleInputChange("rating", e.target.value)}
                        className="bg-background/50"
                      />
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gmail">Gmail *</Label>
                        <Input
                          id="gmail"
                          type="email"
                          placeholder="email@gmail.com"
                          value={formData.gmail}
                          onChange={(e) => handleInputChange("gmail", e.target.value)}
                          required
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone *</Label>
                        <Input
                          id="phone"
                          placeholder="+880 1XXX-XXXXXX"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="https://linkedin.com/in/username"
                          value={formData.linkedin}
                          onChange={(e) => handleInputChange("linkedin", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                          id="github"
                          placeholder="https://github.com/username"
                          value={formData.github}
                          onChange={(e) => handleInputChange("github", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Programming Platforms */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Programming Platforms</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="codeforces">Codeforces</Label>
                        <Input
                          id="codeforces"
                          placeholder="username"
                          value={formData.codeforces}
                          onChange={(e) => handleInputChange("codeforces", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="codechef">CodeChef</Label>
                        <Input
                          id="codechef"
                          placeholder="username"
                          value={formData.codechef}
                          onChange={(e) => handleInputChange("codechef", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hackerrank">HackerRank</Label>
                        <Input
                          id="hackerrank"
                          placeholder="username"
                          value={formData.hackerrank}
                          onChange={(e) => handleInputChange("hackerrank", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="toph">Toph</Label>
                        <Input
                          id="toph"
                          placeholder="username"
                          value={formData.toph}
                          onChange={(e) => handleInputChange("toph", e.target.value)}
                          className="bg-background/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Approval Status */}
                  <div className="space-y-2">
                    <Label htmlFor="approveStatus">Approval Status *</Label>
                    <Select onValueChange={(value) => handleInputChange("approveStatus", value)} required>
                      <SelectTrigger className="bg-background/50">
                        <SelectValue placeholder="Select approval status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="not-approved">Not Approved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-4">
                  <Label>Profile Image *</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-48 w-48 object-cover rounded-lg"
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
                          <p className="text-foreground font-medium">Upload Profile Image</p>
                          <p className="text-sm text-muted-foreground">
                            Recommended: 400x400px, Max 2MB
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
                  Update Member Info
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}