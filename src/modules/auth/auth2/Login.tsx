import { Link, useNavigate } from "react-router";
import FullLogo from "src/assets/images/logos/FullLogo";

import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("isAuth", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - FORM */}
      <div className="hidden md:flex w-3/5 bg-lightprimary items-center justify-center p-10">
        <div className="max-w-md text-center">
          <h2 className="text-3xl font-bold mb-4">
            Manage your business smarter 🚀
          </h2>
          <p className="text-bodytext mb-6">
            Access powerful tools, analytics, and insights to grow your
            business faster and more efficiently.
          </p>

          <div className="bg-white/40 backdrop-blur-md rounded-xl p-6 shadow-md">
            <p className="text-sm text-dark">
              “This dashboard completely changed how we manage our workflow.
              Everything is faster and more organized.”
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - INFO PANEL */}
      <div className="w-full md:w-2/5 flex items-center justify-center px-6 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <FullLogo />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold mb-2">Welcome Back 👋</h2>
          <p className="text-muted-foreground mb-6">
            Sign in to continue to your dashboard
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="mt-2" />
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="mt-2" />
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

            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          {/* Footer */}
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