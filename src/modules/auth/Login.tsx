import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";

import FullLogo from "src/assets/images/logos/FullLogo";
import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { usePermissionContext } from 'src/permissions/PermissionContext';

import { authService } from "./services/authService";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loadPermissions } = usePermissionContext();

  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      setLoading(true);

      const data = await authService.login({
        username: email,
        password,
      });

      // ✅ store token
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("is_auth", "true");

      // ✅ 🚀 LOAD USER ACCESS
      const access = await authService.getUserAccess();

      loadPermissions(access.permissions);

      // ✅ success toast
      toast.success("Welcome back! 🎉");

      navigate(from, { replace: true });

    } catch (err) {
      // handled globally
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-3/5 bg-lightprimary items-center justify-center p-10">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">
            Manage your business smarter 🚀
          </h2>
          <p className="text-bodytext mb-6">
            Access powerful tools, analytics, and insights to grow your business.
          </p>

          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-md">
            <p className="text-sm text-dark">
              “This dashboard changed how we work.”
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-2/5 flex items-center justify-center px-6 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <FullLogo />
          </div>

          <h2 className="text-2xl font-semibold mb-2">Welcome Back 👋</h2>
          <p className="text-muted-foreground mb-6">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required className="mt-2" />
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required className="mt-2" />
            </div>

            <div className="flex justify-between items-center my-5">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-normal">
                  Remember me
                </Label>
              </div>

              <Link to="/" className="text-primary text-sm font-medium">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-6 justify-center">
            <p className="text-muted-foreground">New here?</p>
            <Link to="/register" className="text-primary font-medium">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;