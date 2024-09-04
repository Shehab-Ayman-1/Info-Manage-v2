import { useTranslations } from "next-intl";

import { Button } from "@/ui/button";
import { cn } from "@/utils/shadcn";
import { useKey } from "react-use";
import { useRef } from "react";

type SubmitButtonProps = {
    text: string;
    isPending: boolean;
    className?: string;
};

export const SubmitButton = ({ text, isPending, className }: SubmitButtonProps) => {
    const t = useTranslations("buttons");
    const ref = useRef<HTMLButtonElement>(null);

    useKey(
        (event) => !event.ctrlKey && event.key === "Enter",
        () => ref.current?.click(),
    );

    return (
        <Button
            type="submit"
            size="lg"
            ref={ref}
            className={cn("my-4 w-full text-base font-bold sm:text-lg", className)}
            disabled={isPending}
        >
            {t(text)}
        </Button>
    );
};

SubmitButton.displayName = "SubmitButton";
