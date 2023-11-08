import { NextResponse } from "next/server";

import { NotionAPI } from "notion-client";
const notion = new NotionAPI();

export const GET = async (req: Request, res: Response) => {
  const recordMap = await notion.getPage(
    "e1e14b57-c2d4-4bd9-a937-3b4fb05d7281"
  );
  return NextResponse.json(recordMap);
};
