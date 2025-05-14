import { Star } from "lucide-react";

export default function CardThumbnail({ data, className, ...props }) {
  return (
    <div className={className}>
      <figure
        className="relative aspect-21/9 overflow-hidden rounded-md md:aspect-video"
        {...props}
      >
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/50" />
        <img src={data.thumbnail} alt="" className="size-full object-cover" />
        <div className="absolute bottom-0 flex w-full items-center justify-between gap-2 p-4">
          <h3 className="text-sm text-white">{data.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="size-4 text-white" />
            <span className="text-sm text-white">{data.rating}</span>
          </div>
        </div> */}
      </figure>
    </div>
  );
}
