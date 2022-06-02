// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const END_POINT = "https://applemint-go-2gyldlncea-an.a.run.app/";

export default async function handler(
  _: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const resp = await fetch(END_POINT + "raindrop/collections");
  const json = await resp.json();
  res.status(200).json(json);
}
