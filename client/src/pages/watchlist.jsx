import { useEffect, useState } from "react";
import PosterCard from "~/components/poster-card";
import { getWatchlist } from "~/lib/tmdb";

export default function Watchlist() {
  const [isLoading, setIsLoading] = useState(true);
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesWatchlistRes, tvWatchlistRes] = await Promise.all([
          getWatchlist("movies"),
          getWatchlist("tv"),
        ]);

        setWatchlist([
          ...moviesWatchlistRes.results,
          ...tvWatchlistRes.results,
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return;

  return (
    <main className="container space-y-8 py-8">
      <h1 className="font-medium text-2xl">Watchlist</h1>
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {watchlist.map((w) => (
          <PosterCard
            key={w.id}
            title={w.title}
            src={w.poster_path}
            premium={false}
            className="min-w-0 shrink-0 grow-0 basis-1/3 lg:basis-1/5"
            onClick={() => setIsOpen(true)}
          />
        ))}
      </div>
    </main>
  );
}
