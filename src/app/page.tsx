"use client";
import { useEffect, useState } from "react";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import "katex/dist/katex.min.css";
import { NotionRenderer } from "react-notion-x";
import useSWR from "swr";
const fetcher = (...args) => fetch(args[0]).then((res) => res.json());
export default function Home() {
  const { data } = useSWR(["/api/user"], fetcher);
  const { data: data2, error, isLoading } = useSWR(["/api/getPage"], fetcher);
  const { data: database } = useSWR(["/api/database"], fetcher);
  const { data: databaseData } = useSWR(["/api/getDatabase"], fetcher);

  console.log(databaseData);
  return (
    <main style={{ padding: "20px", maxWidth: "90%" }}>
      {data && (
        <NotionRenderer recordMap={data2} fullPage={true} darkMode={false} />
      )}
    </main>
  );
}
