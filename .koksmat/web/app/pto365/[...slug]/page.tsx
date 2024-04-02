//import p from "./page.json";
import * as fs from "fs";
import * as path from "path";
import { LinkItem, TopNav } from "../components/topnav";

import { redirect } from "next/navigation";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Periodic Table of Microsoft 365",
  description: "",
};
export default function Page(param: { params: { slug: string[] } }) {
  const { slug } = param.params;

  if (slug.length < 2) {
    redirect("/pto365");
  }
  const here = path.join(
    process.cwd(),
    "app",
    "sites",
    "[...slug]",
    ...slug,
    "page.json"
  );

  const links: LinkItem[] = [];
  let error = "";

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <div
        className="fixed w-screen top-0  h-[40px] bg-white"
        style={{ zIndex: 1 }}
      >
        <TopNav title={""} links={links} />
      </div>
      <div className="mt-[40px]">dsfdsfds</div>
      {/* <pre>{JSON.stringify({ here }, null, 2)}</pre> */}
    </div>
  );
}
