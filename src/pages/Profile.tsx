import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabaseClient';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  phone: z.string().min(1, 'Phone is required'),
  linkedin: z.string().optional(),
  github: z.string().optional(),
  codeforces: z.string().optional(),
  codechef: z.string().optional(),
  hackerrank: z.string().optional(),
  toph: z.string().optional(),
  profileImage: z.any().optional()
});

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const image = watch("profileImage");

  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (data) {
          setProfile(data);
          Object.keys(data).forEach(key => setValue(key, data[key]));
        }
      }
    };
    getProfile();
  }, [setValue]);

  const onSubmit = async (formData: any) => {
    if (!user) return;

    let imageUrl = profile?.image_url || '';

    if (formData.profileImage && formData.profileImage[0]) {
      const file = formData.profileImage[0];
      if (file.size > 200 * 1024) {
        alert("Image size must be less than 200KB");
        return;
      }

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${user.id}/profile.jpg`, file, { upsert: true });

      if (error) {
        alert("Upload error: " + error.message);
        return;
      }

      imageUrl = supabase.storage.from('avatars').getPublicUrl(`${user.id}/profile.jpg`).data.publicUrl;
    }

    const { error } = await supabase
      .from('profiles')
      .update({ ...formData, image_url: imageUrl })
      .eq('id', user.id);

    if (error) {
      alert('Update failed: ' + error.message);
    } else {
      alert('Profile updated successfully!');
    }
  };

  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-background to-muted/20 px-4">
      <div className="max-w-5xl mx-auto">
        <Card className="bg-[#42fff6]/20 backdrop-blur-xl text-white border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-white">My Profile</CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                {/* Left column */}
                {/* <div className="space-y-4">
                  <Label className="text-white">Name</Label>
                  <Input {...register("name")} className="bg-white/20 text-white" />
                  {errors.name?.message && (
                    <p className="text-red-500 text-sm">{errors.name.message}</p>
                  )}

                  <Label className="text-white">Phone</Label>
                  <Input {...register("phone")} className="bg-white/20 text-white" />
                  {errors.phone?.message && (
                    <p className="text-red-500 text-sm">{errors.phone.message}</p>
                  )}

                  <Label className="text-white">LinkedIn</Label>
                  <Input {...register("linkedin")} className="bg-white/20 text-white" />
                </div> */}

                {/* Middle column */}
                <div className="space-y-4">
                  <Label className="text-white">GitHub</Label>
                  <Input {...register("github")} className="bg-white/20 text-white" />

                  <Label className="text-white">Codeforces</Label>
                  <Input {...register("codeforces")} className="bg-white/20 text-white" />

                  <Label className="text-white">Codechef</Label>
                  <Input {...register("codechef")} className="bg-white/20 text-white" />
                </div>

                {/* Right column */}
                <div className="space-y-4">
                  <Label className="text-white">Hackerrank</Label>
                  <Input {...register("hackerrank")} className="bg-white/20 text-white" />

                  <Label className="text-white">Toph</Label>
                  <Input {...register("toph")} className="bg-white/20 text-white" />

                  <Label className="text-white">Profile Image (Max 200KB)</Label>
                  <Input type="file" accept="image/*" {...register("profileImage")} className="bg-white/20 text-white" />

                  {image && image[0] && (
                    <img
                      src={URL.createObjectURL(image[0])}
                      alt="Preview"
                      className="h-24 w-24 object-cover rounded-full border mt-2"
                    />
                  )}
                </div>
              </div>

              <div className="pt-6 text-center">
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Update Profile'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
