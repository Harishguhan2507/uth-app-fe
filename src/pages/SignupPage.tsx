import { Link } from "react-router-dom";
import { Button, Card, Input } from "@/components/ui/primitives";

const SignupPage = () => (
  <div className="app-shell grid min-h-screen place-items-center p-4">
    <Card className="w-full max-w-md p-6 glass">
      <h1 className="text-2xl font-semibold">Create workspace access</h1>
      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">Mock signup page for demo flow.</p>
      <div className="mt-6 space-y-3">
        <Input placeholder="Name" />
        <Input placeholder="Work email" />
        <Input type="password" placeholder="Password" />
        <Button className="w-full">Create account</Button>
      </div>
      <Link className="mt-3 block text-sm text-[hsl(var(--primary))]" to="/login">Back to login</Link>
    </Card>
  </div>
);

export default SignupPage;