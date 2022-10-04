import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import clsx from "clsx";
import Link from "next/link";
import { HeaderDashboardNavLinks } from "./DashboardNavLinks";
import Avatar from "react-avatar";
import { useRouter } from "next/router";
import { useAppDispatch } from "../hooks/hooks";
import { logoutUser } from "../features/user/userSlice";

const DashboardHeader = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const navigation = [
		["Expenses", "/dashboard"],
		["Sarah's", "/sarah"],
		["Matt's", "/matt"],
		["Home Projects", "/projects"],
	];

	return (
		<>
			<Disclosure as="nav" className="bg-cyber-grape-100">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
							<div>
								<div className="flex  items-center justify-between px-4 sm:px-0">
									<div className="flex items-center">
										<div className="flex-shrink-0">
											<img
												src={"/IMG_0159.webp"}
												alt="ERR"
												className=" h-24 overflow-hidden rounded-full object-scale-down py-1 lg:w-40 "
											/>
										</div>
										<div className="hidden md:mx-auto md:block">
											<div className="ml-10 flex items-baseline space-x-4">
												<div className="hidden items-center md:flex md:gap-x-14 ">
													<HeaderDashboardNavLinks />
												</div>
											</div>
										</div>
									</div>
									<div className="hidden items-center md:block">
										<div className="ml-4 flex items-center md:ml-6">
											{/* Profile dropdown */}
											<Menu as="div" className="relative ml-3">
												<div className="items-center">
													<Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm ">
														<span className="sr-only">Open user menu</span>
													</Menu.Button>
												</div>
												<Transition
													as={Fragment}
													enter="transition ease-out duration-100"
													enterFrom="transform opacity-0 scale-95"
													enterTo="transform opacity-100 scale-100"
													leave="transition ease-in duration-75"
													leaveFrom="transform opacity-100 scale-100"
													leaveTo="transform opacity-0 scale-95"
												>
													<Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
														<Menu.Item>
															{({ active }) => (
																<a
																	href={"#"}
																	className={clsx(
																		active ? "bg-gray-100" : "",
																		"block px-4 py-2 text-sm text-gray-700"
																	)}
																>
																	Settings
																</a>
															)}
														</Menu.Item>
														<Menu.Item>
															{({ active }) => (
																<a
																	className={clsx(
																		active ? "bg-gray-100" : "",
																		"block cursor-pointer px-4 py-2 text-sm text-gray-700"
																	)}
																>
																	Sign out
																</a>
															)}
														</Menu.Item>
													</Menu.Items>
												</Transition>
											</Menu>
										</div>
									</div>
									<div className="-mr-2 flex md:hidden">
										{/* Mobile menu button */}
										<Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-cyber-grape-600 ring-1 ring-cyber-grape-700 hover:bg-cyber-grape-700 hover:text-white ">
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XMarkIcon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											) : (
												<Bars3Icon
													className="block h-6 w-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>
						</div>

						<Disclosure.Panel className="md:hidden">
							<div className="space-y-1 px-2 py-3 sm:px-3">
								{navigation.map(([label, href]) => (
									<Link
										key={label}
										href={href}
										className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-cyber-grape-700 hover:bg-cyber-grape-700 hover:text-white hover:ring-1 hover:ring-cyber-grape-50"
									>
										<div aria-current={label ? "page" : undefined}>{label}</div>
									</Link>
								))}
							</div>
							<div className="border-t border-gray-700 pt-4 pb-3">
								<div className="flex items-center px-5">
									<div className="flex-shrink-0">
										<img className="h-10 w-10 rounded-full" alt="" />
									</div>
									<div className="ml-3 space-y-1">
										<div className="text-xs font-medium leading-none text-cyber-grape-tone-1"></div>
										<div className="text-sm font-medium leading-none text-cyber-grape-tone-1"></div>
									</div>
								</div>
								<div className="mt-3 space-y-1 px-2">
									<Disclosure.Button
										as="a"
										href={"#"}
										className="block rounded-md px-3 py-2 text-base font-medium text-cyber-grape-700 hover:bg-cyber-grape-700 hover:text-white hover:ring-1 hover:ring-cyber-grape-50"
									>
										Settings
									</Disclosure.Button>
									<Disclosure.Button
										as="a"
										onClick={() => {
											dispatch(logoutUser());
											router.replace("/");
										}}
										className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-cyber-grape-700 hover:bg-cyber-grape-700 hover:text-white hover:ring-1 hover:ring-cyber-grape-50"
									>
										Sign out
									</Disclosure.Button>
								</div>
							</div>
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</>
	);
};

export default DashboardHeader;
