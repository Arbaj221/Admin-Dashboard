import { useState, useMemo } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from 'src/components/ui/table';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/components/ui/select';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from 'src/components/ui/tooltip';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Icon } from '@iconify/react';
import CardBox from 'src/components/shared/CardBox';
import { sentinelCampaignData, SentinelCampaign } from '../types-data/sentinelCampaign';

const tableHeadings = [
    { key: 'campaignId', label: 'Campaign ID', sticky: true },
    { key: 'title', label: 'Title', sticky: true },
    { key: 'dataOpsTotal', label: 'DataOps Total', sticky: false },
    { key: 'dataOpsValid', label: 'DataOps Valid', sticky: false },
    { key: 'dataOpsInvalid', label: 'DataOps Invalid', sticky: false },
    { key: 'emailTotal', label: 'Email Total', sticky: false },
    { key: 'emailPending', label: 'Email Pending', sticky: false },
    { key: 'emailValid', label: 'Email Valid', sticky: false },
    { key: 'emailInvalid', label: 'Email Invalid', sticky: false },
    { key: 'qualityTotal', label: 'Quality Total', sticky: false },
    { key: 'qualityPending', label: 'Quality Pending', sticky: false },
    { key: 'qualityValid', label: 'Quality Valid', sticky: false },
    { key: 'qualityInvalid', label: 'Quality Invalid', sticky: false },
    { key: 'dbRefreshTotal', label: 'DB-Refresh Total', sticky: false },
    { key: 'dbRefreshPending', label: 'DB-Refresh Pending', sticky: false },
    { key: 'dbRefreshValid', label: 'DB-Refresh Valid', sticky: false },
    { key: 'dbRefreshInvalid', label: 'DB-Refresh Invalid', sticky: false },
    { key: 'vvTotal', label: 'V V Total', sticky: false },
    { key: 'vvPending', label: 'V V Pending', sticky: false },
    { key: 'vvValid', label: 'V V Valid', sticky: false },
    { key: 'vvInvalid', label: 'V V Invalid', sticky: false },
    { key: 'misTotal', label: 'MIS Total', sticky: false },
    { key: 'misPending', label: 'MIS Pending', sticky: false },
    { key: 'misDelivered', label: 'MIS Delivered', sticky: false },
    { key: 'misAccepted', label: 'MIS Accepted', sticky: false },
    { key: 'misClientRejected', label: 'MIS Client Rejected', sticky: false },
    { key: 'misRTD', label: 'MIS RTD', sticky: false },
    { key: 'misInternalRejected', label: 'MIS Internal Rejected', sticky: false },
];

const pageSizeOptions = [10, 20, 50, 100];
const TITLE_TRUNCATE = 30;

// Sticky left offset per column index
const stickyOffset = (index: number) => {
    if (index === 0) return 'left-0';
    if (index === 1) return 'left-[200px]';
    return '';
};

// Even row bg for sticky cells — solid so content doesn't bleed through
const stickyEvenBg = 'even:bg-lightprimary/80';

const SentinelCampaignsTable = () => {
    const [search, setSearch] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [page, setPage] = useState(1);

    const filtered = useMemo(() => {
        if (!search.trim()) return sentinelCampaignData;
        return sentinelCampaignData.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()),
        );
    }, [search]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

    const handleSearch = (val: string) => { setSearch(val); setPage(1); };
    const handlePageSize = (val: string) => { setPageSize(Number(val)); setPage(1); };

    const renderCell = (item: SentinelCampaign, key: string) => {
        const value = item[key as keyof SentinelCampaign];
        if (value === null || value === undefined) return '';
        return String(value);
    };

    return (
        <TooltipProvider delayDuration={200}>
            <CardBox>

                {/* ── Controls ── */}
                <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground whitespace-nowrap">Show entries</span>
                        <Select value={String(pageSize)} onValueChange={handlePageSize}>
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {pageSizeOptions.map((size) => (
                                    <SelectItem key={size} value={String(size)}>{size}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="relative">
                        <Icon
                            icon="solar:magnifer-linear"
                            width={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                            type="text"
                            placeholder="Search by title..."
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-9 w-64"
                        />
                    </div>
                </div>

                {/* ── Table ── */}
                <div className="overflow-x-auto border border-border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {tableHeadings.map((col, index) => (
                                    <TableHead
                                        key={col.key}
                                        className={`
                      text-sm font-semibold whitespace-nowrap
                      border-r border-border last:border-r-0
                      ${col.sticky
                                                ? `sticky ${stickyOffset(index)} z-20 bg-muted`
                                                : ''
                                            }
                      ${index === 0 ? 'min-w-[200px]' : ''}
                      ${index === 1 ? 'min-w-[250px]' : 'min-w-[110px]'}
                    `}
                                    >
                                        {col.label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {paginated.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={tableHeadings.length}
                                        className="text-center py-8 text-muted-foreground"
                                    >
                                        No records found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginated.map((item) => (
                                    <TableRow
                                        key={item.id}
                                        className="hover:bg-lightprimary transition-colors even:bg-lightprimary/80"
                                    >
                                        {tableHeadings.map((col, index) => {
                                            const raw = renderCell(item, col.key);
                                            const isTitle = col.key === 'title';
                                            const needsTooltip = isTitle && raw.length > TITLE_TRUNCATE;
                                            const displayText = needsTooltip ? `${raw.slice(0, TITLE_TRUNCATE)}...` : raw;

                                            return (
                                                <TableCell
                                                    key={col.key}
                                                    className={`
                            text-sm border-r border-border last:border-r-0
                            ${col.sticky
                                                            ? `sticky ${stickyOffset(index)} z-10 border-r border-border
                                 bg-background `
                                                            : ''
                                                        }
                            ${col.key === 'segmentId'
                                                            ? 'font-semibold text-primary whitespace-nowrap'
                                                            : ''
                                                        }
                            ${col.key === 'title'
                                                            ? 'font-medium text-foreground'
                                                            : 'text-muted-foreground text-center'
                                                        }
                          `}
                                                >
                                                    {needsTooltip ? (
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <span className="cursor-default whitespace-nowrap">
                                                                    {displayText}
                                                                </span>
                                                            </TooltipTrigger>
                                                            <TooltipContent side="top" className="max-w-xs text-xs">
                                                                {raw}
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    ) : (
                                                        <span className={isTitle ? '' : 'whitespace-nowrap'}>
                                                            {displayText}
                                                        </span>
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* ── Pagination ── */}
                <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
                    <p className="text-sm text-muted-foreground">
                        Showing{' '}
                        {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)}{' '}
                        of {filtered.length} entries
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        <span className="text-sm text-muted-foreground px-1">
                            Page {page} of {totalPages}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>

            </CardBox>
        </TooltipProvider>
    );
};


export default SentinelCampaignsTable;