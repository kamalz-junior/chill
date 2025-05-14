import { Star } from "lucide-react";
import Badge from "~/components/ui/badge";
import Button from "~/components/ui/button";
import { tmdbImage } from "~/lib/utils";

export default function PosterInfo({ data, className, ...props }) {
  return (
    <section
      className={`relative aspect-2/3 bg-cover bg-top before:absolute before:inset-0 before:bg-linear-to-t before:from-black before:content-[''] md:aspect-[2.39/1] md:before:bg-linear-to-r ${className}`}
      style={{
        backgroundImage: `url(${tmdbImage(data.backdrop_path)})`,
      }}
      {...props}
    >
      <div className="absolute right-0 bottom-20 space-y-4 p-6 md:left-14 md:px-0">
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
        <div className="flex items-center gap-2">
          {data.genres.map((g) => {
            <Badge key={g.id} variant="ghost">
              {/* {g.name} */}
              <p>lala</p>
            </Badge>;
          })}
        </div>
        {console.log(data.genres)}
        <p className="max-w-xl text-muted-foreground text-sm md:text-base">
          {data.overview}
        </p>
        <p className="text-sm">
          <span className="text-muted-foreground">Created by </span>
          {data.production_companies.map((c) => c.name).join(", ") ||
            data.created_by.map((c) => c.name).join(", ")}
        </p>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button>Watch</Button>
          <Button variant="outline">Add Watchlist</Button>
        </div>
      </div>
    </section>
  );
}
