import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EpisodeCard from "~/components/episode-card";
import PosterInfo from "~/components/poster-info";
import { getTvShow, getTvShowEpisodes } from "~/lib/tmdb";

export default function SeriesDetail() {
	const [series, setSeries] = useState(null);
	const [season, setSeason] = useState(null);

	const { seriesId } = useParams();

	useEffect(() => {
		getTvShow(seriesId).then((res) => {
			setSeries(res);
		});
		getTvShowEpisodes(seriesId, 1).then((res) => {
			setSeason(res);
		});
	}, [seriesId]);

	if (!series || !season) return;

	return (
		<main className="container space-y-8">
			<PosterInfo data={series} />
			<section className="space-y-6">
				<h2 className="font-medium text-2xl">Episode</h2>
				<div className="grid gap-4">
					{season.episodes.map((episode) => (
						<EpisodeCard key={episode.id} episode={episode} />
					))}
				</div>
			</section>
		</main>
	);
}
