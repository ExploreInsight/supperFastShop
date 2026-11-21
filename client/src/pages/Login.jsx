import { useState } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import AuthShell from "../components/auth/AuthShell";
import TextField from "../components/ui/TextField";
import Btn from "../components/ui/Btn";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useUserStore();

  return (
    <AuthShell title="Log in" footer={<>New here? <Link to="/signup" className="font-bold underline underline-offset-4">Create an account</Link></>}>
      <form onSubmit={(e) => { e.preventDefault(); login({ email, password }); }} className="space-y-4">
        <TextField label="Email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <TextField label="Password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <Btn type="submit" variant="sticker" busy={loading} className="w-full text-3xl py-3.5">Log in</Btn>
      </form>
    </AuthShell>
  );
};

export default LoginPage;
