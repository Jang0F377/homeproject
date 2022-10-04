import Loading from "../../components/Loading";
import PageNotFound from "../../components/PageNotFound";
import DashboardHeader from "../../components/DashboardHeader";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import {
	selectIsAuthenticated,
	selectUser,
} from "../../features/user/userSlice";
import { Expense, Expenses } from "../../../typings";
import { EXPENSE_URL, myHeaders } from "../../app/constants";
import { RadioGroup } from "@headlessui/react";
import {
	ArrowDownLeftIcon,
	ArrowDownRightIcon,
	ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Container from "../../components/Container";
import ExpenseListItem from "../../components/ExpenseListItem";
import AddNewExpenseItem from "../../components/AddNewExpenseItem";

function Dashboard() {
	let authed;
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const date = new Date().toDateString();
	const [expensesTotal, setExpensesTotal] = useState<any>(0);
	const mattPerCheckIncome = 2600;
	const sarahPerCheckIncome = 2367;
	const mattMonthlyIncome = 2600 * 2;
	const sarahMonthlyIncome = 2367 * 2;
	const jointPerPeriodIncome = mattPerCheckIncome + sarahPerCheckIncome;
	const jointMonthlyIncome = mattMonthlyIncome + sarahMonthlyIncome;
	const [perPeriodExp, setPerPeriodExp] = useState<any>(0);
	const [exp, setExp] = useState<Array<Expense>>();
	const [addingNew, setAddingNew] = useState(false);

	const handleClose = () => {
		setAddingNew(false);
	};

	const [activePeriod, setActivePeriod] = useState<any>("Monthly");
	const determineTotal = () => {
		setExpensesTotal(exp?.reduce((a, b) => a + b.cost, 0));
		setPerPeriodExp(expensesTotal * 0.5);
	};

	async function fetchExpenses() {
		setIsLoading(true);
		await fetch(EXPENSE_URL, {
			method: "GET",
			headers: myHeaders,
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return null;
				}
			})
			.then((res) => {
				setExp(res);
			})
			.then(() => setIsLoading(false))
			.catch((err) => {
				return err;
			});
	}

	useEffect(() => {
		fetchExpenses().catch((err) => console.log(err));
		authed = localStorage.getItem("isAuthenticated");
		if (authed === "true") {
			setIsAuthenticated(true);
		}
	}, []);

	useEffect(() => {
		determineTotal();
	}, [exp]);

	if (isLoading) {
		return <Loading />;
	}

	if (!isAuthenticated) {
		return <PageNotFound />;
	}

	return (
		<>
			{isAuthenticated && (
				<div id={"expenses"} className="min-h-full">
					<div className="bg-cyber-grape-50 pb-32">
						<DashboardHeader />
						<header className="border-y border-cyber-grape-600 py-1 md:border-y-0 md:border-t">
							<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
								<h1 className="text-center text-4xl font-semibold text-cyber-grape-700 md:text-left">
									Expenses
								</h1>
							</div>
						</header>
					</div>
					<main className="mx-auto -mt-32 max-w-7xl space-y-3 rounded bg-cyber-grape-100 pb-3 pt-0.5">
						<Container className="max-w-xl">
							<div className="flex flex-row items-center justify-between">
								{!addingNew ? (
									<div className="my-2 flex justify-end">
										<button
											onClick={() => setAddingNew(true)}
											className="block rounded-lg bg-cyber-grape-500 px-2 py-1 text-cyber-grape-50 ring-1 ring-cyber-grape-700 hover:bg-cyber-grape-700 hover:text-white focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600"
										>
											Add New
										</button>
									</div>
								) : null}{" "}
								<div className="font-medium">
									<p className="text-[0.65rem]">Today&apos;s Date:</p>
									<p className="text-sm font-medium">{date}</p>
								</div>
							</div>

							<section className="w-full rounded-lg bg-cyber-grape-50 ">
								{addingNew ? (
									<AddNewExpenseItem handleClose={handleClose} />
								) : null}
								{exp?.map((expense) => (
									<ExpenseListItem key={expense?._id} expense={expense} />
								))}
							</section>
							<section className="py-10">
								<div className="flex flex-row justify-between">
									<h1 className="text-center text-3xl font-semibold text-cyber-grape-400 md:text-left lg:py-1">
										Breakdown
									</h1>
									<div className="flex">
										<div className="relative">
											<RadioGroup
												value={activePeriod}
												onChange={setActivePeriod}
												className="grid grid-cols-2"
											>
												{["Paycheck", "Monthly"].map((period) => (
													<RadioGroup.Option
														key={period}
														value={period}
														className={clsx(
															"cursor-pointer border border-gray-300 py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm text-gray-700 outline-2 outline-offset-2 transition-colors",
															period === "Monthly"
																? "rounded-l-lg"
																: "-ml-px rounded-r-lg"
														)}
													>
														{period}
													</RadioGroup.Option>
												))}
											</RadioGroup>
											<div
												aria-hidden="true"
												className={clsx(
													"pointer-events-none absolute inset-0 z-10 grid grid-cols-2 overflow-hidden rounded-lg bg-cyber-grape-400 transition-all duration-300",
													activePeriod === "Paycheck"
														? "[clip-path:inset(0_50%_0_0)]"
														: "[clip-path:inset(0_0_0_calc(50%-1px))]"
												)}
											>
												{["Paycheck", "Monthly"].map((period) => (
													<div
														key={period}
														className={clsx(
															"my-auto text-center text-sm font-semibold text-white [&:not(:focus-visible)]:focus:outline-none",
															period === "Paycheck" && "-ml-px"
														)}
													>
														{period}
													</div>
												))}
											</div>
										</div>
									</div>
								</div>

								<hr className="border-y border-cyber-grape-600" />
								<div className="my-0.5 items-center py-1 text-center">
									<p className="text-sm font-medium text-cyber-grape-700 md:text-base">
										Total {activePeriod} Expenses:
									</p>
									{activePeriod === "Monthly" ? (
										<p
											className={clsx(
												"text-lg font-medium text-cyber-grape-400 transition duration-300",
												activePeriod === "Paycheck" &&
													"pointer-events-none translate-x-6 select-none opacity-0"
											)}
										>
											${expensesTotal}
										</p>
									) : (
										<p
											className={clsx(
												"text-lg font-medium text-cyber-grape-400 transition duration-300",
												activePeriod === "Monthly" &&
													"pointer-events-none -translate-x-6 select-none opacity-0"
											)}
										>
											${perPeriodExp}
										</p>
									)}
									<div className="mx-auto flex flex-row justify-evenly text-center">
										<ArrowDownLeftIcon className="h-7 w-7 animate-pulse text-cyber-grape-300 " />
										<ArrowDownRightIcon className="h-7 w-7 animate-pulse text-cyber-grape-300" />
									</div>
								</div>
								<div className="my-0.5 mx-auto flex flex-row justify-between py-1">
									<div className="flex flex-col items-center ">
										<h1 className="text-sm font-medium text-cyber-grape-700 md:text-base">
											Matt&apos;s Net Income
										</h1>
										{activePeriod === "Monthly" ? (
											<p
												className={clsx(
													"text-lg font-medium text-cyber-grape-400 transition duration-300",
													activePeriod === "Paycheck" &&
														"pointer-events-none translate-x-6 select-none opacity-0"
												)}
											>
												${mattMonthlyIncome}
											</p>
										) : (
											<p
												className={clsx(
													"text-lg font-medium text-cyber-grape-400 transition duration-300",
													activePeriod === "Monthly" &&
														"pointer-events-none -translate-x-6 select-none opacity-0"
												)}
											>
												${mattPerCheckIncome}
											</p>
										)}
									</div>
									<div className="flex flex-col items-center">
										<h1 className="text-sm font-medium text-cyber-grape-700 md:text-base">
											Sarah&apos;s Net Income
										</h1>
										{activePeriod === "Monthly" ? (
											<p
												className={clsx(
													"text-lg font-medium text-cyber-grape-400 transition duration-300",
													activePeriod === "Paycheck" &&
														"pointer-events-none translate-x-6 select-none opacity-0"
												)}
											>
												${sarahMonthlyIncome}
											</p>
										) : (
											<p
												className={clsx(
													"text-lg font-medium text-cyber-grape-400 transition duration-300",
													activePeriod === "Monthly" &&
														"pointer-events-none -translate-x-6 select-none opacity-0"
												)}
											>
												${sarahPerCheckIncome}
											</p>
										)}
									</div>
								</div>
								<div className="my-0.5 py-1 text-center">
									<div className="mx-auto flex flex-row justify-evenly text-center">
										<ArrowDownRightIcon className="h-7 w-7 animate-pulse text-cyber-grape-300" />
										<ArrowDownLeftIcon className="h-7 w-7  animate-pulse text-cyber-grape-300" />
									</div>
									<p className="mt-1 pt-1 text-sm font-medium text-cyber-grape-700 md:text-base">
										Total {activePeriod} Income:
									</p>
									{activePeriod === "Monthly" ? (
										<p
											className={clsx(
												"text-lg font-medium text-cyber-grape-400 transition duration-300",
												activePeriod === "Paycheck" &&
													"pointer-events-none translate-x-6 select-none opacity-0"
											)}
										>
											${jointMonthlyIncome}
										</p>
									) : (
										<p
											className={clsx(
												"text-lg font-medium text-cyber-grape-400 transition duration-300",
												activePeriod === "Monthly" &&
													"pointer-events-none -translate-x-6 select-none opacity-0"
											)}
										>
											${jointPerPeriodIncome}
										</p>
									)}
								</div>
								<div className="my-0.5 py-1 text-center">
									<ChevronDoubleDownIcon className="mx-auto mb-0.5 h-7 w-7 animate-pulse text-cyber-grape-300" />
									<h1 className="pt-1 text-sm font-medium text-cyber-grape-700 md:text-base">
										Total Left Over:
									</h1>
									<div className="mx-auto w-fit rounded-full border-2 border-cyber-grape-600 bg-cyber-grape-50 p-2">
										{activePeriod === "Monthly" ? (
											<p
												className={clsx(
													"text-lg font-medium text-cyber-grape-400 transition duration-300",
													activePeriod === "Paycheck" &&
														"pointer-events-none translate-x-6 select-none opacity-0"
												)}
											>
												~ ${jointMonthlyIncome - expensesTotal}
											</p>
										) : (
											<p
												className={clsx(
													"text-lg font-medium text-cyber-grape-400 transition duration-300",
													activePeriod === "Monthly" &&
														"pointer-events-none -translate-x-6 select-none opacity-0"
												)}
											>
												~ ${jointPerPeriodIncome - perPeriodExp}
											</p>
										)}
									</div>
								</div>
							</section>
						</Container>
					</main>
				</div>
			)}
		</>
	);
}

export default Dashboard;
