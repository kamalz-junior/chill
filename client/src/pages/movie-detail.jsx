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
    getMovie(movieId).then((res) => {
      setMovie(res);
    });
    getMovieRecommended(movieId).then((res) => {
      setRecommendations(res.results);
    });
  }, []);

  if (!movie) return;

  return (
    <main className="space-y-8">
      <PosterInfo data={movie} />
      <section className="container space-y-6">
        <h2 className="font-medium text-2xl">Recommendations</h2>
        <Carousel controls>
          {recommendations.map((r) => (
            <Link
              key={r.id}
              to={`/movies/${r.id}`}
              className="min-w-0 shrink-0 grow-0 basis-1/3 lg:basis-1/5"
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
