import Container from "./Container";
import Header from "./Header";

const PageNotFound = () => {
	return (
		<>
			<Header />
			<Container className="relative flex flex-col bg-cyber-grape-600">
				<div className="mx-auto max-w-7xl px-4 py-16 text-center ">
					<p className="text-xl font-semibold text-white text-opacity-50">
						404
					</p>
					<h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
						Uh oh! I think you’re lost.
					</h1>
					<p className="mt-2 text-lg font-medium text-cyber-grape-50 text-opacity-50">
						It looks like the page you’re looking for doesn&apos;t exist.
					</p>
					<img src={"/IMG_0966.webp"} className="mx-auto mt-12 h-96 rounded " />
				</div>
			</Container>
		</>
	);
};

export default PageNotFound;
