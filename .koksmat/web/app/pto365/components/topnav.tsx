"use client";
import { SITENAME } from "@/app/global";
import Logo from "@/koksmat/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ScrollSpy from "react-scrollspy-navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { GiHamburgerMenu } from "react-icons/gi";

export function BurgerMenu(prop: { links: JSX.Element[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <GiHamburgerMenu></GiHamburgerMenu>
      </SheetTrigger>
      <SheetContent>
        {/* <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader> */}
        <div className="grid gap-4 py-4 overflow-y-scroll">
          <div className="mb-1">On this page</div>
          <ScrollSpy activeClass="nav-active">{prop.links}</ScrollSpy>
        </div>

        {/* <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}

export type LinkItem = {
  title: string;
  href: string;
};
export type TopNavProps = {
  title: string;
  links: LinkItem[];
  debug?: boolean;
};
export function TopNav(props: TopNavProps) {
  const { title, debug } = props;
  const links = props.links.map((link) => {
    return (
      <a href={link.href} key={link.href} className="ml-2 pt-1 text-nowrap">
        {link.title}
      </a>
    );
  });
  return (
    <div className=" bg-white p-4 border-b" style={{ zIndex: 1 }}>
      <div className="container">
        <div className="flex ">
          <div className="flex items-center">
            {/* <Logo homeUrl={"/"} /> */}
          </div>
          <Link href="#" className="text-black">
            <div className="ml-4 pt-2 text-2xl text-nowrap">{SITENAME}</div>
          </Link>
          <div className="grow"></div>
          <div className="mt-4 lg:hidden">
            {links.length > 0 && <BurgerMenu links={links} />}
          </div>
          {/* <div className="hidden lg:flex ml-10  items-center space-x-4 overflow-x-scroll">
            <ScrollSpy activeClass="nav-active">{links}</ScrollSpy>
          </div> */}
        </div>
        {debug && <pre>{JSON.stringify(props, null, 2)}</pre>}
      </div>
    </div>
  );
}
