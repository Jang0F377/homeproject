import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { LOGIN_URL } from "../../app/constants";
import { loginUser } from "../../features/user/userSlice";
import { useAppDispatch } from "../../hooks/hooks";

const Login: FC = () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [secret, setSecret] = useState("");
	const [response, setResponse] = useState("");
	const dispatch = useAppDispatch();

	const loginFlow = async () => {
		await fetch(LOGIN_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: `${username}`,
				password: `${password}`,
				secretPhase: `${secret}`,
			}),
		})
			.then((res) => {
				if (res.ok) {
					dispatch(
						loginUser({
							username: username,
							password: password,
							name: username.slice(0, 3),
						})
					);
					localStorage.setItem(
						"user",
						JSON.stringify({
							username: username,
							password: password,
							name: username.slice(0, 3),
						})
					);
					localStorage.setItem("isAuthenticated", "true");
					router.replace("dashboard");
				} else {
					return res.json();
				}
			})
			.then((res) => setResponse(res));
	};
	const resetFields = () => {
		setUsername("");
		setPassword("");
		setSecret("");
		setResponse("");
	};

	useEffect(() => {
		const authed = localStorage.getItem("isAuthenticated");
		if (authed === "true") {
			const user = localStorage.getItem("user");
			const parsed = JSON.parse(user!!);
			dispatch(loginUser(parsed));
			router.replace("dashboard");
		}
	}, []);

	useEffect(() => {
		if (response) {
			setTimeout(() => {
				resetFields();
			}, 4000);
		}
	}, [response]);

	return (
		<>
			<div className="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<img
						className="w-30 mx-auto h-auto overflow-hidden rounded"
						src="/IMG_0571.webp"
						alt="ERR"
					/>
					<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
						Sign in to your account
					</h2>
				</div>
				{response ? <div>{JSON.stringify(response, null, 2)}</div> : <div />}

				<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<form className="space-y-6" action="#" method="POST">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Username
								</label>
								<div className="mt-1">
									<input
										value={username}
										onChange={(e) => setUsername(e.target.value)}
										type="text"
										autoComplete="text"
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<label className="block text-sm font-medium text-gray-700">
									Password
								</label>
								<div className="mt-1">
									<input
										type="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										autoComplete="current-password"
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Secret
								</label>
								<div className="mt-1">
									<input
										type="password"
										value={secret}
										onChange={(e) => setSecret(e.target.value)}
										required
										className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>

							<div>
								<button
									type="button"
									onClick={loginFlow}
									className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
								>
									Sign in
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
