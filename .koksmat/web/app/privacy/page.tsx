import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Privacy() {
  return (
    <div>
      <div>
        <div className="text-3xl mb-4">Privacy Statement</div>
        We partner with Microsoft Clarity and Microsoft Advertising to capture
        how you use and interact with our website through behavioral metrics,
        heatmaps, and session replay to improve and market our
        products/services. Website usage data is captured using first and
        third-party cookies and other tracking technologies to determine the
        popularity of products/services and online activity. Additionally, we
        use this information for site optimization, fraud/security purposes, and
        advertising. For more information about how Microsoft collects and uses
        your data, visit the{" "}
        <a
          target="_blank"
          href="https://privacy.microsoft.com/en-US/privacystatement"
        >
          Microsoft Privacy Statement
        </a>
        .
        <div className="mt-10">
          <Link href="/">
            <Button className="">Front page</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
