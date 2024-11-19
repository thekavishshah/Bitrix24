"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Bell,
  Cog,
  CreditCard,
  Lock,
  LogOut,
  Mail,
  Smartphone,
  User,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EnhancedUserProfile() {
  const { toast } = useToast();
  const [user, setUser] = useState({
    name: "Alice Johnson",
    email: "alice@example.com",
    bio: "Product designer and dog lover. Always learning.",
    avatar: "https://i.pravatar.cc/150?img=5",
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    profileVisibility: "public",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSettingChange = (setting: string, value: boolean | string) => {
    setSettings({ ...settings, [setting]: value });
  };

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile changes have been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <aside className="w-full md:w-64">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Menu</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <nav className="space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Lock className="mr-2 h-4 w-4" />
                  Privacy
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Billing
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  className="w-full justify-start text-red-500 hover:bg-red-100 hover:text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </aside>
        <main className="flex-1">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="profile">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      name="bio"
                      value={user.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself"
                      className="resize-none"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Display Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={user.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="account" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Account Security</h3>
                    <Button variant="outline">Change Password</Button>
                    <Button variant="outline">
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      Connected Accounts
                    </h3>
                    <Button variant="outline">Connect to Google</Button>
                    <Button variant="outline">Connect to Facebook</Button>
                  </div>
                </TabsContent>
                <TabsContent value="settings" className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4" />
                        <Label htmlFor="email-notifications">
                          Email Notifications
                        </Label>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) =>
                          handleSettingChange("emailNotifications", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Smartphone className="h-4 w-4" />
                        <Label htmlFor="push-notifications">
                          Push Notifications
                        </Label>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) =>
                          handleSettingChange("pushNotifications", checked)
                        }
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Privacy</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Lock className="h-4 w-4" />
                        <Label>Profile Visibility</Label>
                      </div>
                      <select
                        value={settings.profileVisibility}
                        onChange={(e) =>
                          handleSettingChange(
                            "profileVisibility",
                            e.target.value,
                          )
                        }
                        className="rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                        <option value="friends">Friends Only</option>
                      </select>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} className="ml-auto">
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}
