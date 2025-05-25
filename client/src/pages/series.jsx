import { useEffect, useState } from "react";
import { Link } from "react-router";
import PosterCard from "~/components/poster-card";
import PosterInfo from "~/components/poster-info";
import ThumbnailCard from "~/components/thumbnail-card";
import Carousel from "~/components/ui/carousel";
import { getTrending, getTvShow, getTvShows, getWatchlist } from "~/lib/tmdb";

export default function Series() {
  const [isLoading, setIsLoading] = useState(true);
  const [series, setSeries] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [trending, setTrending] = useState([]);
  const [top, setTop] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [watchlistRes, trendingRes, topRes, newReleaseRes] = await Promise.all([
          getWatchlist("tv"),
          getTrending("tv"),
          getTvShows("airing_today"),
          getTvShows("top_rated"),
        ]);

        getTvShow(trendingRes.results[0].id).then((res) => {
          setSeries(res);
        });
        setTop(topRes.results);
        setWatchlist(watchlistRes.results);
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

  if (!series || isLoading) return;

  return (
    <main className="space-y-8 pb-8">
      <PosterInfo data={series} className="" />
      <section className="container space-y-4">
        <h2 className="font-medium text-xl">Continue watching</h2>
        <Carousel controls>
          {watchlist.map((w) => (
            <Link
              key={w.id}
              to={`/series/${w.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/2 lg:basis-1/4"
            >
              <ThumbnailCard
                title={w.name}
                src={w.backdrop_path}
                rating={w.vote_average}
                className="relative aspect-21/9 overflow-hidden rounded-md md:aspect-video"
              />
            </Link>
          ))}
        </Carousel>
      </section>
      <section className="container space-y-4">
        <h2 className="font-medium text-xl">Trending series</h2>
        <Carousel controls>
          {trending.map((t) => (
            <Link
              key={t.id}
              to={`/series/${t.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 xl:basis-1//6"
            >
              <PosterCard title={t.name} src={t.poster_path} premium={false} />
            </Link>
          ))}
        </Carousel>
      </section>
      <section className="container space-y-4">
        <h2 className="font-medium text-xl">Top series</h2>
        <Carousel controls>
          {top.map((t) => (
            <Link
              key={t.id}
              to={`/series/${t.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 xl:basis-1//6"
            >
              <PosterCard title={t.name} src={t.poster_path} premium={false} />
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
              to={`/series/${n.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 xl:basis-1//6"
            >
              <PosterCard title={n.name} src={n.poster_path} premium={false} />
            </Link>
          ))}
        </Carousel>
      </section>
    </main>
  );
}
