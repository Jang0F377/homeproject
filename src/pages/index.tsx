import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import PageNotFound from "../components/PageNotFound";

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>Garrett Home App</title>
				<link rel="icon" href="/public/favicon.ico" />
			</Head>
			<main>
				<PageNotFound />
			</main>
		</div>
	);
};

export default Home;
