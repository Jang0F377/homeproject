const nestHeaders = {
	"Content-Type": "application/json",
	Authorization: "matt",
};

export const myHeaders = new Headers(nestHeaders);

// IP https://my-home-project.us/
// http://localhost:3000/
export const EXPENSE_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/expenses/"
		: "https://my-home-project.us/expenses/";

export const PROJECT_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/projects/"
		: "https://my-home-project.us/projects/";

export const SARAH_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/sarah/"
		: "https://my-home-project.us/sarah/";
export const MATT_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/matt/"
		: "https://my-home-project.us/matt/";

export const LOGIN_URL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000/login/"
		: "https://my-home-project.us/login";
