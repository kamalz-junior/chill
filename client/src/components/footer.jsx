import { useEffect, useState } from "react";
import Accordion from "~/components/ui/accordion";
import { genres } from "~/constants/genres";
import { useIsMobile } from "~/hooks/use-mobile";
import { getGenreList } from "~/lib/tmdb";

export default function Footer() {
  const [genres, setGenres] = useState([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    getGenreList("movie").then((res) => {
      setGenres(res);
    });
  }, []);

  return (
    <footer className="w-full py-8">
      <div className="container space-y-6 md:flex md:justify-between">
        <div className="space-y-2">
          <span className="font-bold text-lg">
            <img src="images/Logo (1).png" alt="" />
          </span>
          <p className="text-muted-foreground text-sm">
            2025. All rights reserved.
          </p>
        </div>

        {isMobile ? (
          <>
            <Accordion label="Genre">
              <ul className="grid grid-cols-2 gap-x-8 md:grid-cols-3">
                {genres.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`/genre/${g.id}`}
                      className="inline-block py-1 font-medium text-muted-foreground text-sm hover:text-foreground"
                    >
                      {g.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Accordion>
            <Accordion label="Help">
              <ul>
                {helps.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block py-1 font-medium text-muted-foreground text-sm hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Accordion>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <h3 className="flex w-full items-center justify-between font-medium text-sm">
                Genre
              </h3>
              <ul className="grid grid-cols-2 gap-x-8 md:grid-cols-3">
                {genres.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`/genre/${g.id}`}
                      className="inline-block py-1 font-medium text-muted-foreground text-sm hover:text-foreground"
                    >
                      {g.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="flex w-full items-center justify-between font-medium text-sm">
                Help
              </h3>
              <ul>
                {helps.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="inline-block py-1 font-medium text-muted-foreground text-sm hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </footer>
  );
}

const helps = [
  { label: "Faq", href: "/" },
  { label: "Contact", href: "/" },
  { label: "Privacy", href: "/" },
  { label: "Terms and Conditions", href: "/" },
];
