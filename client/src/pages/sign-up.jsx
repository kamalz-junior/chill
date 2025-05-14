import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Button, {} from "~/components/ui/button";
import Input from "~/components/ui/input";
import { createUser } from "~/lib/api";

export default function SignUp() {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createUser(user).then(()=> {
      navigate("/sign-in");
    })
  };


  return (
    <main className="flex h-dvh items-center justify-center bg-[url('images/bg-daftar.png')]">
      <div className="z-50 w-full max-w-sm space-y-6 rounded-xl border bg-zinc-800/80 p-6">
        <div className="space-y-2">
          <img src="images/Logo (1).png" alt="" className="mx-auto" />
          <h1 className="text-center font-medium text-xl">Masuk</h1>
          <p className="text-center text-muted-foreground text-sm">
            Selamat datang kembali!
          </p>
        </div>
        <form action="" className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="username" className="font-medium text-sm">
              Username
            </label>
            <Input
              id="username"
              defaultValue={user.username}
              placeholder="Masukan username"
              onChange={(e) =>
                setUser({
                  ...user,
                  username: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="font-medium text-sm">
              Kata Sandi
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Masukan kata sandi"
              defaultValue={user.password}
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="font-medium text-sm">
              Konfirmasi Kata Sandi
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Konfirmasi Masukan kata sandi"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs">Sudah Punya akun?</p>
            <Link to="/sign-in" className="text-xs">
              Masuk
            </Link>
          </div>
          <div className="space-y-2">
            <Button
              type="submit"
              className="w-full bg-zinc-500 hover:bg-zinc-600"
            >
              Daftar
            </Button>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t">
              <span className="relative z-1 px-2">atau</span>
            </div>
            <Button
              variant="ghost"
              className="w-full border hover:bg-zinc-800/20"
            >
              <img src="images/google-icon.png" alt="" />
              Masuk dengan Google
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
