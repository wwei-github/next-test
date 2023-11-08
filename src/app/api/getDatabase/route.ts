import { NextResponse } from "next/server";

import { Client } from "@notionhq/client";
import { NextApiRequest, NextApiResponse } from "next";
const notion = new Client({
  auth: "secret_ET5vUoXz7Pz9fuwlSD6kd6S5xxvN4qFsxQoSW5ZzIqI",
});

export const GET = async (req, res: NextResponse) => {
  const response = await notion.databases.query({
    database_id: "d91f344d-4cff-46fa-a72c-59994828d64b",
    // filter: {
    //   or: [
    //     {
    //       property: "In stock",
    //       checkbox: {
    //         equals: true,
    //       },
    //     },
    //     {
    //       property: "Cost of next trip",
    //       number: {
    //         greater_than_or_equal_to: 2,
    //       },
    //     },
    //   ],
    // },
    // sorts: [
    //   {
    //     property: "Last ordered",
    //     direction: "ascending",
    //   },
    // ],
  });

  const data = response.results.map((item) => transformer(item));
  console.log(data);
  return NextResponse.json(data);
};
 function transformer(page: any) {
   let data: any = {};
   for (const key in page.properties) {
     switch (page.properties[key].type) {
       case "relation":
         data[key] = page.properties[key].relation[0].id;
         break;

       case "title":
       case "rich_text":
         data[key] =
           page.properties[key][page.properties[key].type][0].text.content;
         break;

       default:
         console.log(key, page.properties);
         data[key] = page.properties[key][page.properties[key].type];
         break;
     }
   }
   return data;
 }
