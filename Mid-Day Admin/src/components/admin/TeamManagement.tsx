import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Crown, Upload, Save, Eye } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TeamMemberForm {
  name: string;
  designation: string;
  session: string;
  email: string;
  phone: string;
  image: File | null;
}

export function TeamManagement() {
  const [seniorExecutiveData, setSeniorExecutiveData] = useState<TeamMemberForm>({
    name: "",
    designation: "",
    session: "",
    email: "",
    phone: "",
    image: null,
  });

  const [executiveData, setExecutiveData] = useState<TeamMemberForm>({
    name: "",
    designation: "",
    session: "",
    email: "",
    phone: "",
    image: null,
  });

  const [seniorImagePreview, setSeniorImagePreview] = useState<string>("");
  const [executiveImagePreview, setExecutiveImagePreview] = useState<string>("");

  const handleInputChange = (
    type: 'senior' | 'executive',
    field: keyof TeamMemberForm,
    value: string
  ) => {
    if (type === 'senior') {
      setSeniorExecutiveData(prev => ({ ...prev, [field]: value }));
    } else {
      setExecutiveData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageChange = (
    type: 'senior' | 'executive',
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (type === 'senior') {
          setSeniorExecutiveData(prev => ({ ...prev, image: file }));
          setSeniorImagePreview(result);
        } else {
          setExecutiveData(prev => ({ ...prev, image: file }));
          setExecutiveImagePreview(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (type: 'senior' | 'executive') => {
    const data = type === 'senior' ? seniorExecutiveData : executiveData;
    console.log(`Adding ${type} executive:`, data);
  };

  const TeamMemberForm = ({ 
    type, 
    data, 
    imagePreview, 
    onInputChange, 
    onImageChange, 
    onSubmit 
  }: {
    type: 'senior' | 'executive';
    data: TeamMemberForm;
    imagePreview: string;
    onInputChange: (field: keyof TeamMemberForm, value: string) => void;
    onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
  }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${type}-name`}>Name *</Label>
            <Input
              id={`${type}-name`}
              placeholder="Enter full name"
              value={data.name}
              onChange={(e) => onInputChange("name", e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${type}-designation`}>Designation *</Label>
            <Input
              id={`${type}-designation`}
              placeholder={type === 'senior' ? "e.g., President, Vice President" : "e.g., Secretary, Treasurer"}
              value={data.designation}
              onChange={(e) => onInputChange("designation", e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${type}-session`}>Session *</Label>
            <Input
              id={`${type}-session`}
              placeholder="e.g., 2020-2024"
              value={data.session}
              onChange={(e) => onInputChange("session", e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${type}-email`}>Email *</Label>
            <Input
              id={`${type}-email`}
              type="email"
              placeholder="email@example.com"
              value={data.email}
              onChange={(e) => onInputChange("email", e.target.value)}
              required
              className="bg-background/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${type}-phone`}>Phone *</Label>
            <Input
              id={`${type}-phone`}
              placeholder="+880 1XXX-XXXXXX"
              value={data.phone}
              onChange={(e) => onInputChange("phone", e.target.value)}
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
                    if (type === 'senior') {
                      setSeniorImagePreview("");
                      setSeniorExecutiveData(prev => ({ ...prev, image: null }));
                    } else {
                      setExecutiveImagePreview("");
                      setExecutiveData(prev => ({ ...prev, image: null }));
                    }
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
                  onChange={onImageChange}
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
          {type === 'senior' ? 'Add Senior Executive' : 'Add Executive'}
        </Button>
      </div>
    </form>
  );

  return (
    <AdminLayout title="Team Management">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5" />
              Executive Team Management
            </CardTitle>
            <CardDescription>
              Manage senior executives and executives profiles including their roles and contact information.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="senior" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="senior">Senior Executives</TabsTrigger>
                <TabsTrigger value="executive">Executives</TabsTrigger>
              </TabsList>

              <TabsContent value="senior" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="h-5 w-5 text-warning" />
                    <h3 className="text-lg font-semibold">Senior Executive Profile</h3>
                  </div>
                  <TeamMemberForm
                    type="senior"
                    data={seniorExecutiveData}
                    imagePreview={seniorImagePreview}
                    onInputChange={(field, value) => handleInputChange('senior', field, value)}
                    onImageChange={(e) => handleImageChange('senior', e)}
                    onSubmit={() => handleSubmit('senior')}
                  />
                </div>
              </TabsContent>

              <TabsContent value="executive" className="mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Crown className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold">Executive Profile</h3>
                  </div>
                  <TeamMemberForm
                    type="executive"
                    data={executiveData}
                    imagePreview={executiveImagePreview}
                    onInputChange={(field, value) => handleInputChange('executive', field, value)}
                    onImageChange={(e) => handleImageChange('executive', e)}
                    onSubmit={() => handleSubmit('executive')}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}