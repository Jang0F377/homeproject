import { BoltIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { HomeProject } from "../../typings";
import { MATT_URL, myHeaders, PROJECT_URL, SARAH_URL } from "../app/constants";

interface PriorityListItemProps {
	project: HomeProject;
	whoseRoute: string;
}

const PriorityListItem: FC<PriorityListItemProps> = ({
	project,
	whoseRoute,
}) => {
	const router = useRouter();
	const [editing, setEditing] = useState(false);
	const [newPriority, setNewPriority] = useState("");
	let [url, setUrl] = useState(
		whoseRoute === "sarah"
			? SARAH_URL
			: whoseRoute === "matt"
			? MATT_URL
			: whoseRoute === "project"
			? PROJECT_URL
			: ""
	);

	const handleEdit = () => {
		setEditing(!editing);
	};

	const handleChangePriority = async () => {
		if (Number(newPriority) === 0) {
			await fetch(url + project._id, {
				method: "DELETE",
				headers: myHeaders,
			})
				.then((res) => {
					if (res.ok) {
						setTimeout(() => {
							router.reload();
						}, 250);
					}
				})
				.catch((err) => {
					alert(err);
				});
		} else {
			await fetch(url + project._id, {
				method: "PATCH",
				headers: myHeaders,
				body: JSON.stringify({
					priority: Number(newPriority),
				}),
			})
				.then((res) => {
					if (res.ok) {
						setTimeout(() => {
							router.reload();
						}, 250);
					}
				})
				.catch((err) => {
					alert(err);
				});
		}
	};

	return (
		<div className="flex flex-row items-center justify-between border-b border-cyber-grape-700 p-3 first:border-b last:border-none">
			<div className="flex flex-col">
				<h1 className="text-xs font-medium text-cyber-grape-700">Name:</h1>
				<p className="font-medium text-cyber-grape-600">{project.name}</p>
			</div>
			<div className=" flex flex-col ">
				<h1 className="text-xs font-medium text-cyber-grape-700">Current</h1>
				<h1 className="text-xs font-medium text-cyber-grape-700">priority:</h1>
				<div className="flex flex-row items-center justify-between">
					<p className="font-medium text-cyber-grape-600">{project.priority}</p>
					<PencilSquareIcon
						onClick={handleEdit}
						className="h-4 w-4 cursor-pointer text-cyber-grape-700"
					/>
				</div>
			</div>
			{editing && (
				<div className="flex flex-col">
					<p className="text-xs font-medium text-cyber-grape-600">New</p>
					<p className="text-xs font-medium text-cyber-grape-600">priority:</p>
					<div className="flex flex-row items-center justify-between">
						<input
							value={newPriority}
							onChange={(e) => setNewPriority(e.target.value)}
							placeholder={`${project.priority}`}
							maxLength={3}
							className="flex w-10 rounded bg-white p-1"
						/>
						{Number(newPriority) !== project.priority &&
						Boolean(newPriority) !== false ? (
							<BoltIcon
								onClick={handleChangePriority}
								className="h-4 w-4 cursor-pointer fill-green-600"
							/>
						) : null}
					</div>
				</div>
			)}
		</div>
	);
};

export default PriorityListItem;
