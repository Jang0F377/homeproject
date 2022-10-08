import { BoltIcon, TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import {
	SARAH_URL,
	MATT_URL,
	PROJECT_URL,
	myHeaders,
	EXPENSE_URL,
} from "../app/constants";

interface AddNewExpenseItemProps {
	handleClose: () => void;
}

const AddNewExpenseItem: FC<AddNewExpenseItemProps> = ({ handleClose }) => {
	const router = useRouter();
	const [newExpenseName, setNewExpenseName] = useState<string>("");
	const [newExpenseCost, setNewExpenseCost] = useState<string>("");
	const [newExpenseDay, setNewExpenseDay] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState("");
	const [posting, setPosting] = useState(false);

	const resetState = () => {
		console.log("reseting state");
		setErrorMessage("");
		setNewExpenseName("");
		setNewExpenseDay("");
		setPosting(false);
	};

	const handleAddNewProject = async () => {
		setPosting(true);
		await fetch(EXPENSE_URL, {
			method: "POST",
			headers: myHeaders,
			body: JSON.stringify({
				name: newExpenseName,
				cost: Number(newExpenseCost),
				dayCharged: Number(newExpenseDay),
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
						.then(() => setPosting(false))
						.then(() => router.reload());
				}
			})
			.catch((e) => alert(e));
	};

	return (
		<div className="m-1 flex flex-col flex-wrap items-center justify-between space-y-1 border-b border-cyber-grape-700 py-3 md:flex-row md:space-y-0">
			<div className="ml-0.5 flex flex-col">
				{errorMessage ? (
					<div className="flex">
						<p className="text-xs font-medium text-red-600">{errorMessage}</p>
					</div>
				) : null}
				<label className="text-xs font-medium text-cyber-grape-700">
					Name:
				</label>
				<input
					autoFocus
					maxLength={23}
					value={newExpenseName}
					onChange={(e) => setNewExpenseName(e.target.value)}
					className="flex w-52 rounded bg-white p-1 ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600 focus:ring-0"
				/>
			</div>
			<div className="flex flex-col">
				<label className="text-xs font-medium text-cyber-grape-700">
					Cost:
				</label>
				<input
					value={newExpenseCost}
					onChange={(e) => setNewExpenseCost(e.target.value)}
					maxLength={4}
					className="flex w-16 rounded bg-white p-1 ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-1 focus:outline-cyber-grape-600 focus:ring-0"
				/>
			</div>
			<div className="flex flex-col">
				<label className="text-xs font-medium text-cyber-grape-700">Day:</label>
				<input
					value={newExpenseDay}
					onChange={(e) => setNewExpenseDay(e.target.value)}
					maxLength={2}
					className="flex w-11 rounded bg-white p-1 ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-1 focus:outline-cyber-grape-600 focus:ring-0"
				/>
			</div>
			<div className="my-auto mx-auto flex flex-row space-x-1.5 md:mx-0">
				{newExpenseName && newExpenseCost && newExpenseDay && (
					<BoltIcon
						onClick={() => {
							setPosting(true);
							setTimeout(() => handleAddNewProject(), 300);
						}}
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

export default AddNewExpenseItem;
