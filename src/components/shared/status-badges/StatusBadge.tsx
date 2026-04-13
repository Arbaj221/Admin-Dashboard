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
    | 'Normal'
    | 'High'
    // Client/Vendor Status
    | 'Active'
    | 'Inactive';

const badgeConfig: Record<BadgeValue, string> = {
    // ── Status ──────────────────────────────────────────
    'Live': 'bg-lightsuccess dark:bg-success/20 text-successemphasis dark:text-success',
    'Completed': 'bg-lightinfo    dark:bg-info/20    text-infoemphasis    dark:text-info',
    'Pending': 'bg-lightwarning dark:bg-warning/20 text-warningemphasis dark:text-warning',
    'Cancelled': 'bg-lighterror   dark:bg-error/20   text-erroremphasis   dark:text-error',
    'Pause': 'bg-lightwarning dark:bg-warning/20 text-warningemphasis dark:text-warning',
    'Non Started': 'bg-muted        dark:bg-muted/40   text-muted-foreground',

    // ── Campaign Type ────────────────────────────────────
    'Email': 'bg-lightinfo      dark:bg-info/20      text-infoemphasis      dark:text-info',
    'BANT': 'bg-lightwarning   dark:bg-warning/20   text-warningemphasis   dark:text-warning',
    'Telemarketing': 'bg-lightsecondary dark:bg-secondary/20 text-secondaryemphasis dark:text-secondary',

    // ── Department ───────────────────────────────────────
    'DataOps': 'bg-lightinfo      dark:bg-info/20      text-infoemphasis      dark:text-info',

    // ── Priority ─────────────────────────────────────────
    'High': 'bg-lighterror     dark:bg-error/20     text-erroremphasis     dark:text-error',
    'Normal': 'bg-lightinfo      dark:bg-info/20      text-infoemphasis      dark:text-info',
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