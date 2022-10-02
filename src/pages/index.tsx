import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import PageNotFound from "../components/PageNotFound";

const Home: NextPage = () => {
	const test = fetch("http://localhost:3000/expenses")
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((res) => console.log(res));
	return (
		<div>
			<Head>
				<title>Garrett Home App</title>
				<link rel="icon" href="/public/favicon.ico" />
			</Head>
			<Header />
			<main>
				<PageNotFound />
			</main>
		</div>
	);
};

export default Home;
