import { BoltIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";

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
	const [showModal, setShowModal] = useState(false);

	const handleShowModal = () => {
		setShowModal(true);
	};

	const resetState = () => {
		console.log("reseting state");
		setNewProjectName("");
		setNewProjectPriority("");
		setShowModal(false);
	};

	const handleAddNewProject = async () => {
		await fetch("/api/addNewProject", {
			method: "POST",
			body: JSON.stringify({
				type: route,
				name: newProjectName,
				priority: Number(newProjectPriority),
			}),
		})
			.then((res) => {
				if (res.ok) {
					setTimeout(() => {
						router.reload();
					}, 550);
				}
			})
			.catch((e) => alert(e));
	};

	return (
		<div className="m-1 flex flex-row   justify-between border-b border-cyber-grape-700 py-3">
			<div className="flex flex-col">
				<h1 className="text-xs font-medium text-cyber-grape-700">Name:</h1>
				<input
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
						className="h-7 w-6 cursor-pointer hover:fill-green-600 hover:text-green-800"
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
