import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { HomeProject } from "../../typings";

interface SavedTowardProjectTrackerProps {
	project: HomeProject;
}

const SavedTowardProjectTracker: FC<SavedTowardProjectTrackerProps> = ({
	project,
}) => {
	const [projectCost] = useState(project.details?.cost);
	const [projectSaved] = useState(project.details?.savedTowardCost);
	const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	const [howClose] = useState((projectSaved!! / projectCost!!) * 100);

	let [determineBase10, setDetermineBase10] = useState(
		projectCost && projectCost!! / 10
	);

	return (
		<>
			<div className="mx-10 mt-2 flex flex-col pt-1">
				<div className="flex flex-col items-center justify-between md:flex-row">
					<h1 className="hidden text-xs font-medium text-cyber-grape-700 md:flex">
						First step
					</h1>
					<div className="flex justify-center text-xs font-medium text-cyber-grape-700">
						{Math.round(howClose)}% there!
					</div>

					<h1 className="flex py-1 text-xs font-medium text-cyber-grape-700">
						Yayyy!
					</h1>
				</div>

				<div className="flex w-full flex-col-reverse items-center md:flex-row md:divide-x  md:divide-green-900">
					{arr.map((x) => (
						<div
							key={x + 0}
							className={clsx(
								"md:first: w-full border border-green-900 py-4  text-center  text-xs font-medium text-cyber-grape-700 md:border-y md:border-x-0 md:py-5 md:first:rounded-l-full  md:last:rounded-r-full md:last:border-r ",
								Math.round(howClose) >= Number(`${x}0`)
									? "bg-green-600"
									: "bg-white"
							)}
						>
							${determineBase10}
						</div>
					))}
				</div>
				<h1 className="flex justify-center py-1 md:hidden">0</h1>
			</div>
		</>
	);
};

export default SavedTowardProjectTracker;
