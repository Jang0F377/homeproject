import { BoltIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { SARAH_URL, MATT_URL, PROJECT_URL, myHeaders } from "../app/constants";

interface AddNewProjectItemProps {
	handleClose: () => void;
	route: string;
}

const AddNewProjectItem: FC<AddNewProjectItemProps> = ({
	handleClose,
	route,
}) => {
	const router = useRouter();
	const [newProjectName, setNewProjectName] = useState<string>("");
	const [newProjectPriority, setNewProjectPriority] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState("");
	const [posting, setPosting] = useState(false);
	let [url, setUrl] = useState(
		route === "sarah"
			? SARAH_URL
			: route === "matt"
			? MATT_URL
			: route === "project"
			? PROJECT_URL
			: ""
	);

	const resetState = () => {
		console.log("reseting state");
		setErrorMessage("");
		setNewProjectName("");
		setNewProjectPriority("");
		setPosting(false);
	};

	const handleAddNewProject = async () => {
		setPosting(true);
		if (
			+newProjectPriority > 100 ||
			+newProjectPriority < 1 ||
			!newProjectName
		) {
			setErrorMessage("Name cannot be empty & priority must be > 0 & < 100");
			setPosting(false);
			return;
		}

		await fetch(url, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				name: newProjectName,
				priority: Number(newProjectPriority),
			}),
		})
			.then((res) => {
				if (res.ok) {
					setTimeout(() => {
						router.reload();
					}, 350);
				} else {
					return res
						.json()
						.then((res) => setErrorMessage(JSON.stringify(res, null, 2)))
						.then(() => alert(errorMessage))
						.then(() => router.reload());
				}
			})
			.catch((e) => alert(e));
	};

	return (
		<div className="m-1 flex flex-row   justify-between border-b border-cyber-grape-700 py-3">
			<div className="flex flex-col">
				{errorMessage ? (
					<div className="flex">
						<p className="text-xs font-medium text-red-600">{errorMessage}</p>
					</div>
				) : null}
				<h1 className="text-xs font-medium text-cyber-grape-700">Name:</h1>
				<input
					autoFocus
					value={newProjectName}
					onChange={(e) => setNewProjectName(e.target.value)}
					className="flex rounded bg-white p-1 ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600 focus:ring-0"
				/>
			</div>
			<div className="flex flex-col">
				<h1 className="text-xs font-medium text-cyber-grape-700">Priority:</h1>
				<input
					value={newProjectPriority}
					onChange={(e) => setNewProjectPriority(e.target.value)}
					maxLength={3}
					className="flex w-12 rounded bg-white p-1 ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-1 focus:outline-cyber-grape-600 focus:ring-0"
				/>
			</div>
			<div className="my-auto flex flex-row space-x-1.5">
				{newProjectName && newProjectPriority && (
					<BoltIcon
						onClick={handleAddNewProject}
						className={clsx(
							"h-7 w-6 cursor-pointer hover:fill-green-600 hover:text-green-800",
							posting ? "animate-spin" : "animate-none"
						)}
					/>
				)}
				<TrashIcon
					onClick={handleClose}
					className="h-7 w-6 cursor-pointer hover:fill-red-600 hover:text-red-900"
				/>
			</div>
		</div>
	);
};

export default AddNewProjectItem;
