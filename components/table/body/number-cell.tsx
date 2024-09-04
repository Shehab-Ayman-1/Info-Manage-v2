import { Row } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

type NumberCellProps = {
    row: Row<any>;
    name: string;
    showUnit?: boolean;
};

export const NumberCell = ({ row, name, showUnit }: NumberCellProps) => {
    const text = useTranslations("public");
    const value: number = row.original[name] || row.getValue(name);
    const unitValue: string = row.original.unit || row.getValue("unit");

    return `${value?.toLocaleString()} ${showUnit ? text(unitValue) : ""}`;
};

NumberCell.displayName = "NumberCell";
