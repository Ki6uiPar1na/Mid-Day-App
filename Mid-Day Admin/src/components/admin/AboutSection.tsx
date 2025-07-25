import { useEffect, useState } from "react";
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
import { Info, Upload, Save, Eye, Trash2, Pencil } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

export function AboutSection() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    speech: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [aboutList, setAboutList] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchAbouts = async () => {
      const { data, error } = await supabase
        .from("about_section")
        .select("*")
        .order("id", { ascending: false });
      if (!error) setAboutList(data);
    };
    fetchAbouts();
  }, [refresh]);

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    const { error } = await supabase.from("about_section").delete().eq("id", id);
    if (error) {
      setMessage(`Error deleting record: ${error.message}`);
    } else {
      setMessage("Record deleted successfully.");
      setRefresh(prev => !prev);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onload = e => setImagePreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = imagePreview;

      if (formData.image) {
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = fileName;

        const { error: uploadError } = await supabase.storage
          .from('about-images')
          .upload(filePath, formData.image);

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from('about-images')
          .getPublicUrl(filePath);

        if (!publicUrlData?.publicUrl) throw new Error('Failed to get public URL');

        imageUrl = publicUrlData.publicUrl;
      }

      if (editingId) {
        const { error: updateError } = await supabase
          .from("about_section")
          .update({
            name: formData.name,
            designation: formData.designation,
            speech: formData.speech,
            image_url: imageUrl,
          })
          .eq("id", editingId);

        if (updateError) throw updateError;
        setMessage("About entry updated successfully.");
      } else {
        const { error: insertError } = await supabase.from("about_section").insert([
            {
              name: formData.name,
              designation: formData.designation,
              speech: formData.speech,
              image_url: imageUrl,
            }
          ]);


        if (insertError) throw insertError;
        setMessage("About section created successfully!");
      }

      setFormData({ name: "", designation: "", speech: "", image: null });
      setImagePreview("");
      setEditingId(null);
      setRefresh(prev => !prev);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="About Section Management">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Update About Section
            </CardTitle>
            <CardDescription>Manage leadership profiles and information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <Label>Name *</Label>
                  <Input
                    placeholder="Full name"
                    value={formData.name}
                    onChange={e => handleInputChange("name", e.target.value)}
                    required
                  />
                  <Label>Designation *</Label>
                  <Input
                    placeholder="Designation"
                    value={formData.designation}
                    onChange={e => handleInputChange("designation", e.target.value)}
                    required
                  />
                  <Label>Speech/Message *</Label>
                  <Textarea
                    placeholder="Speech content..."
                    rows={6}
                    value={formData.speech}
                    onChange={e => handleInputChange("speech", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-4">
                  <Label>Profile Image *</Label>
                  <div className="border-2 border-dashed p-4 rounded-lg text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="mx-auto h-40 w-40 object-cover rounded-lg"
                        />
                        <Button type="button" onClick={() => {
                          setImagePreview("");
                          setFormData(prev => ({ ...prev, image: null }));
                        }}>Remove</Button>
                      </div>
                    ) : (
                      <>
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          required={!editingId}
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                {editingId && (
                  <Button type="button" variant="outline" onClick={() => {
                    setEditingId(null);
                    setFormData({ name: "", designation: "", speech: "", image: null });
                    setImagePreview("");
                  }}>Cancel Edit</Button>
                )}
                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {editingId ? "Update" : "Create"}
                </Button>
              </div>
              {message && <p className="text-center mt-2 text-sm text-muted-foreground">{message}</p>}
            </form>
          </CardContent>
        </Card>

        {/* List */}
        <Card>
          <CardHeader>
            <CardTitle>All Entries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aboutList.map(item => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded">
                <div className="flex items-center gap-4">
                  <img
                    src={item.image_url}
                    className="h-16 w-16 object-cover rounded"
                    alt={item.name}
                  />
                  <div>
                    <h4 className="font-bold">{item.name}</h4>
                    <p className="text-sm">{item.designation}</p>
                    <p className="text-xs text-muted-foreground max-w-xs truncate">{item.speech}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => {
                    setEditingId(item.id);
                    setFormData({
                      name: item.name,
                      designation: item.designation,
                      speech: item.speech,
                      image: null,
                    });
                    setImagePreview(item.image_url);
                  }}>
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
