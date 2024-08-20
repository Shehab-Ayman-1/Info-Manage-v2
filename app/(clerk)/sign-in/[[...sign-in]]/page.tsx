"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { FacebookIcon } from "lucide-react";
import { Fragment } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { ClerkConnection } from "../../_components/start/clerk-connection";
import { CardForm } from "@/components/page-structure/CardForm";
import { ClerkAction } from "../../_components/start/clerk-action";
import { ClerkField } from "../../_components/start/clerk-field";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Icons } from "@/ui/icons";

export default function SignInPage() {
    return (
        <div className="grid w-full grow items-center px-4 sm:justify-center">
            <SignIn.Root>
                <Clerk.Loading>
                    {(isGlobalLoading) => (
                        <Fragment>
                            <SignIn.Step name="start">
                                <CardForm heading="Sign in to Info Manage">
                                    <div className="flex-between">
                                        <ClerkConnection name="facebook" isGlobalLoading={isGlobalLoading} Icon={FacebookIcon} />
                                        <ClerkConnection name="google" isGlobalLoading={isGlobalLoading} Icon={FacebookIcon} />
                                        <ClerkConnection name="microsoft" isGlobalLoading={isGlobalLoading} Icon={FacebookIcon} />
                                    </div>

                                    <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                                        or
                                    </p>
                                </CardForm>

                                <ClerkField label="Email Address" name="identifier" type="email" />

                                <ClerkAction
                                    isGlobalLoading={isGlobalLoading}
                                    navigate={{
                                        text: "Don't have an account? Sign up",
                                        href: "/sign-up",
                                    }}
                                />
                            </SignIn.Step>

                            <SignIn.Step name="choose-strategy">
                                <Card className="w-full sm:w-96">
                                    <CardHeader>
                                        <CardTitle>Use another method</CardTitle>
                                        <CardDescription>
                                            Facing issues? You can use any of these methods to sign in.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="grid gap-y-4">
                                        <SignIn.SupportedStrategy name="email_code" asChild>
                                            <Button type="button" variant="link" disabled={isGlobalLoading}>
                                                Email code
                                            </Button>
                                        </SignIn.SupportedStrategy>
                                        <SignIn.SupportedStrategy name="password" asChild>
                                            <Button type="button" variant="link" disabled={isGlobalLoading}>
                                                Password
                                            </Button>
                                        </SignIn.SupportedStrategy>
                                    </CardContent>
                                    <CardFooter>
                                        <div className="grid w-full gap-y-4">
                                            <SignIn.Action navigate="previous" asChild>
                                                <Button disabled={isGlobalLoading}>
                                                    <Clerk.Loading>
                                                        {(isLoading) => {
                                                            return isLoading ? (
                                                                <Icons.spinner className="size-4 animate-spin" />
                                                            ) : (
                                                                "Go back"
                                                            );
                                                        }}
                                                    </Clerk.Loading>
                                                </Button>
                                            </SignIn.Action>
                                        </div>
                                    </CardFooter>
                                </Card>
                            </SignIn.Step>

                            <SignIn.Step name="verifications">
                                <SignIn.Strategy name="password">
                                    <Card className="w-full sm:w-96">
                                        <CardHeader>
                                            <CardTitle>Check your email</CardTitle>
                                            <CardDescription>Enter the verification code sent to your email</CardDescription>
                                            <p className="text-sm text-muted-foreground">
                                                Welcome back <SignIn.SafeIdentifier />
                                            </p>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <Clerk.Field name="password" className="space-y-2">
                                                <Clerk.Label asChild>
                                                    <Label>Password</Label>
                                                </Clerk.Label>
                                                <Clerk.Input type="password" asChild>
                                                    <Input />
                                                </Clerk.Input>
                                                <Clerk.FieldError className="block text-sm text-destructive" />
                                            </Clerk.Field>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full gap-y-4">
                                                <SignIn.Action submit asChild>
                                                    <Button disabled={isGlobalLoading}>
                                                        <Clerk.Loading>
                                                            {(isLoading) => {
                                                                return isLoading ? (
                                                                    <Icons.spinner className="size-4 animate-spin" />
                                                                ) : (
                                                                    "Continue"
                                                                );
                                                            }}
                                                        </Clerk.Loading>
                                                    </Button>
                                                </SignIn.Action>
                                                <SignIn.Action navigate="choose-strategy" asChild>
                                                    <Button type="button" size="sm" variant="link">
                                                        Use another method
                                                    </Button>
                                                </SignIn.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignIn.Strategy>

                                <SignIn.Strategy name="email_code">
                                    <Card className="w-full sm:w-96">
                                        <CardHeader>
                                            <CardTitle>Check your email</CardTitle>
                                            <CardDescription>Enter the verification code sent to your email</CardDescription>
                                            <p className="text-sm text-muted-foreground">
                                                Welcome back <SignIn.SafeIdentifier />
                                            </p>
                                        </CardHeader>
                                        <CardContent className="grid gap-y-4">
                                            <Clerk.Field name="code">
                                                <Clerk.Label className="sr-only">Email verification code</Clerk.Label>
                                                <div className="grid items-center justify-center gap-y-2">
                                                    <div className="flex justify-center text-center">
                                                        <Clerk.Input
                                                            type="otp"
                                                            autoSubmit
                                                            className="flex justify-center has-[:disabled]:opacity-50"
                                                            render={({ value, status }) => {
                                                                return (
                                                                    <div
                                                                        data-status={status}
                                                                        className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=cursor]:ring-1 data-[status=selected]:ring-1 data-[status=cursor]:ring-ring data-[status=selected]:ring-ring"
                                                                    >
                                                                        {value}
                                                                    </div>
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                    <Clerk.FieldError className="block text-center text-sm text-destructive" />
                                                    <SignIn.Action
                                                        asChild
                                                        resend
                                                        className="text-muted-foreground"
                                                        fallback={({ resendableAfter }) => (
                                                            <Button variant="link" size="sm" disabled>
                                                                Didn&apos;t receive a code? Resend (
                                                                <span className="tabular-nums">{resendableAfter}</span>)
                                                            </Button>
                                                        )}
                                                    >
                                                        <Button variant="link" size="sm">
                                                            Didn&apos;t receive a code? Resend
                                                        </Button>
                                                    </SignIn.Action>
                                                </div>
                                            </Clerk.Field>
                                        </CardContent>
                                        <CardFooter>
                                            <div className="grid w-full gap-y-4">
                                                <SignIn.Action submit asChild>
                                                    <Button disabled={isGlobalLoading}>
                                                        <Clerk.Loading>
                                                            {(isLoading) => {
                                                                return isLoading ? (
                                                                    <Icons.spinner className="size-4 animate-spin" />
                                                                ) : (
                                                                    "Continue"
                                                                );
                                                            }}
                                                        </Clerk.Loading>
                                                    </Button>
                                                </SignIn.Action>
                                                <SignIn.Action navigate="choose-strategy" asChild>
                                                    <Button size="sm" variant="link">
                                                        Use another method
                                                    </Button>
                                                </SignIn.Action>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </SignIn.Strategy>
                            </SignIn.Step>
                        </Fragment>
                    )}
                </Clerk.Loading>
            </SignIn.Root>
        </div>
    );
}
