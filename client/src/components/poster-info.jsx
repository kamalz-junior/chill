import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import Badge from "~/components/ui/badge";
import Button from "~/components/ui/button";
import { createWatchlist, deleteWatchlist } from "~/lib/api";
import { useUser } from "~/lib/store";
import { tmdbImage } from "~/lib/utils";

export default function PosterInfo({ data, className, ...props }) {
  const [watchlist, setWatchlist] = useState([]);
  const { user } = useUser();

  const watchlistItem = watchlist.find((w) => w.item_id === data.id);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/watchlist");
      const data = await res.json();
      setWatchlist(data);
    };

    fetchData();
  }, []);

  return (
    <section
      className={`relative aspect-2/3 bg-cover bg-top before:absolute before:inset-0 before:bg-linear-to-t before:from-black before:content-[''] md:aspect-[2.39/1] md:before:bg-linear-to-r ${className}`}
      style={{
        backgroundImage: `url(${tmdbImage(data.backdrop_path)})`,
      }}
      {...props}
    >
      <div className="absolute right-0 top-44  bottom-20 space-y-4 p-6 md:left-14 md:px-0 md:container md:top-8 lg:top-40">
        <h1 className="font-medium text-4xl text-white">
          {data.title || data.name}
        </h1>
        <div className="flex items-center gap-4">
          <time className="font-mono text-sm">
            {new Date(data.release_date || data.first_air_date).getFullYear()}
          </time>
          <Badge>
            <Star className="size-3" /> {Number(data.vote_average).toFixed(1)}
          </Badge>
        </div>        
        <p className="max-w-xl text-muted-foreground md:whitespace-normal text-sm md:text-base">
          {data.overview}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Created by </span>
          {data.production_companies.map((c) => c.name).join(", ") ||
            data.created_by.map((c) => c.name).join(", ")}
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button>Watch</Button>

          {watchlistItem ? (
            <Button
              variant="outline"
              className="text-zinc-200"
              onClick={async () => await deleteWatchlist(watchlistItem.id)}
            >
              Delete watchlist
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={async () =>
                await createWatchlist({
                  userId: user.id,
                  itemId: data.id,
                  title: data.title || data.name,
                  type: data.title ? "movie" : "series",
                  posterUrl: data.poster_path,
                })
              }
            >
              Add watchlist
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}