import { BoltIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { Expense } from "../../typings";

interface ExpenseListItemProps {
	expense: Expense;
	editing: boolean;
}

const ExpenseListItem: FC<ExpenseListItemProps> = ({ expense, editing }) => {
	const [checked, setChecked] = useState(false);
	const [updatedName, setUpdatedName] = useState<string>("");
	const [updatedCost, setUpdatedCost] = useState<string>("");
	const [updatedDay, setUpdatedDay] = useState<string>("");
	const handleCheckbox = () => {
		setChecked(!checked);
	};
	const resetState = () => {
		setUpdatedName("");
		setUpdatedDay("");
		setUpdatedCost("");
		setChecked(false);
	};

	useEffect(() => {
		if (!editing) {
			resetState();
		}
	}, [editing]);

	return (
		<div
			className={clsx(
				"grid w-full grid-flow-col  items-center p-3",
				editing ? "grid-cols-5 md:grid-cols-7" : "grid-cols-4 md:grid-cols-5"
			)}
		>
			{editing ? (
				<input
					type="checkbox"
					className="col-span-1 flex h-3 w-3"
					onClick={handleCheckbox}
				/>
			) : null}
			<div className="col-span-3 flex flex-col md:col-span-4">
				<h1 className="text-xs font-medium text-cyber-grape-700">Pay to:</h1>
				{checked ? (
					<input
						onChange={(e) => setUpdatedName(e.target.value)}
						value={updatedName}
						maxLength={23}
						placeholder={expense.name}
						className="mr-0.5 flex rounded bg-white p-1 ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600 focus:ring-0 md:w-44"
					/>
				) : (
					<p className="font-medium text-cyber-grape-600">{expense.name}</p>
				)}
			</div>
			<div className="col-span-2 flex flex-col md:col-span-3">
				<h1 className="text-xs font-medium text-cyber-grape-700">Cost:</h1>
				{checked ? (
					<input
						onChange={(e) => setUpdatedCost(e.target.value)}
						value={updatedCost}
						maxLength={4}
						placeholder={`${expense.cost}`}
						className="mx-0.5 flex w-11 rounded bg-white p-1 ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-1 focus:outline-cyber-grape-600 focus:ring-0"
					/>
				) : (
					<p className="font-medium text-cyber-grape-600">${expense.cost}</p>
				)}
			</div>
			<div className="col-span-1 flex flex-col md:col-span-2">
				<h1 className="text-xs font-medium text-cyber-grape-700">Due:</h1>
				{checked ? (
					<input
						onChange={(e) => setUpdatedDay(e.target.value)}
						placeholder={`${expense.dayCharged}`}
						value={updatedDay}
						maxLength={2}
						className={clsx(
							"flex w-11 rounded bg-white p-1 ring-1 ring-cyber-grape-600 focus:outline focus:outline-offset-1 focus:outline-cyber-grape-600 focus:ring-0",
							checked ? "ml-1" : null
						)}
					/>
				) : (
					<p className="font-medium text-cyber-grape-600">
						{expense.dayCharged}
					</p>
				)}
			</div>
			{(checked && updatedName) || updatedDay || updatedCost ? (
				<div className="ml-1 flex flex-col pl-0.5">
					<BoltIcon className="my-auto h-6 w-6 cursor-pointer hover:fill-green-600 hover:text-green-800" />
				</div>
			) : null}
		</div>
	);
};

export default ExpenseListItem;
