"use client";
import { TriangleAlertIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { RestoreDialog } from "./restore-dialog";
import { Alert } from "@/ui/alert";

type TrashProductsType = {
    category: string;
    company: string;
    product: string;
    barcode: string;
    unit: string;
    marketCount: string;
    storeCount: string;
};

const TrashProducts = () => {
    const { data, isPending, error } = useGet<TrashProductsType[]>("/api/trash", ["trash"]);
    const text = useTranslations();

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="pages.trash.heading"
            columns={columns}
            data={data}
            navigate={[{ text: "new-statement", to: "/clients/statements/new" }]}
        >
            <Alert variant="warning" className="mx-auto w-fit">
                <TriangleAlertIcon />
                <span>{text("public.trash-expiration")}</span>
            </Alert>
            <RestoreDialog />
        </TableForm>
    );
};

TrashProducts.displayName = "TrashProducts";
export default TrashProducts;
