import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import PosterCard from "~/components/poster-card";
import Toolbar from "~/components/toolbar";

export default function Watchlist() {
	const [watchlist, setWatchlist] = useState([]);
	const [searchParams] = useSearchParams();

	const search = searchParams.get("search") || "";
	const type = searchParams.get("type") || "all";
	const order = searchParams.get("order") || "";

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch(
				`/api/watchlist?search=${search}&type=${type}&order=${order}`,
			);
			const data = await res.json();
			setWatchlist(data);
		};

		fetchData();
	}, [search, type, order]);

	return (
		<main className="container space-y-8 py-8">
			<h1 className="font-medium text-2xl">Watchlist</h1>
			<Toolbar />
			<div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-5">
				{watchlist.map((w) => {
					const pathname = w.type === "movie" ? "movies" : "series";

					return (
						<Link key={w.id} to={`/${pathname}/${w.item_id}`}>
							<PosterCard
								title={w.title}
								src={w.poster_url}
								premium={false}
								className="min-w-0 shrink-0 grow-0 basis-1/2 md:basis-1/4 xl:basis-1//6"
							/>
						</Link>
					);
				})}
			</div>
		</main>
	);
}
