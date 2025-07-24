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
import { Crown, Upload, Save, Eye, X, Edit2, Trash2 } from "lucide-react";
import { supabase } from "../../lib/supabaseClient"; // Adjust path to your supabase client

interface SeniorExecutive {
  id: number;
  name: string;
  designation: string;
  session: string;
  email: string;
  phone: string;
  image_url: string;
}

export function SeniorExecutives() {
  const [formData, setFormData] = useState<{
    id?: number;
    name: string;
    designation: string;
    session: string;
    email: string;
    phone: string;
    image: File | null;
  }>({
    name: "",
    designation: "",
    session: "",
    email: "",
    phone: "",
    image: null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [executives, setExecutives] = useState<SeniorExecutive[]>([]);

  // Fetch existing executives on mount
  useEffect(() => {
    fetchExecutives();
  }, []);

  async function fetchExecutives() {
    setLoading(true);
    const { data, error } = await supabase
      .from("senior_executives")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      alert("Error fetching executives: " + error.message);
    } else {
      setExecutives(data || []);
    }
    setLoading(false);
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  // Upload image to Supabase Storage, returns public URL or null on fail
  async function uploadImage(file: File) {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).slice(2)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("senior-executives-images")
      .upload(filePath, file, { upsert: true });

    if (uploadError) {
      alert("Image upload error: " + uploadError.message);
      return null;
    }

    // Get public URL
    const { data } = supabase.storage
      .from("senior-executives-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  }

  const resetForm = () => {
    setFormData({
      name: "",
      designation: "",
      session: "",
      email: "",
      phone: "",
      image: null,
    });
    setImagePreview("");
  };

  // Handle form submit - create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    let imageUrl = imagePreview;

    // If new image selected, upload it
    if (formData.image) {
      const uploadedUrl = await uploadImage(formData.image);
      if (!uploadedUrl) {
        setLoading(false);
        return; // Stop if upload failed
      }
      imageUrl = uploadedUrl;
    }

    try {
      if (formData.id) {
        // Update existing executive
        const { error } = await supabase
          .from("senior_executives")
          .update({
            name: formData.name,
            designation: formData.designation,
            session: formData.session,
            email: formData.email,
            phone: formData.phone,
            image_url: imageUrl,
          })
          .eq("id", formData.id);

        if (error) throw error;

        alert("Executive updated successfully");
      } else {
        // Insert new executive
        const { error } = await supabase.from("senior_executives").insert([
          {
            name: formData.name,
            designation: formData.designation,
            session: formData.session,
            email: formData.email,
            phone: formData.phone,
            image_url: imageUrl,
          },
        ]);

        if (error) throw error;

        alert("Executive added successfully");
      }

      resetForm();
      fetchExecutives();
    } catch (error: any) {
      alert("Error saving data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Load executive data into form for editing
  const handleEdit = (executive: SeniorExecutive) => {
    setFormData({
      id: executive.id,
      name: executive.name,
      designation: executive.designation,
      session: executive.session,
      email: executive.email,
      phone: executive.phone,
      image: null,
    });
    setImagePreview(executive.image_url);
  };

  // Delete executive by id
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this executive?")) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from("senior_executives")
        .delete()
        .eq("id", id);

      if (error) throw error;

      alert("Executive deleted successfully");
      if (formData.id === id) resetForm();
      fetchExecutives();
    } catch (error: any) {
      alert("Error deleting executive: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Senior Executives Management">
      <div className="space-y-6">
        {/* Form Card */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              {formData.id ? "Update Senior Executive Profile" : "Add Senior Executive Profile"}
            </CardTitle>
            <CardDescription>
              Manage senior executive profiles including contact information and designation details.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
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
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      placeholder="e.g., Senior Vice President"
                      value={formData.designation}
                      onChange={(e) => handleInputChange("designation", e.target.value)}
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
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
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
                            setFormData((prev) => ({ ...prev, image: null, id: undefined }));
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
                          required={!formData.id} // required if adding new
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
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {formData.id ? "Update Senior Executive" : "Add Senior Executive"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        {(formData.name || formData.designation || imagePreview) && (
          <Card className="bg-card/30 backdrop-blur border-border/30">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How this will appear on the website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-6">
                {imagePreview && (
                  <div className="flex-shrink-0">
                    <img
                      src={imagePreview}
                      alt="Profile"
                      className="h-32 w-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold text-foreground">
                    {formData.name || "Name"}
                  </h3>
                  <p className="text-primary font-medium">
                    {formData.designation || "Designation"}
                  </p>
                  <p className="text-muted-foreground">
                    Session: {formData.session || "Session"}
                  </p>
                  <p className="text-muted-foreground">
                    Email: {formData.email || "email@example.com"}
                  </p>
                  <p className="text-muted-foreground">
                    Phone: {formData.phone || "Phone"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* List of executives */}
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle>Existing Senior Executives</CardTitle>
            <CardDescription>Click Edit to update or Delete to remove.</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : executives.length === 0 ? (
              <p>No executives found.</p>
            ) : (
              <ul className="space-y-4">
                {executives.map((exec) => (
                  <li
                    key={exec.id}
                    className="flex items-center justify-between border border-border rounded-lg p-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={exec.image_url}
                        alt={exec.name}
                        className="h-16 w-16 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold">{exec.name}</h4>
                        <p className="text-sm">{exec.designation}</p>
                        <p className="text-xs text-muted-foreground">Session: {exec.session}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(exec)}
                        aria-label="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(exec.id)}
                        aria-label="Delete"
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
