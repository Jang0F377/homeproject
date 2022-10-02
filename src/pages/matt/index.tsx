import { useEffect, useState } from "react";
import { HomeProject } from "../../../typings";
import AddNewProjectItem from "../../components/AddNewProjectItem";
import Container from "../../components/Container";
import DashboardHeader from "../../components/DashboardHeader";
import Loading from "../../components/Loading";
import PageNotFound from "../../components/PageNotFound";
import PriorityListItem from "../../components/PriorityListItem";

function Matt() {
	const [projects, setProjects] = useState<Array<HomeProject>>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [addingNew, setAddingNew] = useState(false);

	const handleClose = () => {
		setAddingNew(false);
	};

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <PageNotFound />;
	}

	return (
		<div id={"matt"} className="min-h-full">
			<div className="bg-cyber-grape-50 pb-32">
				<DashboardHeader />
				<header className="border-y border-cyber-grape-600 py-1 md:border-y-0 md:border-t">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h1 className="text-center text-4xl font-semibold text-cyber-grape-700 md:text-left">
							Matts
						</h1>
					</div>
				</header>
			</div>
			<main className="mx-auto -mt-32 max-w-7xl space-y-3 rounded bg-cyber-grape-100 pb-3 pt-0.5">
				<Container className="my-3 max-w-xl">
					{!addingNew ? (
						<div className="my-2 flex justify-end">
							<button
								onClick={() => setAddingNew(true)}
								className="block rounded-lg bg-cyber-grape-500 px-2 py-1 text-cyber-grape-50 ring-1 ring-cyber-grape-700 hover:bg-cyber-grape-700 hover:text-white focus:outline focus:outline-offset-2 focus:outline-cyber-grape-600"
							>
								Add New
							</button>
						</div>
					) : null}
					<section className=" w-full rounded-lg bg-cyber-grape-50 ">
						{addingNew ? (
							<AddNewProjectItem route={"matt"} handleClose={handleClose} />
						) : null}
						{projects?.map((proj) => (
							<PriorityListItem project={proj} key={proj._id} />
						))}
					</section>
				</Container>
			</main>
		</div>
	);
}

export default Matt;
