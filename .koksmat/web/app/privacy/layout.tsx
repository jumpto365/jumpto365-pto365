import { TopNav } from "../pto365/components/topnav";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div>
      <TopNav title={"Before you start"} links={[]} />
      <div className="h-screen w-screen overflow-scroll p-10 container ">
        <div>{children}</div>
      </div>
    </div>
  );
}
