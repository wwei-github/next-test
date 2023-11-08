import { NextResponse } from "next/server";

import { Client } from "@notionhq/client";

const notion = new Client({
  auth: "secret_ET5vUoXz7Pz9fuwlSD6kd6S5xxvN4qFsxQoSW5ZzIqI",
});

export const GET = async (req: Request, res: Response) => {
  try {
    const response = await notion.search({
      query: "test",
      filter: {
        value: "database",
        property: "object",
      },
      sort: {
        direction: "ascending",
        timestamp: "last_edited_time",
      },
    });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json({ message: (e as Error).message });
  }
};
