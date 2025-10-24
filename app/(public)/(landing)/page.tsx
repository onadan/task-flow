import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <main className=" py-40 h-full flex flex-col justify-between items-center">
        <div className="mx-auto min-h-96 container flex justify-center items-center flex-col space-y-5 gap-4">
          <h1 className="text-7xl font-semibold text-center max-w-5xl">
            Organize work, stay focused, and get things done.
          </h1>
          <p className="text-center max-w-lg text-muted-foreground ">
            <span className="font-bold">taskflow </span>
            is your simple, smart task manager for projects and teams - fast,
            clean, and built for flow.
          </p>
          <div className="flex space-x-2 items-center">
            <Link href={"/auth/register"}>
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
