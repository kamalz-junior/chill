import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EpisodeCard from "~/components/episode-card";
import PosterInfo from "~/components/poster-info";
import { getTvShow, getTvShowEpisodes } from "~/lib/tmdb";

export default function SeriesDetail() {
  const [series, setSeries] = useState(null);
  const [session, setSession] = useState(null);

  const { seriesId } = useParams();

  useEffect(() => {
    getTvShow(seriesId).then((res) => {
      setSeries(res);
    });
    getTvShowEpisodes(seriesId).then((res) => {
      setSession(res);
    });
  }, []);

  if (!series || !session) return;

  return (
    <main className="space-y-8">
      <PosterInfo data={series} className="px-16" />
      <section className="container space-y-6">
        <h2 className="font-medium text-2xl">Episode</h2>
        <div>
          {session.episodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </section>
    </main>
  );
}
