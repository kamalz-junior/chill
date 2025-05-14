import { useState } from "react";
import { Link, NavLink } from "react-router";
import { button } from "~/components/ui/button";
import UserNav from "~/components/user-nav";

export default function Navbar() {
  const [_isOpen, _setIsOpen] = useState(false);

  return (
    <header className="w-full py-4">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-x-2 md:gap-x-10">
          <Link to="/">
            <span className="font-bold">
              <img src="images/Logo (1).png" alt="" className="w-14 md:w-20" />
            </span>
          </Link>
          <nav className="flex items-center">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.href}
                className={({ isActive }) =>
                  button({
                    variant: "ghost",
                    size: "sm",
                    className: `${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"} text-xs md:text-sm`,
                  })
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <UserNav />
      </div>
    </header>
  );
}

const links = [
  { href: "/series", label: "Series" },
  { href: "/movies", label: "Movies" },
  { href: "/watchlist", label: "Watchlist" },
];
