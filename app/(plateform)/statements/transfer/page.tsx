"use client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

import { useUpdate } from "@/hooks/api/useUpdate";
import { useLists } from "@/hooks/data/useLists";
import { place } from "@/constants";

import { editSchema, EditTransferSchema } from "@/app/api/statements/transfer/schema";
import { CardForm } from "@/components/page-structure/CardForm";
import { ComboBox } from "@/components/ui/comboBox";
import { Input } from "@/ui/input";

type TransferProps = {};

const Transfer = ({}: TransferProps) => {
    const { formState, register, setValue, reset, clearErrors, handleSubmit } = useForm({ resolver: zodResolver(editSchema) });
    const { mutate, isPending } = useUpdate<EditTransferSchema>("/api/statements/transfer", ["market", "store"]);

    const { products } = useLists();

    const { errors } = formState;

    useEffect(() => {
        (async () => await products.fetcher?.())();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const { productId, place, count } = data as EditTransferSchema;
        mutate({ productId, place, count }, { onSuccess: () => reset() });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <CardForm heading="Transfer Products" submitText="Transfer" disabled={isPending}>
                <div className="flex-between">
                    <ComboBox
                        label="Products"
                        name="productId"
                        loading={products.isLoading}
                        groups={products.groups}
                        error={errors.productId}
                        setValue={setValue}
                        clearErrors={clearErrors}
                    />
                    <ComboBox label="Transfer To (Place)" name="place" error={errors.place} items={place} setValue={setValue} />
                </div>

                <Input type="number" placeholder="Count" error={errors.count} {...register("count", { valueAsNumber: true })} />
            </CardForm>
        </form>
    );
};

Transfer.displayName = "Transfer";
export default Transfer;
