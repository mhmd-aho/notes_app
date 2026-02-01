import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
          <Button variant="ghost" className="absolute top-4 left-4">
            <Link className="flex items-center gap-2" href="/">
              <ArrowLeft />
              Back
            </Link>
          </Button>
          {children}
    </>
  );
}
