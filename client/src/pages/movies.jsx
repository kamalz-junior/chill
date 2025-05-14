import { useEffect, useState } from "react";
import { Link } from "react-router";
import PosterCard from "~/components/poster-card";
import PosterInfo from "~/components/poster-info";
import Carousel from "~/components/ui/carousel";
import { getMovie, getMovies, getTrending, getWatchlist } from "~/lib/tmdb";

export default function Movies() {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [top, setTop] = useState([]);
  const [trending, setTrending] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [watchlistRes, trendingRes, topRes, newReleaseRes] =
          await Promise.all([
            getWatchlist("movies"),
            getTrending("movie"),
            getMovies("top_rated"),
            getMovies("now_playing"),
          ]);

        getMovie(trendingRes.results[0].id).then((res) => {
          setMovie(res);
        });

        setWatchlist(watchlistRes.results);
        setTop(topRes.results);
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
      <PosterInfo data={movie} className="px-16" />
      <section className="container space-y-4">
        <h2 className="font-medium text-xl">Continue watching</h2>
        <Carousel controls>
          {watchlist.map((w) => (
            <Link
              key={w.id}
              to={`/movies/${w.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/1 lg:basis-1/4"
            >
              <PosterCard
                title={w.title}
                src={w.backdrop_path}
                premium={false}
                className="relative aspect-21/9 overflow-hidden rounded-md md:aspect-video"
              />
            </Link>
          ))}
        </Carousel>
      </section>
      <section className="container space-y-4">
        <h2 className="font-medium text-xl">Top Movies</h2>
        <Carousel controls>
          {top.map((t) => (
            <Link
              key={t.id}
              to={`/movies/${t.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/3 lg:basis-1/5"
            >
              <PosterCard title={t.name} src={t.poster_path} premium={false} />
            </Link>
          ))}
        </Carousel>
      </section>
      <section className="container space-y-4">
        <h2 className="font-medium text-xl">Trending movies</h2>
        <Carousel controls>
          {trending.map((t) => (
            <Link
              key={t.id}
              to={`/movies/${t.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/3 lg:basis-1/5"
            >
              <PosterCard
                title={t.name || t.title}
                src={t.poster_path}
                premium={false}
              />
            </Link>
          ))}
        </Carousel>
      </section>
      <section className="container space-y-4">
        <h2 className="font-medium text-xl">New release</h2>
        <Carousel controls>
          {newRelease.map((n) => (
            <Link
              key={n.id}
              to={`/movies/${n.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/3 lg:basis-1/5"
            >
              <PosterCard title={n.title} src={n.poster_path} premium={false} />
            </Link>
          ))}
        </Carousel>
      </section>
    </main>
  );
}
