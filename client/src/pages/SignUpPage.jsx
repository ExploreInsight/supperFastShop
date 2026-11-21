import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import AuthShell from "../components/auth/AuthShell";
import TextField from "../components/ui/TextField";
import Btn from "../components/ui/Btn";

const SignUpPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const { signup, loading } = useUserStore();
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <AuthShell title="Sign up" footer={<>Have an account? <Link to="/login" className="font-bold underline underline-offset-4">Log in</Link></>}>
      <form onSubmit={(e) => { e.preventDefault(); signup(form); }} className="space-y-4">
        <TextField label="Name" autoComplete="name" required value={form.name} onChange={set("name")} />
        <TextField label="Email" type="email" autoComplete="email" required value={form.email} onChange={set("email")} />
        <TextField label="Password" type="password" autoComplete="new-password" minLength={6} required hint="At least 6 characters" value={form.password} onChange={set("password")} />
        <TextField label="Confirm password" type="password" autoComplete="new-password" required value={form.confirmPassword} onChange={set("confirmPassword")} />
        <Btn type="submit" variant="sticker" busy={loading} className="w-full text-3xl py-3.5">Create account</Btn>
      </form>
    </AuthShell>
  );
};

export default SignUpPage;
