import { ChangeEvent, FC, useEffect, useState } from "react";
import { HomeProject } from "../../typings";
import { myHeaders } from "../app/constants";

interface ProjectItemPanelProps {
	project: HomeProject;
	url: string;
}

const ProjectItemPanel: FC<ProjectItemPanelProps> = ({ project, url }) => {
	const [editingSaved, setEditingSaved] = useState(false);
	const [editingCost, setEditingCost] = useState(false);
	const [updatedCost, setUpdatedCost] = useState<string>("");
	const [updatedSaved, setUpdatedSaved] = useState<string>("");
	const [readyToSubmitSaved, setReadyToSubmitSaved] = useState(false);
	const [readyToSubmitCost, setReadyToSubmitCost] = useState(false);

	const handleUpdateProjectDetails = async () => {
		if (!readyToSubmitCost || !readyToSubmitSaved) return;
		if (!updatedCost || !updatedSaved) return;
		await fetch(url, {
			method: "PATCH",
			headers: myHeaders,
			body: JSON.stringify({
				details: {
					cost: updatedCost || project.details.cost,
					savedTowardCost: updatedSaved || project.details.savedTowardCost,
				},
			}),
		}).then((res) => {
			if (res.ok) {
				// TODO HANDLE BOTH CASES
			}
		});
	};

	useEffect(() => {
		if (updatedCost) {
			setReadyToSubmitCost(true);
		} else {
			setReadyToSubmitCost(false);
		}
		if (updatedSaved) {
			setReadyToSubmitSaved(true);
		} else {
			setReadyToSubmitSaved(false);
		}
	}, [updatedCost, updatedSaved]);

	return (
		<div className="flex w-full flex-row justify-evenly">
			<div className="flex flex-col text-center font-medium ">
				<h1>Current Saved</h1>
				{editingSaved ? (
					<input
						value={updatedSaved}
						onChange={(e) => {
							setUpdatedSaved(e.target.value);
						}}
						className="mx-auto flex w-16 rounded bg-white p-1 text-center ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600 focus:ring-0 "
						maxLength={5}
						placeholder={`${project.details?.savedTowardCost}`}
					/>
				) : (
					<p>${project.details?.savedTowardCost}</p>
				)}
				{!editingSaved && !readyToSubmitSaved ? (
					<p
						onClick={() => setEditingSaved(true)}
						className="cursor-pointer pt-1 text-[0.65rem] font-medium text-blue-500 hover:text-blue-800 hover:underline"
					>
						Update
					</p>
				) : editingSaved && !readyToSubmitSaved ? (
					<p
						onClick={() => setEditingSaved(false)}
						className="cursor-pointer pt-1 text-[0.65rem] font-medium text-blue-500 hover:text-blue-800 hover:underline"
					>
						Cancel
					</p>
				) : editingSaved && readyToSubmitSaved ? (
					<p
						// onClick={}
						className="cursor-pointer pt-1 text-[0.65rem] font-medium text-blue-500 hover:text-blue-800 hover:underline"
					>
						Submit
					</p>
				) : null}
			</div>
			<div className="flex flex-col text-center  font-medium ">
				<h1>Project Cost</h1>
				{editingCost ? (
					<input
						value={updatedCost}
						onChange={(e) => setUpdatedCost(e.target.value)}
						className="mx-auto flex w-16 rounded bg-white p-1 text-center ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600 focus:ring-0 "
						maxLength={5}
						placeholder={`${project.details?.cost}`}
					/>
				) : (
					<p>${project.details?.cost}</p>
				)}
				{!editingCost && !readyToSubmitCost ? (
					<p
						onClick={() => setEditingCost(true)}
						className="cursor-pointer pt-1 text-[0.65rem] font-medium text-blue-500 hover:text-blue-800 hover:underline"
					>
						Update
					</p>
				) : editingCost && !readyToSubmitCost ? (
					<p
						onClick={() => setEditingCost(false)}
						className="cursor-pointer pt-1 text-[0.65rem] font-medium text-blue-500 hover:text-blue-800 hover:underline"
					>
						Cancel
					</p>
				) : editingCost && readyToSubmitCost ? (
					<p
						//onClick={}
						className="cursor-pointer pt-1 text-[0.65rem] font-medium text-blue-500 hover:text-blue-800 hover:underline"
					>
						Submit
					</p>
				) : null}
			</div>
		</div>
	);
};

export default ProjectItemPanel;
