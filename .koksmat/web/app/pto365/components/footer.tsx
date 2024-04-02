import Link from "next/link";
import CookieConsent from "react-cookie-consent";

export default function Footer() {
  return (
    <div>
      <div className="bg-slate-700">
        <div className="container py-20 text-white space-x-4">
          {" "}
          <Link className="text-white hover:underline" href="/privacy">
            Privacy Statement - This site
          </Link>
          <Link
            className="text-white hover:underline"
            href="https://www.nexigroup.com/en/privacy-policy/"
          >
            Privacy Statement - Nexi Group
          </Link>
          <Link
            className="text-white hover:underline"
            href="https://www.nexigroup.com/en/legal-notice/"
          >
            Legal Notice - Nexi Group
          </Link>
        </div>
      </div>
      <CookieConsent>
        We improve this site by using Microsoft Clarity to see how you use it.
        By using this site, you agree that we and Microsoft can collect and use
        this data. Our{" "}
        <Link className="text-white underline" href="/privacy">
          privacy statement{" "}
        </Link>{" "}
        has more details. Beside that, we store the pincode you have entered for
        easing you next visit.
      </CookieConsent>
    </div>
  );
}
