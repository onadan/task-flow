"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useTaskFlowStore } from "@/store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AuthForm({
  className,
  mode,
  ...props
}: {
  mode: "register" | "login";
  className?: string;
}) {
  const router = useRouter();
  const { login, register } = useTaskFlowStore();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const success =
      mode === "login" ? login({ email }).user : register({ email, name }).user;

    if (!success) {
      setError(
        mode === "login" ? "Invalid credentials" : "User already exists"
      );
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <Image
                  src="/flow.svg"
                  className="size-6"
                  alt="taskflow app logo"
                  width={24}
                  height={24}
                />
                {/* <GalleryVerticalEnd className="size-6" /> */}
              </div>
              <span className="sr-only">TaskFlow</span>
            </a>
            <h1 className="text-xl font-bold">
              {mode === "login" ? "Welcome back" : "Welcome to TaskFlow"}
            </h1>
            <FieldDescription>
              {mode === "login"
                ? "Don't have an account?"
                : `Already have an account?`}{" "}
              <Link href={mode === "login" ? "/auth/register" : "/auth/login"}>
                {mode === "login" ? "Sign up" : "Login"}
              </Link>
            </FieldDescription>
          </div>
          {mode === "register" && (
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
          )}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Field>

          {error && (
            <Field className="border-primary border bg-primary/10 p-4 rounded-lg">
              {" "}
              <p className="text-red-500 text-sm">{error}</p>
            </Field>
          )}

          <Field>
            <Button type="submit">
              {mode === "login" ? "Login" : "Register"}
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
