"use client";
import { useGet } from "@/hooks/api/useGet";
import { columns } from "./table-columns";

import { TableForm } from "@/components/page-structure/table-form";
import { CardLoading } from "@/components/loading/card";
import { DeleteDialog } from "./delete-dialog";
import { PayDialog } from "./pay-dialog";

type DebtType = {
    _id: string;
    supplier: string;
    state: string;
    total: string;
    paid: string;
    pending: string;
    created_At: Date;
};

const SuppliersDebts = () => {
    const { data, isPending, error } = useGet<DebtType>("/api/show/suppliers-debts", ["debts"]);

    if (isPending) return <CardLoading />;
    if (error) return <h1>{error?.message}</h1>;

    return (
        <TableForm
            pageTitle="Suppliers Bills List"
            columns={columns}
            data={data!}
            filterBy={["supplier"]}
            totalFor="pending"
            navigate={{ to: "/statements/suppliers", text: "New Statement" }}
        >
            <DeleteDialog />
            <PayDialog />
        </TableForm>
    );
};

SuppliersDebts.displayName = "SuppliersDebts";
export default SuppliersDebts;
