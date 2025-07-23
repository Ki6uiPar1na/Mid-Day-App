import { useState } from "react";
import { AdminLayout } from "../AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trophy, Plus, Link as LinkIcon, Calendar, Clock } from "lucide-react";
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
    token: "",
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

  React.useEffect(() => {
    calculateDuration();
  }, [formData.startTime, formData.endTime]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleResourceChange = (index: number, value: string) => {
    const newResources = [...formData.learningResources];
    newResources[index] = value;
    setFormData(prev => ({
      ...prev,
      learningResources: newResources
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating contest:", formData);
    // Here you would make API call to create contest
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
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contestName">Contest Name *</Label>
                  <Input
                    id="contestName"
                    placeholder="e.g., JKKNIU Weekly Contest #15"
                    value={formData.contestName}
                    onChange={(e) => handleInputChange("contestName", e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Dynamic Programming, Graph Theory"
                    value={formData.topic}
                    onChange={(e) => handleInputChange("topic", e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              {/* Contest Type and Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contestType">Contest Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("contestType", value)} required>
                    <SelectTrigger className="bg-background/50">
                      <SelectValue placeholder="Select contest type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jkkniu-weekly">JKKNIU Weekly Contest</SelectItem>
                      <SelectItem value="jkkniu-monthly">JKKNIU Monthly Contest</SelectItem>
                      <SelectItem value="team-formation">Team Formation Contest</SelectItem>
                      <SelectItem value="weekly-long">Weekly Long Contest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="token">Status *</Label>
                  <Select onValueChange={(value) => handleInputChange("token", value)} required>
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
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select onValueChange={(value) => handleInputChange("difficulty", value)} required>
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

              {/* Learning Resources */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Learning Resources (2-3 links)</Label>
                {formData.learningResources.map((resource, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`resource-${index}`}>Resource {index + 1} {index < 2 ? "*" : ""}</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`resource-${index}`}
                        placeholder={`https://example.com/resource-${index + 1}`}
                        value={resource}
                        onChange={(e) => handleResourceChange(index, e.target.value)}
                        required={index < 2}
                        className="pl-10 bg-background/50"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Timing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startTime">Start Time *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="startTime"
                      type="datetime-local"
                      value={formData.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      required
                      className="pl-10 bg-background/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endTime">End Time *</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="endTime"
                      type="datetime-local"
                      value={formData.endTime}
                      onChange={(e) => handleInputChange("endTime", e.target.value)}
                      required
                      className="pl-10 bg-background/50"
                    />
                  </div>
                </div>
              </div>

              {/* Duration Display */}
              {duration && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="font-medium text-primary">Contest Duration:</span>
                    <span className="text-foreground">{duration}</span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Save as Draft
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Contest
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Contest Preview */}
        <Card className="bg-card/30 backdrop-blur border-border/30">
          <CardHeader>
            <CardTitle className="text-lg">Contest Preview</CardTitle>
            <CardDescription>How your contest will appear to participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-foreground">{formData.contestName || "Contest Name"}</h3>
                <p className="text-muted-foreground">{formData.topic || "Contest Topic"}</p>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {formData.contestType && (
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">
                    {formData.contestType.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                )}
                {formData.difficulty && (
                  <span className={`px-2 py-1 rounded text-sm ${
                    formData.difficulty === "easy" ? "bg-success/20 text-success" :
                    formData.difficulty === "medium" ? "bg-warning/20 text-warning" :
                    "bg-destructive/20 text-destructive"
                  }`}>
                    {formData.difficulty.charAt(0).toUpperCase() + formData.difficulty.slice(1)}
                  </span>
                )}
                {formData.token && (
                  <span className={`px-2 py-1 rounded text-sm ${
                    formData.token === "upcoming" ? "bg-info/20 text-info" :
                    formData.token === "active" ? "bg-success/20 text-success" :
                    "bg-muted/20 text-muted-foreground"
                  }`}>
                    {formData.token.charAt(0).toUpperCase() + formData.token.slice(1)}
                  </span>
                )}
              </div>
              
              {(formData.startTime || formData.endTime) && (
                <div className="text-sm text-muted-foreground">
                  {formData.startTime && <div>Starts: {new Date(formData.startTime).toLocaleString()}</div>}
                  {formData.endTime && <div>Ends: {new Date(formData.endTime).toLocaleString()}</div>}
                  {duration && <div>Duration: {duration}</div>}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

import React from "react";