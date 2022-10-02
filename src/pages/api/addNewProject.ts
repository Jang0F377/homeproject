// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function changePriority(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { ...args } = JSON.parse(req.body);
	// Type should be either projects || matt || sarah
	const type: string = args.type;
	const name: string = args.name;
	const priority: number = args.priority;

	try {
		return res.status(200).json({ message: "New Project Posted Successfully" });
	} catch (e) {
		return res.status(500).json({ message: e });
	}
}
