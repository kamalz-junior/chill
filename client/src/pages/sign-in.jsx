import { Link, useNavigate } from "react-router";
import Button, {} from "~/components/ui/button";
import Input from "~/components/ui/input";
import { signIn } from "~/lib/actions";
import { useUser } from "~/lib/store";

export default function SignIn() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signIn(user).then((res) => {
      if (!res) return;

      setUser(res);
      navigate("/");
    });
  };

  return (
    <main className="flex h-dvh items-center justify-center bg-[url('images/bg-masuk.png')]">
      <div className="z-50 w-full max-w-sm space-y-6 rounded-xl border bg-zinc-800/80 p-6">
        <div className="space-y-2">
          <img src="images/Logo (1).png" alt="" className="mx-auto" />
          <h1 className="text-center font-medium text-xl">Masuk</h1>
          <p className="text-center text-muted-foreground text-sm">
            Selamat datang kembali!
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <label htmlFor="username" className="font-medium text-sm">
              Username
            </label>
            <Input
              id="username"
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
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Masukan kata sandi"
              onChange={(e) =>
                setUser({
                  ...user,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs">Belum Punya akun?</p>
            <Link to="/sign-up" className="text-xs">
              Daftar
            </Link>
          </div>
          <div className="space-y-2">
            <Button
              type="submit"
              className="w-full bg-zinc-500 hover:bg-zinc-600"
            >
              Masuk
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
