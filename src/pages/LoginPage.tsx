import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { Button, Card, Input } from "@/components/ui/primitives";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
type Values = z.infer<typeof schema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "admin@uth.com", password: "123456" },
  });

  const onSubmit = async (values: Values) => {
    try {
      const session = await authService.login(values.email, values.password);
      setSession(session);
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Login failed");
    }
  };

  return (
    <div className="app-shell grid min-h-screen place-items-center p-4">
      <Card className="w-full max-w-md p-6 glass">
        <h1 className="text-2xl font-semibold">Welcome to CollabX</h1>
        <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
          Sign in to access your AI talent workspace.
        </p>
        <form className="mt-6 space-y-3" onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("email")} placeholder="Email" />
          {errors.email && (
            <p className="text-xs text-[hsl(var(--destructive))]">
              {errors.email.message}
            </p>
          )}
          <Input
            type="password"
            {...register("password")}
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-xs text-[hsl(var(--destructive))]">
              {errors.password.message}
            </p>
          )}
          <Button disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing in..." : "Login"}
          </Button>
        </form>
        <p className="mt-3 text-xs text-[hsl(var(--muted-foreground))]">
          Use: admin@uth.com / pm@uth.com / employee@uth.com with password
          123456.
        </p>
        <Link
          className="mt-3 block text-sm text-[hsl(var(--primary))]"
          to="/signup"
        >
          Create account
        </Link>
      </Card>
    </div>
  );
};

export default LoginPage;
