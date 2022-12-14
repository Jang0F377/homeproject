import { useEffect, useState } from "react";
import Container from "../../components/Container";
import DashboardHeader from "../../components/DashboardHeader";
import { HomeProject } from "../../../typings";
import Loading from "../../components/Loading";
import PageNotFound from "../../components/PageNotFound";
import ProjectListItem from "../../components/ProjectListItem";
import AddNewProjectItem from "../../components/AddNewProjectItem";
import { myHeaders, PROJECT_URL } from "../../app/constants";

function Projects() {
	const [projects, setProjects] = useState<Array<HomeProject>>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [addingNew, setAddingNew] = useState(false);

	const handleClose = () => {
		setAddingNew(false);
	};

	async function fetchProjects() {
		setLoading(true);
		await fetch(PROJECT_URL, {
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
				setProjects(res);
			})
			.then(() => setLoading(false))
			.catch((err) => {
				console.log(err);
				setError(true);
			});
	}

	useEffect(() => {
		fetchProjects().catch((e) => alert(e));
	}, []);

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return <PageNotFound />;
	}

	return (
		<div id={"projects"} className="min-h-full">
			<div className="bg-cyber-grape-50 pb-32">
				<DashboardHeader />
				<header className="border-y border-cyber-grape-600 py-1 md:border-y-0 md:border-t">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
						<h1 className="text-center text-4xl font-semibold text-cyber-grape-700 md:text-left">
							Projects
						</h1>
					</div>
				</header>
			</div>
			<main className="mx-auto -mt-32 max-w-7xl space-y-3 rounded bg-cyber-grape-100 pb-3 pt-0.5">
				<Container className=" my-3 max-w-xl">
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
							<AddNewProjectItem route={"project"} handleClose={handleClose} />
						) : null}
						{projects?.map((proj) => (
							<ProjectListItem
								key={proj._id}
								project={proj}
								whoseRoute={"project"}
							/>
						))}
					</section>
				</Container>
			</main>
		</div>
	);
}

export default Projects;
