import { FC } from "react";
import { Expense } from "../../typings";

interface ExpenseListItemProps {
	expense: Expense;
}

const ExpenseListItem: FC<ExpenseListItemProps> = ({ expense }) => {
	return (
		<div className="grid w-full grid-flow-col grid-cols-3 p-3 ">
			<div className="col-span-2 flex flex-col">
				<h1 className="text-xs font-medium text-cyber-grape-700">Pay to:</h1>
				<p className="font-medium text-cyber-grape-600">{expense.payableTo}</p>
			</div>
			<div className="col-span flex flex-col">
				<h1 className="text-xs font-medium text-cyber-grape-700">Cost:</h1>
				<p className="font-medium text-cyber-grape-600">${expense.cost}</p>
			</div>
			<div className="col-span flex flex-col">
				<h1 className="text-xs font-medium text-cyber-grape-700">Due:</h1>
				<p className="font-medium text-cyber-grape-600">{expense.dayCharged}</p>
			</div>
		</div>
	);
};

export default ExpenseListItem;
