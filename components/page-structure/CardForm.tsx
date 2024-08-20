"use client";
import { Button } from "@/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/ui/card";
import { cn } from "@/utils/shadcn";

type CardFormProps = {
    heading: string;
    submitText?: string;
    disabled?: boolean;
    onSubmit?: (event: any) => void;
    children: React.ReactNode;
};

export const CardForm = ({ heading, submitText, disabled, onSubmit, children }: CardFormProps) => {
    return (
        <Card className="bg-gradient mx-auto mt-8 max-w-2xl border-slate-400 shadow-lg dark:border-slate-600">
            <CardContent className="">
                <CardHeader
                    className={cn(
                        "bg-gradient-heavy w-[80%] rounded-lg text-center font-bold text-white !shadow-xl dark:text-black",
                        "mx-auto -mt-8 mb-6 text-xl sm:-mt-16 sm:text-2xl",
                    )}
                >
                    <CardTitle>{heading}</CardTitle>
                </CardHeader>

                {children}

                {submitText && (
                    <CardFooter className="mt-6 p-0 pt-4">
                        <Button
                            type="submit"
                            size="lg"
                            className="w-full text-base sm:text-lg"
                            disabled={disabled}
                            onSubmit={onSubmit}
                        >
                            {submitText}
                        </Button>
                    </CardFooter>
                )}
            </CardContent>
        </Card>
    );
};

CardForm.displayName = "CardForm";
