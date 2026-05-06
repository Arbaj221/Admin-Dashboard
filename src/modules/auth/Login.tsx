import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { useEffect, useState } from "react";

import FullLogo from "src/assets/images/logos/FullLogo";
import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { usePermissionContext } from 'src/permissions/PermissionContext';

import { authService } from "./services/authService";

const REMEMBER_KEY = "remembered_email";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loadPermissions } = usePermissionContext();

  const [loading, setLoading] = useState(false);
  const [remembered, setRemembered] = useState(false);
  const [email, setEmail] = useState("");

  const from = location.state?.from?.pathname || "/";

  // ✅ On mount — prefill email if remembered
  useEffect(() => {
    const savedEmail = localStorage.getItem(REMEMBER_KEY);
    if (savedEmail) {
      setEmail(savedEmail);
      setRemembered(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const emailVal = formData.get("email") as string;
    const password = formData.get("password") as string;

    // ✅ Remember me logic
    if (remembered) {
      localStorage.setItem(REMEMBER_KEY, emailVal);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }

    try {
      setLoading(true);

      const data = await authService.login({
        username: emailVal,
        password,
      });

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("name", data.user.first_name);
      sessionStorage.setItem("isAuth", "true");

      const access = await authService.getUserAccess();
      loadPermissions(access.permissions);

      toast.info(`Welcome back, ${data.user.first_name}. You're all set.`);
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
      <div
        className="hidden md:flex w-3/5 items-center justify-center p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(145deg, #1a2540 0%, #1e3a5f 60%, #1a2e4a 100%)" }}
      >
        <div className="absolute" style={{ width: 460, height: 460, borderRadius: "50%", border: "1px solid rgba(93,135,255,0.12)", top: -100, left: -120 }} />
        <div className="absolute" style={{ width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(93,135,255,0.08)", top: 40, left: -30 }} />
        <div className="absolute" style={{ width: 520, height: 520, borderRadius: "50%", border: "1px solid rgba(73,190,255,0.07)", bottom: -200, right: -140 }} />
        <div className="absolute" style={{ width: 160, height: 160, borderRadius: "50%", background: "rgba(93,135,255,0.06)", bottom: 80, left: 50 }} />
        <div className="absolute" style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(73,190,255,0.08)", top: 130, right: 90 }} />
        <div className="absolute" style={{ width: 120, height: 120, borderRadius: 20, border: "1px solid rgba(93,135,255,0.1)", top: 220, left: 70, transform: "rotate(18deg)" }} />

        {/* Content */}
        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-3xl font-bold mb-3" style={{ color: "rgba(255,255,255,0.92)" }}>
            Manage your business smarter
          </h2>
          <p className="mb-8 text-sm" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}>
            One platform for clients, campaigns, leads, and your entire team workflow.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-col gap-3 mb-8">
            {[
              { icon: "📊", title: "Real-time analytics", desc: "Track campaign delivery and performance live" },
              { icon: "🔒", title: "Role-based access", desc: "Fine-grained permissions per module and action" },
              { icon: "⚡", title: "Fast & reliable", desc: "Built for teams that move quickly" },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-center gap-4 text-left"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(10px)",
                  WebkitBackdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "14px 18px",
                }}
              >
                <span style={{ fontSize: 20, lineHeight: 1 }}>{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.85)" }}>{f.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Random quote */}
          {(() => {
            const quotes = [
              { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
              { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
              { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
              { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
              { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
              { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
              { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
            ];
            const q = quotes[Math.floor(Math.random() * quotes.length)];
            return (
              <div
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  padding: "20px 24px",
                  textAlign: "left",
                }}
              >
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 10 }}>
                  "{q.text}"
                </p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>
                  — {q.author}
                </p>
              </div>
            );
          })()}
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-2/5 flex items-center justify-center px-6 bg-background relative overflow-hidden">

        {/* Subtle bg shapes on right side */}
        <div
          className="absolute pointer-events-none"
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "color-mix(in oklab, #5d87ff 6%, transparent)",
            top: -80,
            right: -80,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "color-mix(in oklab, #49beff 5%, transparent)",
            bottom: -60,
            left: -60,
          }}
        />

        <div className="w-full max-w-md relative z-10">
          <div className="mb-8">
            <FullLogo />
          </div>

          <h2 className="text-2xl font-semibold mb-2">Welcome Back 👋</h2>
          <p className="text-muted-foreground mb-6">Sign in to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="mt-2"
              />
            </div>

            <div className="flex justify-between items-center my-5">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={remembered}
                  onCheckedChange={(v) => setRemembered(!!v)}
                />
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