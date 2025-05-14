import { tmdbImage } from "~/lib/utils";

export default function EpisodeCard({ episode, className, ...props }) {
  return (
    <div className={`flex gap-4 ${className}`} {...props}>
      <figure className="hidden aspect-video h-40 overflow-hidden rounded-lg md:block">
        <img
          src={tmdbImage(episode.still_path)}
          alt={episode.title}
          className="object-cover"
        />
      </figure>
      <div className="flex-1 space-y-2">
        <span className="font-medium">Episode {episode.episode_numver}</span>
        <h3 className="font-medium text-lg">{episode.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">
            {new Date(episode.air_date).toDateString()}
          </span>
          <span>.</span>
          <span className="text-muted-foreground text-sm">
            {episode.runtime} min
          </span>
        </div>
        <p className="text-muted-foreground text-sm">{episode.overview}</p>
      </div>
    </div>
  );
}
