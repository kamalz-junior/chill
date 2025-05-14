export const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
export const TMDB_API_URL = "https://api.themoviedb.org/3";
export const TMDB_API_LANG = "en-US";
export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500";
export const accountId = 21941508;

export async function fetchTMDB(path, params, options) {
  let url = new URL(TMDB_API_URL + path);
  url.searchParams.set("api_key", TMDB_API_KEY);
  url.searchParams.set("language", TMDB_API_LANG);

  if (params && typeof params === "object") {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, value);
      }
    }
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export async function getMovies(query, page = 1) {
  return await fetchTMDB(`/movie/${query}`, {
    with_genres: "genre",
    page,
  });
}

export async function getMovie(id) {
  return await fetchTMDB(`/movie/${id}`, {
    append_to_response: "videos",
  });
}

export async function getMovieRecommended(id, page = 1) {
  return await fetchTMDB(`/movie/${id}/recommendations`, { page });
}

export async function getTvShows(query, page = 1) {
  return await fetchTMDB(`/tv/${query}`, { page });
}

export async function getTvShow(id) {
  return await fetchTMDB(`/tv/${id}`, {
    append_to_response: "credits",
  });
}

export async function getTvShowRecommended(id, page = 1) {
  return await fetchTMDB(`/tv/${id}/recommendations`, { page });
}

export async function getTvShowEpisodes(id, season) {
  return await fetchTMDB(`/tv/${id}/season/${season}`);
}

export async function getTrending(media, page = 1) {
  return await fetchTMDB(`/trending/${media}/week`, { page });
}

// export async function getTop(media = "movie", page = 1) {
//   return await fetchTMDB(`/${media}/top_rated`, { page });
// }

export async function getMediaByGenre(media, genre, page = 1) {
  return await fetchTMDB(`/disover/${media}`, {
    with_genres: genre,
    page,
  });
}

export async function getGenreList(media) {
  return await fetchTMDB(`/genre/${media}/list`).then((res) => res.genres);
}

export async function getCredits(id, type) {
  return await fetchTMDB(`/person/${id}/${type}`);
}

export async function getPerson(id) {
  return await fetchTMDB(`/person/${id}`);
}

export async function getWatchlist(media, page = 1) {
  return await fetchTMDB(
    `/account/${accountId}/watchlist/${media}`,
    { page },
    {
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    },
  );
}
