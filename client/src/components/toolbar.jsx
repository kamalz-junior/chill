import { ArrowDownUp, ArrowUpDown } from "lucide-react";
import Button from "~/components/ui/button";
import Input from "~/components/ui/input";
import { useUpdateSearchParams } from "~/hooks/use-update-search-params";

export default function Toolbar({}) {
	const { searchParams, updateSearchParams } = useUpdateSearchParams();

	const type = searchParams.get("type") || tabs[0];
	const order = searchParams.get("order") || orders[1];

	return (
		<div className="grid gap-2 md:flex md:items-center md:justify-between">
			<Input
				placeholder="Search ..."
				onChange={(e) =>
					updateSearchParams({
						search: e.target.value,
					})
				}
				className="md:max-w-md"
			/>
			<div className="flex items-center gap-2">
				<div className="flex w-full items-center rounded-md border p-1">
					{tabs.map((tab) => (
						<Button
							key={tab}
							variant={type === tab ? "secondary" : "ghost"}
							size="sm"
							className="w-full text-xs capitalize"
							onClick={() =>
								updateSearchParams({
									type: tab,
								})
							}
						>
							{tab}
						</Button>
					))}
				</div>
				<div className="">
					<Button
						variant="outline"
						size="icon"
						onClick={() => {
							updateSearchParams({
								order: order === "asc" ? "desc" : "asc",
							});
						}}
					>
						{order === "asc" ? (
							<ArrowDownUp className="size-4" />
						) : (
							<ArrowUpDown className="size-4" />
						)}
					</Button>
				</div>
			</div>
		</div>
	);
}

const tabs = ["all", "movie", "series"];
const orders = ["asc", "desc"];
