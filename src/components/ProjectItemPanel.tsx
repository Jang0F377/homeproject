import { ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { NextRouter } from "next/router";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { HomeProject } from "../../typings";
import { myHeaders } from "../app/constants";

interface ProjectItemPanelProps {
	project: HomeProject;
	url: string;
	router: NextRouter;
}

const ProjectItemPanel: FC<ProjectItemPanelProps> = ({
	project,
	url,
	router,
}) => {
	const [editingSaved, setEditingSaved] = useState(false);
	const [editingCost, setEditingCost] = useState(false);
	const [updatedCost, setUpdatedCost] = useState<string>("");
	const [updatedSaved, setUpdatedSaved] = useState<string>("");
	const [readyToSubmitSaved, setReadyToSubmitSaved] = useState(false);
	const [readyToSubmitCost, setReadyToSubmitCost] = useState(false);
	const [patchSuccessSaved, setPatchSuccessSaved] = useState(false);
	const [patchSuccessCost, setPatchSuccessCost] = useState(false);
	const [loadingCost, setLoadingCost] = useState(false);
	const [loadingSaved, setLoadingSaved] = useState(false);
	const [showRefresh, setShowRefresh] = useState(false);

	const handleUpdateProjectDetailsSaved = async () => {
		if (!readyToSubmitSaved) return;
		if (!updatedSaved) return;
		await fetch(url + project._id, {
			method: "PATCH",
			headers: myHeaders,
			body: JSON.stringify({
				details: {
					...project.details,
					savedTowardCost: updatedSaved,
				},
			}),
		})
			.then((res) => {
				if (res.ok) {
					setPatchSuccessSaved(true);
					setLoadingSaved(false);
				}
			})
			.catch((e) => alert(e));
	};
	const handleUpdateProjectDetailsCost = async () => {
		if (!readyToSubmitCost) return;
		if (!updatedCost) return;
		await fetch(url + project._id, {
			method: "PATCH",
			headers: myHeaders,
			body: JSON.stringify({
				details: {
					...project.details,
					cost: updatedCost,
				},
			}),
		})
			.then((res) => {
				if (res.ok) {
					setPatchSuccessCost(true);
					setLoadingCost(false);
				}
			})
			.catch((e) => alert(e));
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

	useEffect(() => {
		if (patchSuccessCost || patchSuccessSaved) {
			setShowRefresh(true);
		}
	}, [patchSuccessCost, patchSuccessSaved]);

	return (
		<div className="flex w-full flex-row justify-evenly">
			{/* LEFT SIDE OF FLEX BOX ALL PERTAINING VARIABLES SUFFIXED W/ SAVED */}
			<div className="flex flex-col text-center font-medium text-cyber-grape-700">
				<h1>Current Saved</h1>
				{patchSuccessSaved ? (
					<div className="mx-auto my-1 flex w-full flex-row items-center justify-center py-1">
						<CheckCircleIcon className="h-10 w-10 fill-green-200 text-green-600" />
					</div>
				) : (
					<>
						{editingSaved ? (
							<input
								value={updatedSaved}
								onChange={(e) => {
									setUpdatedSaved(e.target.value);
								}}
								className="mx-auto flex w-14 rounded bg-white p-1 text-center ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600 focus:ring-0 "
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
								onClick={() => {
									setLoadingSaved(true);
									setTimeout(() => handleUpdateProjectDetailsSaved(), 500);
								}}
								className={clsx(
									"cursor-pointer pt-1 text-[0.65rem] font-medium text-blue-500 hover:text-blue-800 hover:underline",
									loadingSaved ? "animate-bounce" : "animate-none"
								)}
							>
								Submit
							</p>
						) : null}
					</>
				)}
			</div>
			{showRefresh ? (
				<ArrowPathIcon
					onClick={() => {
						setTimeout(() => router.reload(), 150);
					}}
					className="my-auto h-10 w-10 cursor-pointer items-center fill-cyber-grape-250 text-cyber-grape-700 duration-100 active:animate-spin "
				/>
			) : null}
			{/* RIGHT SIDE OF FLEX BOX ALL PERTAINING VARIABLES SUFFIXED W/ COST */}
			<div className="flex flex-col text-center  font-medium text-cyber-grape-700">
				<h1>Project Cost</h1>
				{patchSuccessCost ? (
					<div className="mx-auto my-1 flex w-full flex-row items-center justify-center py-1">
						<CheckCircleIcon className="h-10 w-10 fill-green-200 text-green-600" />
					</div>
				) : (
					<>
						{editingCost ? (
							<input
								value={updatedCost}
								onChange={(e) => setUpdatedCost(e.target.value)}
								className="mx-auto flex w-14 rounded bg-white p-1 text-center ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600 focus:ring-0 "
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
								onClick={() => {
									setLoadingCost(true);
									setTimeout(() => handleUpdateProjectDetailsCost(), 500);
								}}
								className={clsx(
									"cursor-pointer pt-1 text-[0.65rem] font-medium text-blue-500 hover:text-blue-800 hover:underline",
									loadingCost ? "animate-bounce" : "animate-none"
								)}
							>
								Submit
							</p>
						) : null}
					</>
				)}
			</div>
		</div>
	);
};

export default ProjectItemPanel;
