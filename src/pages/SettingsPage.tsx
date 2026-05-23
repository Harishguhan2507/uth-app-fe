import { Card, Input } from "@/components/ui/primitives";

const SettingsPage = () => (
  <Card className="max-w-2xl p-4">
    <h2 className="text-lg font-semibold">Settings</h2>
    <div className="mt-4 space-y-3">
      <Input placeholder="Organization name" defaultValue="UTH Internal" />
      <Input placeholder="Default AI model" defaultValue="Mock Talent Intelligence v2" />
      <Input placeholder="Notification email" defaultValue="alerts@uth.com" />
    </div>
  </Card>
);

export default SettingsPage;