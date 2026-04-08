import { Link, useNavigate } from "react-router";
import FullLogo from "src/assets/images/logos/FullLogo";

import { Button } from "src/components/ui/button";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("isAuth", "true");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SIDE - INFO (CRM STYLE) */}
      <div className="hidden md:flex w-3/5 bg-lightprimary items-center justify-center p-10">
        <div className="max-w-md">
          <h2 className="text-3xl font-bold mb-4">
            Start growing your CRM today 📊
          </h2>
          <p className="text-bodytext mb-6">
            Manage leads, track sales, and build stronger customer
            relationships — all in one powerful platform.
          </p>

          <ul className="space-y-3 text-sm text-surface">
            <li>✔ Manage customer data efficiently</li>
            <li>✔ Track deals and sales pipeline</li>
            <li>✔ Get real-time insights & analytics</li>
            <li>✔ Collaborate with your team</li>
          </ul>

          <div className="mt-8 bg-white/40 backdrop-blur-md rounded-xl p-5 shadow-md">
            <p className="text-sm">
              “This CRM helped us increase conversions by 40% in just 3 months.”
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="w-full md:w-2/5 flex items-center justify-center px-6 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-8">
            <FullLogo />
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-semibold mb-2">
            Create your account 🚀
          </h2>
          <p className="text-muted-foreground mb-6">
            Get started with your CRM in minutes
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" required className="mt-2" />
            </div>

            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required className="mt-2" />
            </div>

            <div className="mb-6">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required className="mt-2" />
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <div className="flex gap-2 text-sm mt-6 justify-center">
            <p className="text-muted-foreground">Already have an account?</p>
            <Link to="/login" className="text-primary font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;