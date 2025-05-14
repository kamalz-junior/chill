import Badge from "~/components/ui/badge";
import { tmdbImage } from "~/lib/utils";

export default function PosterCard({
  title,
  src,
  premium,
  className,
  ...props
}) {
  return (
    <figure
      className={`relative aspect-2/3 overflow-hidden rounded-lg ${className}`}
      {...props}
    >
      {premium && <Badge className="absolute top-4 left-4">Premium</Badge>}
      <img src={tmdbImage(src)} alt="title" className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-r not-hover:from-black/50" />
    </figure>
  );
}
