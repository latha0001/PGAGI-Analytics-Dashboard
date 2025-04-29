"use client";

import { Card } from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="w-6 h-6" />
        <h1 className="text-2xl font-semibold">Settings</h1>
      </div>
      
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">Dashboard Settings</h2>
        <p className="text-muted-foreground">
          Settings configuration options will be available soon.
        </p>
      </Card>
    </div>
  );
}