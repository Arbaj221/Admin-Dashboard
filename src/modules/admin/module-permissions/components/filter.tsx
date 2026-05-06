import { useEffect, useState } from "react";

import { Input } from "src/components/ui/input";

import {
    Search,
    X,
} from "lucide-react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

const ModulePermissionFilters = ({
    value,
    onChange,
}: Props) => {

    const [search, setSearch] = useState(value);

    // ✅ debounce
    useEffect(() => {
        const timer = setTimeout(() => {
            onChange(search);
        }, 400);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="relative w-full max-w-sm">

            {/* SEARCH ICON */}
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            {/* INPUT */}
            <Input
                placeholder="Search permissions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-9"
            />

            {/* CLEAR */}
            {search && (
                <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                    <X size={16} />
                </button>
            )}

        </div>
    );
};

export default ModulePermissionFilters;