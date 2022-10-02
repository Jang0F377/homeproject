// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function changePriority(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { ...args } = JSON.parse(req.body);
	const id: string = args.id;
	const newPriority: number = args.newPriority;

	try {
		res.status(200).json({ message: "Successfully Changed" });
	} catch (e) {
		return res.status(500).json({ message: e });
	}
}
