import Logo from "@/koksmat/components/logo";
import { TopNav } from "@/koksmat/components/topnav";
import { use } from "react";
import { hasValidPasswordInCookieStore } from "../login/server";
import { redirect } from "next/navigation";

export default async function JourneyLayoutRoot(props: {
  children: React.ReactNode;
}) {
  // const hasAccess = await hasValidPasswordInCookieStore();
  // if (!hasAccess) {
  //   redirect("/login");
  //   return;
  // }

  return <div>{props.children}</div>;
}
