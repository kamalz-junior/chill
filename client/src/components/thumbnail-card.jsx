import { Star } from "lucide-react";
import { tmdbImage } from "~/lib/utils";

export default function ThumbnailCard({
	title,
	src,
	rating,
	className,
	...props
}) {
	return (
		<figure
			className={`relative aspect-video overflow-hidden rounded-lg ${className}`}
			{...props}
		>
			<div className="absolute inset-0 bg-linear-to-t not-hover:from-black/50" />
			<img src={tmdbImage(src)} alt={title} className="object-cover" />
			<div className="absolute bottom-0 flex w-full items-center justify-between p-2">
				<h3 className="text-sm">{title}</h3>
				<span className="flex items-center gap-1 text-xs">
					<Star className="size-3" /> {Number(rating).toFixed(1)}
				</span>
			</div>
		</figure>
	);
}
