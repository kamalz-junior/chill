import { Gem, LogOut, User } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import Button, { button } from "~/components/ui/button";
import useClickOutside from "~/hooks/use-click-outside";
import { API_URL } from "~/lib/api";
import { useUser } from "~/lib/store";

export default function UserNav() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const ref = useClickOutside(() => setIsOpen(false));

  return (
    <div ref={ref} className="relative">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full"
      >
        <img src={`${API_URL}/uploads${user.avatar_path}`} alt={user.name} className="rounded-full w-9 h-9 object-cover absolute"/>
      </Button>

      {isOpen ? (
        <div className="absolute right-0 z-50 mt-2 w-[200px] rounded-md border bg-card p-2">
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                button({
                  variant: "ghost",
                  size: "sm",
                  className: `${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"} w-full justify-start rounded-sm`,
                })
              }
            >
              {link.icon} {link.label}
            </NavLink>
          ))}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              navigate("/sign-in");
            }}
            className="w-full justify-start rounded-sm text-muted-foreground"
          >
            <LogOut className="size-4" />
            Sign out
          </Button>
        </div>
      ) : null}
    </div>
  );
}

const links = [
  { href: "/profile", label: "Profile", icon: <User className="size-4" /> },

  {
    href: "/premium",
    label: "Subscription",
    icon: <Gem className="size-4" />,
  },
];
