import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from 'src/components/ui/table';

import { Button } from 'src/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';

interface Props {
    data: any[];
    onEdit: (row: any) => void;
    onDelete: (row: any) => void;
}

const AppSettingsTable = ({ data, onEdit, onDelete }: Props) => {
    return (
        <div className="overflow-x-auto border border-border rounded-md">
            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Key</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                                No settings found
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow key={row.id} className="even:bg-lightprimary/80">

                                <TableCell>{row.key}</TableCell>

                                <TableCell className="max-w-[200px] whitespace-normal break-words">
                                    {row.value}
                                </TableCell>

                                <TableCell className="max-w-[250px] whitespace-normal break-words">
                                    {row.description || '—'}
                                </TableCell>

                                <TableCell>
                                    <StatusBadge value={row.isActive ? 'Active' : 'Inactive'} />
                                </TableCell>

                                <TableCell>{row.createdAt}</TableCell>
                                <TableCell>{row.updatedAt}</TableCell>

                                <TableCell>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="lightprimary" onClick={() => onEdit(row)}>
                                            <Pencil size={16} />
                                        </Button>

                                        <Button size="sm" variant="lighterror" onClick={() => onDelete(row)}>
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                </TableCell>

                            </TableRow>
                        ))
                    )}
                </TableBody>

            </Table>
        </div>
    );
};

export default AppSettingsTable;