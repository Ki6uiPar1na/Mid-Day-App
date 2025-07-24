import { useEffect, useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shield, Upload, Save, Eye, Trash2, Pencil } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export function Executives() {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    session: "",
    email: "",
    phone: "",
    image: null as File | null,
  });

  const [imagePreview, setImagePreview] = useState<string>("");
  const [executives, setExecutives] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchExecutives();
  }, []);

  const fetchExecutives = async () => {
    const { data, error } = await supabase.from("executives").select("*").order("created_at", { ascending: false });
    if (error) alert(error.message);
    else setExecutives(data);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = "";

    try {
      if (formData.image) {
        const fileExt = formData.image.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: imageError } = await supabase.storage
          .from("executive-images")
          .upload(fileName, formData.image);

        if (imageError) throw new Error("Image upload failed: " + imageError.message);

        const { data: publicUrlData } = supabase.storage.from("executive-images").getPublicUrl(fileName);
        imageUrl = publicUrlData.publicUrl;
      }

      if (editingId) {
        const { error } = await supabase.from("executives").update({
          name: formData.name,
          designation: formData.designation,
          session: formData.session,
          email: formData.email,
          phone: formData.phone,
          ...(imageUrl && { image_url: imageUrl })
        }).eq("id", editingId);

        if (error) throw error;
        alert("Executive updated successfully");
      } else {
        const { error } = await supabase.from("executives").insert([{
          name: formData.name,
          designation: formData.designation,
          session: formData.session,
          email: formData.email,
          phone: formData.phone,
          image_url: imageUrl,
        }]);

        if (error) throw error;
        alert("Executive added successfully");
      }

      setFormData({ name: "", designation: "", session: "", email: "", phone: "", image: null });
      setImagePreview("");
      setEditingId(null);
      fetchExecutives();

    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  const handleEdit = (executive: any) => {
    setFormData({
      name: executive.name,
      designation: executive.designation,
      session: executive.session,
      email: executive.email,
      phone: executive.phone,
      image: null,
    });
    setImagePreview(executive.image_url);
    setEditingId(executive.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this executive?")) return;
    const { error } = await supabase.from("executives").delete().eq("id", id);
    if (error) alert(error.message);
    else {
      alert("Deleted successfully");
      fetchExecutives();
    }
  };

  return (
    <AdminLayout title="Executives Management">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {editingId ? "Edit Executive" : "Add Executive"}
            </CardTitle>
            <CardDescription>
              {editingId ? "Update executive info" : "Create a new executive profile"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {['name', 'designation', 'session', 'email', 'phone'].map(field => (
                    <div key={field} className="space-y-2">
                      <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)} *</Label>
                      <Input
                        id={field}
                        placeholder={`Enter ${field}`}
                        value={(formData as any)[field]}
                        onChange={(e) => handleInputChange(field, e.target.value)}
                        required
                        className="bg-background/50"
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <Label>Profile Image {editingId ? '' : '*'}</Label>
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
                        <p className="text-foreground font-medium">Upload Profile Image</p>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="bg-background/50"
                          required={!editingId}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Save className="h-4 w-4 mr-2" />
                  {editingId ? "Update Executive" : "Add Executive"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/30">
          <CardHeader>
            <CardTitle>All Executives</CardTitle>
            <CardDescription>Manage or delete executive members below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {executives.map((exec) => (
              <div key={exec.id} className="flex items-center justify-between border p-4 rounded-lg bg-card/30">
                <div className="flex items-center gap-4">
                  <img src={exec.image_url} alt="" className="w-16 h-16 rounded object-cover" />
                  <div>
                    <h3 className="font-bold text-lg">{exec.name}</h3>
                    <p className="text-sm text-muted-foreground">{exec.designation}</p>
                    <p className="text-sm text-muted-foreground">{exec.session}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(exec)}>
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(exec.id)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
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
