import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import PosterCard from "~/components/poster-card";
import PosterInfo from "~/components/poster-info";
import Carousel from "~/components/ui/carousel";
import { getMovie, getMovieRecommended } from "~/lib/tmdb";

export default function MovieDetail() {
	const [movie, setMovie] = useState(null);
	const [recommendations, setRecommendations] = useState(null);

	const { movieId } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			const [movieRes, recommendationsRes] = await Promise.all([
				getMovie(movieId),
				getMovieRecommended(movieId),
			]);

			setMovie(movieRes);
			setRecommendations(recommendationsRes.results);
		};

		fetchData();
	}, [movieId]);

	if (!movie) return;

	return (
		<main className="container space-y-8">
			<PosterInfo data={movie} />
			<section className="space-y-6">
				<h2 className="font-medium text-2xl">Recommendations</h2>
				<Carousel controls>
					{recommendations.map((r) => (
						<Link
							key={r.id}
							to={`/movies/${r.id}`}
							className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 xl:basis-1//6"
						>
							<PosterCard
								title={r.name || r.title}
								src={r.poster_path}
								premium={false}
							/>
						</Link>
					))}
				</Carousel>
			</section>
		</main>
	);
}
