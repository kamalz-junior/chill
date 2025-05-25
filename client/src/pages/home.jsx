import { useEffect, useState } from "react";
import { Link } from "react-router";
import PosterCard from "~/components/poster-card";
import PosterInfo from "~/components/poster-info";
import ThumbnailCard from "~/components/thumbnail-card";
import Carousel from "~/components/ui/carousel";
import {
	getMovie,
	getMovies,
	getTrending,
	getTvShow,
	getWatchlist,
} from "~/lib/tmdb";

export default function Home() {
	const [isLoading, setIsLoading] = useState(true);
	const [movie, setMovie] = useState(null);
	const [watchlist, setWatchlist] = useState([]);
	const [trending, setTrending] = useState([]);
	const [newRelease, setNewRelease] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [moviesWatchlistRes, tvWatchlistRes, trendingRes, newReleaseRes] =
					await Promise.all([
						getWatchlist("movies"),
						getWatchlist("tv"),
						getTrending("all"),
						getMovies("now_playing"),
					]);

				const trend = trendingRes.results[0];

				if (trend.media_type === "movie") {
					getMovie(trend.id).then((res) => {
						setMovie(res);
					});
				} else if (trend.media_type === "tv") {
					getTvShow(trend.id).then((res) => {
						setMovie(res);
					});
				}

				setWatchlist([
					...moviesWatchlistRes.results,
					...tvWatchlistRes.results,
				]);
				setTrending(trendingRes.results);
				setNewRelease(newReleaseRes.results);
			} catch (error) {
				console.error("Error fetching data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (!movie || isLoading) return;

	return (
		<main className="space-y-8 pb-8">
			<PosterInfo data={movie} className="" />
			<section className="container space-y-4">
				<h2 className="font-medium text-xl">Continue watching</h2>
				<Carousel controls>
					{watchlist.map((w) => (
						<Link
							key={w.id}
							to={`/movies/${w.id}`}
							className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 xl:basis-1//6"
						>
							<ThumbnailCard
								title={w.title || w.name}
								src={w.backdrop_path}
								rating={w.vote_average}
							/>
						</Link>
					))}
				</Carousel>
			</section>
			<section className="container space-y-4">
				<h2 className="font-medium text-xl">All trending movies and series</h2>
				<Carousel controls>
					{trending.map((t) => {
						const pathname = t.media_type === "movie" ? "movies" : "series";

						return (
							<Link
								key={t.id}
								to={`/${pathname}/${t.id}`}
								className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 xl:basis-1//6"
							>
								<PosterCard
									title={t.title || t.name}
									src={t.poster_path}
									premium={false}
								/>
							</Link>
						);
					})}
				</Carousel>
			</section>
			<section className="container space-y-4">
				<h2 className="font-medium text-xl">New release</h2>
				<Carousel controls>
					{newRelease.map((n) => (
						<Link
							key={n.id}
							to={`/movies/${n.id}`}
							className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 xl:basis-1//6"
						>
							<PosterCard title={n.title} src={n.poster_path} premium={false} />
						</Link>
					))}
				</Carousel>
			</section>
		</main>
	);
}
