import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload, Save, Eye, Calendar } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      alert("Please upload a file.");
      return;
    }

    try {
      const fileExt = formData.file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${formData.category.toLowerCase()}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("gallery-media")
        .upload(filePath, formData.file);

      if (uploadError) {
        throw new Error("File upload failed: " + uploadError.message);
      }

      const { data: publicUrlData } = supabase.storage
        .from("gallery-media")
        .getPublicUrl(filePath);

      const fileUrl = publicUrlData?.publicUrl;

      // Insert into database
      const { error: insertError } = await supabase.from("gallery").insert([
        {
          category: formData.category,
          section: formData.section,
          date: formData.date,
          title: formData.title,
          short_description: formData.shortDescription,
          file_url: fileUrl,
        },
      ]);

      if (insertError) {
        throw new Error("Insert failed: " + insertError.message);
      }

      alert("Gallery item uploaded successfully!");

      setFormData({
        category: "",
        section: "",
        date: "",
        title: "",
        shortDescription: "",
        file: null,
      });
      setFilePreview("");
    } catch (err: any) {
      alert(err.message || "Something went wrong.");
    }
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
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Category *</Label>
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
                    <Label>Section *</Label>
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
                    <Label>Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                        className="bg-background/50 pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Title *</Label>
                    <Input
                      placeholder="Enter media title"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      required
                      className="bg-background/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Short Description *</Label>
                    <Textarea
                      placeholder="Write a short description..."
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      required
                      rows={4}
                      className="bg-background/50"
                    />
                  </div>
                </div>

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
                            setFormData((prev) => ({ ...prev, file: null }));
                          }}
                        >
                          Remove File
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                        <p className="text-foreground font-medium">
                          Upload {isVideo ? "Video" : "Image"} File
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {isVideo ? "MP4, max 50MB" : "JPG/PNG, max 5MB"}
                        </p>
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
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  Add to Gallery
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
