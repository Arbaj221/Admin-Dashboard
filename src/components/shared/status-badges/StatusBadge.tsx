import { Badge } from 'src/components/ui/badge';

type BadgeValue =
    // Status
    | 'Live'
    | 'Completed'
    | 'Pending'
    | 'Cancelled'
    | 'Pause'
    | 'Non Started'
    // Campaign Type
    | 'Email'
    | 'BANT'
    | 'Telemarketing'
    // Department
    | 'DataOps'
    // Priority
    | 'Low'
    | 'Medium'
    | 'High'
    // Client/Vendor Status
    | 'Active'
    | 'Inactive';

const badgeConfig: Record<BadgeValue, string> = {
    // ── Status ──────────────────────────────────────────
    'Live': 'bg-green-100 text-green-700',
    'Completed': 'bg-blue-100 text-blue-700',
    'Pending': 'bg-green-100 text-green-700',
    'Cancelled': 'bg-pink-100 text-pink-700',
    'Pause': 'bg-yellow-100 text-yellow-700',
    'Non Started': 'bg-orange-100 text-orange-700',

    // ── Campaign Type ────────────────────────────────────
    'Email': 'bg-purple-100 text-purple-700',
    'BANT': 'bg-yellow-100 text-yellow-700',
    'Telemarketing': 'bg-indigo-100 text-indigo-700',

    // ── Department ───────────────────────────────────────
    'DataOps': 'bg-teal-100 text-teal-700',

    // ── Priority ─────────────────────────────────────────
    'High': 'bg-lighterror     dark:bg-error/20     text-erroremphasis     dark:text-error',
    'Medium': 'bg-lightinfo      dark:bg-info/20      text-infoemphasis      dark:text-info',
    'Low': 'bg-muted          dark:bg-muted/40     text-muted-foreground',

    // ── Client / Vendor Status ───────────────────────────
    'Active': 'bg-lightsuccess dark:bg-success/20 text-successemphasis dark:text-success',
    'Inactive': 'bg-lighterror   dark:bg-error/20   text-erroremphasis   dark:text-error',
};

interface StatusBadgeProps {
    value: BadgeValue;
}

const StatusBadge = ({ value }: StatusBadgeProps) => {
    const classes = badgeConfig[value] ?? 'bg-muted text-muted-foreground';

    return (
        <Badge className={`text-xs rounded-full px-3 py-1 font-medium whitespace-nowrap ${classes}`}>
            {value}
        </Badge>
    );
};

export default StatusBadge;