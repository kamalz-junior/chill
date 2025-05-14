import { Navigate, Outlet } from "react-router";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";
import { useUser } from "~/lib/store";

export default function UserLayout() {
  const { user } = useUser();

  if (!user || !user.id) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
