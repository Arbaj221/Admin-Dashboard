import { Button } from "src/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "src/components/ui/select";
import { Label } from "src/components/ui/label";

interface Props {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
}

const Pagination = ({ page, limit, total, onPageChange, onLimitChange, }: Props) => {
    const totalPages = Math.ceil(total / limit);
    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-border">
            {/* LEFT */}
            <div className="flex gap-2">
                <Button
                    variant="lightprimary"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page <= 1}
                >
                    Previous
                </Button>

                <Button
                    variant="lightprimary"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages}
                >
                    Next
                </Button>
            </div>

            {/* CENTER */}
            <div className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{start}</span>–
                <span className="font-medium text-foreground">{end}</span> of{" "}
                <span className="font-medium text-foreground">{total}</span> results
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-2">
                <Label className="text-sm whitespace-nowrap">
                    Rows per page:
                </Label>

                <Select
                    value={String(limit)}
                    onValueChange={(v) => onLimitChange(Number(v))}
                >
                    <SelectTrigger className="w-20">
                        <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                        {[10, 20, 50, 100].map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

        </div>
    );
};

export default Pagination;