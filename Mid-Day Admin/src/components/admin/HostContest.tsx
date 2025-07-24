import React, { useState, useEffect } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, Plus, Link as LinkIcon, Calendar, Clock } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function HostContest() {
  const [formData, setFormData] = useState({
    contestName: "",
    topic: "",
    contestType: "",
    status: "",
    difficulty: "",
    learningResources: ["", "", ""],
    startTime: "",
    endTime: "",
  });

  const [duration, setDuration] = useState("");

  const calculateDuration = () => {
    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);
      const diff = end.getTime() - start.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        let durationText = "";
        if (days > 0) durationText += `${days}d `;
        if (hours > 0) durationText += `${hours}h `;
        if (minutes > 0) durationText += `${minutes}m`;
        setDuration(durationText.trim() || "0m");
      } else {
        setDuration("Invalid duration");
      }
    } else {
      setDuration("");
    }
  };

  useEffect(() => {
    calculateDuration();
  }, [formData.startTime, formData.endTime]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleResourceChange = (index: number, value: string) => {
    const newResources = [...formData.learningResources];
    newResources[index] = value;
    setFormData((prev) => ({ ...prev, learningResources: newResources }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("contests").insert([
        {
          contest_name: formData.contestName,
          topic: formData.topic,
          contest_type: formData.contestType,
          status: formData.status,
          difficulty: formData.difficulty,
          learning_resources: formData.learningResources,
          start_time: formData.startTime,
          end_time: formData.endTime,
        },
      ]);
      if (error) throw error;

      alert("Contest created successfully!");

      setFormData({
        contestName: "",
        topic: "",
        contestType: "",
        status: "",
        difficulty: "",
        learningResources: ["", "", ""],
        startTime: "",
        endTime: "",
      });
      setDuration("");
    } catch (err: any) {
      console.error("Error creating contest:", err);
      alert("Error creating contest: " + err.message);
    }
  };

  return (
    <AdminLayout title="Host a Contest">
      <div className="space-y-6">
        <Card className="bg-card/50 backdrop-blur border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Create New Contest
            </CardTitle>
            <CardDescription>
              Set up a new programming contest with all necessary details and resources.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Contest Name *</Label>
                  <Input
                    placeholder="e.g., JKKNIU Weekly Contest #15"
                    value={formData.contestName}
                    onChange={(e) => handleInputChange("contestName", e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Topic *</Label>
                  <Input
                    placeholder="e.g., Graph Theory"
                    value={formData.topic}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Contest Type, Status, Difficulty */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label>Contest Type *</Label>
                  <Select onValueChange={(v) => handleInputChange("contestType", v)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select contest type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jkkniu-weekly">JKKNIU Weekly</SelectItem>
                      <SelectItem value="jkkniu-monthly">JKKNIU Monthly</SelectItem>
                      <SelectItem value="team-formation">Team Formation</SelectItem>
                      <SelectItem value="weekly-long">Weekly Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Status *</Label>
                  <Select onValueChange={(v) => handleInputChange("status", v)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="ended">Ended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Difficulty *</Label>
                  <Select onValueChange={(v) => handleInputChange("difficulty", v)}>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <Label>Learning Resources (2-3 links)</Label>
                {formData.learningResources.map((link, idx) => (
                  <div key={idx} className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10 bg-background/50"
                      placeholder={`https://example.com/resource-${idx + 1}`}
                      value={link}
                      onChange={(e) => handleResourceChange(idx, e.target.value)}
                      required={idx < 2}
                    />
                  </div>
                ))}
              </div>

              {/* Timing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Start Time *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="datetime-local"
                      className="pl-10 bg-background/50"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>End Time *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="datetime-local"
                      className="pl-10 bg-background/50"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange("endTime", e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Duration */}
              {duration && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium text-primary">Contest Duration:</span>
                    <span className="text-foreground">{duration}</span>
                  </div>
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-end space-x-4">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Contest
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
