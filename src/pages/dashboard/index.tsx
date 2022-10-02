import Loading from "../../components/Loading";
import PageNotFound from "../../components/PageNotFound";
import DashboardHeader from "../../components/DashboardHeader";
import { useState } from "react";

function Dashboard() {
	const [isAuthenticated, setIsAuthenticated] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	if (isLoading) {
		return <Loading />;
	}

	if (!isAuthenticated) {
		return <PageNotFound />;
	}

	return (
		<>
			{isAuthenticated && (
				<div id={"dashboard"} className="min-h-full">
					<div className="bg-cyber-grape-50 pb-32">
						<DashboardHeader />
						<header className="border-y border-cyber-grape-600 py-1 md:border-y-0 md:border-t">
							<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
								<h1 className="text-center text-4xl font-semibold text-cyber-grape-700 md:text-left">
									Dashboard
								</h1>
							</div>
						</header>
					</div>
					<main className="-mt-32 space-y-3 bg-cyber-grape-50 pt-3 "></main>
				</div>
			)}
		</>
	);
}

export default Dashboard;
