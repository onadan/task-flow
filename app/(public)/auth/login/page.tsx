import { AuthForm } from "@/features/auth";

export default function Page() {
  return (
    <div className="min-h-[calc(100svh-200px)] flex h-full w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm ">
        <AuthForm mode="login" />
      </div>
    </div>
  );
}
