import { useEffect, useState, useRef } from "react";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "src/components/ui/dialog";
import { Button } from "src/components/ui/button";
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from "src/components/ui/select";
import AutoComplete from "src/components/ui/AutoComplete";
import { Input } from "src/components/ui/input";
import { Label } from "src/components/ui/label";
import { Upload, FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Icon } from "@iconify/react";
import { campaignService } from "src/modules/campaigns/manageCampaigns/services/campaignService";
import { campaignSegmentService } from "src/modules/campaigns/campaignSegment/services/campaignSegmentService";
import { departmentService } from "src/modules/admin/departments/services/departmentService";

import DataOpsCsv from "src/config/sample-csv-files/DataOps_Upload_Sample.csv?url";
import DBRCsv from "src/config/sample-csv-files/DBR_Upload_Sample.csv?url";
import EmailCsv from "src/config/sample-csv-files/Email_Upload_Sample.csv?url";
import MISCsv from "src/config/sample-csv-files/MIS_Upload_Sample.csv?url";
import QualityCsv from "src/config/sample-csv-files/Quality_Upload_Sample.csv?url";
import VVCsv from "src/config/sample-csv-files/VV_Upload_Sample.csv?url";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Campaign {
  id: number;
  code?: string;
  campaign_name: string;
}

interface Segment {
  id: number;
  segment_code: string;
  title: string;
}

interface Department {
  id: number;
  name: string;
}

interface ValidationResult {
  valid: boolean;
  missing: string[];
  extra: string[];
}

// ── Row validation types ──────────────────────────────────────
interface RowIssue {
  label: string;
  count: number;
}

interface RowValidationResult {
  totalRows: number;
  validRows: number;
  invalidRows: number;
  issues: RowIssue[];
  canUpload: boolean; // true if at least 1 valid row
}

const CSV_MAP: Record<string, string> = {
  DataOps: DataOpsCsv,
  DBR: DBRCsv,
  Email: EmailCsv,
  Quality: QualityCsv,
  VV: VVCsv,
  MIS: MISCsv,
};

const getSampleFileName = (url: string): string => {
  const parts = url.split('/');
  return parts[parts.length - 1].split('?')[0];
};

const MAX_ROWS = 50000;

// ── Enum allowed values per department ───────────────────────
const ENUM_RULES: Record<string, Record<string, string[]>> = {
  DataOps: {
    'email validation status': ['valid', 'invalid', 'catch-all', 'unknown', 'ok'],
  },
  Email: {
    'email status': ['delivered', 'opened', 'clicked', 'soft bounce', 'hard bounce', 'unsubscribed'],
  },
  Quality: {
    'quality status': ['qualified', 'disqualified'],
  },
  DBR: {
    'db refresh status': ['yes', 'no'],
  },
  VV: {
    'vv disposition': ['connected', 'wrong number', 'no response', 'callback', 'interested', 'not interested'],
  },
  MIS: {
    'mis status': ['rtd', 'tbd', 'delivered', 'accepted', 'internal rejected', 'client rejected', 'high cpc'],
  },
};

// Conditional required fields: if col value is one of triggers, then required col must not be blank
const CONDITIONAL_REQUIRED: Record<string, { triggerCol: string; triggerValues: string[]; requiredCol: string; label: string }[]> = {
  Email: [
    {
      triggerCol: 'email status',
      triggerValues: ['soft bounce', 'hard bounce'],
      requiredCol: 'bounce reason',
      label: 'Bounce reason missing',
    },
  ],
  Quality: [
    {
      triggerCol: 'quality status',
      triggerValues: ['disqualified'],
      requiredCol: 'disqualified reason',
      label: 'Disqualified reason missing',
    },
  ],
};

// ── Helpers ──────────────────────────────────────────────────

const fetchSampleHeaders = async (url: string): Promise<string[]> => {
  const res = await fetch(url);
  const text = await res.text();
  const firstLine = text.split('\n')[0];
  return firstLine.split(',').map((h) => h.trim().replace(/^"|"$/g, '').toLowerCase());
};

const parseUploadedFile = (file: File): Promise<{ headers: string[]; rows: string[][]; rowCount: number }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const lines = text.split('\n').filter((l) => l.trim() !== '');
      if (lines.length === 0) return reject(new Error('Empty file'));
      const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, '').toLowerCase());
      const rows = lines.slice(1).map((line) =>
        line.split(',').map((cell) => cell.trim().replace(/^"|"$/g, ''))
      );
      resolve({ headers, rows, rowCount: rows.length });
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

const validateHeaders = (sampleHeaders: string[], uploadedHeaders: string[]): ValidationResult => {
  const sampleSet   = new Set(sampleHeaders);
  const uploadedSet = new Set(uploadedHeaders);
  const missing = sampleHeaders.filter((h) => !uploadedSet.has(h));
  const extra   = uploadedHeaders.filter((h) => !sampleSet.has(h));
  return { valid: missing.length === 0 && extra.length === 0, missing, extra };
};

// ── Row-level validation ──────────────────────────────────────
const validateRows = (
  departmentName: string,
  headers: string[],
  rows: string[][],
): RowValidationResult => {
  const enumRules       = ENUM_RULES[departmentName] || {};
  const conditionalRules = CONDITIONAL_REQUIRED[departmentName] || [];

  // Issue counters
  const issueCounts: Record<string, number> = {
    'Email format invalid':   0,
    'Missing required field': 0,
    'Invalid enum value':     0,
  };

  // Add conditional issue labels dynamically
  conditionalRules.forEach((r) => {
    issueCounts[r.label] = 0;
  });

  let validRows = 0;

  for (const row of rows) {
    const rowMap: Record<string, string> = {};
    headers.forEach((h, i) => { rowMap[h] = (row[i] ?? '').trim(); });

    let rowHasIssue = false;

    // 1. Required fields — any blank cell
    const hasBlank = headers.some((h) => !rowMap[h]);
    if (hasBlank) {
      issueCounts['Missing required field']++;
      rowHasIssue = true;
    }

    // 2. Email format — look for any header containing "email"
    const emailHeader = headers.find((h) => h.includes('email') && !h.includes('agent') && !h.includes('status'));
    if (emailHeader && rowMap[emailHeader]) {
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rowMap[emailHeader]);
      if (!emailValid) {
        issueCounts['Email format invalid']++;
        rowHasIssue = true;
      }
    }

    // 3. Enum validation
    for (const [col, allowed] of Object.entries(enumRules)) {
      if (rowMap[col] !== undefined && rowMap[col] !== '') {
        if (!allowed.includes(rowMap[col].toLowerCase())) {
          issueCounts['Invalid enum value']++;
          rowHasIssue = true;
          break; // count once per row
        }
      }
    }

    // 4. Conditional required fields
    for (const rule of conditionalRules) {
      const triggerVal = (rowMap[rule.triggerCol] ?? '').toLowerCase();
      if (rule.triggerValues.includes(triggerVal)) {
        if (!rowMap[rule.requiredCol]) {
          issueCounts[rule.label]++;
          rowHasIssue = true;
        }
      }
    }

    if (!rowHasIssue) validRows++;
  }

  const totalRows   = rows.length;
  const invalidRows = totalRows - validRows;

  const issues: RowIssue[] = Object.entries(issueCounts)
    .filter(([, count]) => count > 0)
    .map(([label, count]) => ({ label, count }));

  return {
    totalRows,
    validRows,
    invalidRows,
    issues,
    canUpload: validRows > 0,
  };
};

// ── Component ─────────────────────────────────────────────────

const SentinelBatchUploadDialog = ({ open, onOpenChange }: Props) => {
  const [loading, setLoading]               = useState(false);
  const [validating, setValidating]         = useState(false);
  const [campaigns, setCampaigns]           = useState<Campaign[]>([]);
  const [segments, setSegments]             = useState<Segment[]>([]);
  const [departments, setDepartments]       = useState<Department[]>([]);
  const [campaignId, setCampaignId]         = useState('');
  const [segmentId, setSegmentId]           = useState('');
  const [departmentId, setDepartmentId]     = useState('');
  const [file, setFile]                     = useState<File | null>(null);
  const [validation, setValidation]         = useState<ValidationResult | null>(null);
  const [rowValidation, setRowValidation]   = useState<RowValidationResult | null>(null);
  const [isDragging, setIsDragging]         = useState(false);
  const fileInputRef                        = useRef<HTMLInputElement>(null);

  const currentDepartment  = localStorage.getItem('Department') || '';
  const selectedDepartment = departments.find((d) => String(d.id) === departmentId);
  const sampleFile         = selectedDepartment ? CSV_MAP[selectedDepartment.name] : null;
  const sampleFileName     = sampleFile ? getSampleFileName(sampleFile) : null;
  const disableDepartmentSelect = !['DataOps', 'Management'].includes(currentDepartment);

  useEffect(() => {
    if (!open) return;
    loadInitialData();
  }, [open]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [campaignRes, departmentRes] = await Promise.all([
        campaignService.getAllCampaigns(),
        departmentService.getActiveDepartmentsList(),
      ]);
      setCampaigns(campaignRes || []);

      const allDepartments = departmentRes || [];
      let allowedDepartments: string[] = [];

      if (currentDepartment === 'DataOps') {
        allowedDepartments = ['DataOps', 'DBR'];
      } else if (currentDepartment === 'Management') {
        allowedDepartments = ['DataOps', 'Email', 'Quality', 'DBR', 'VV', 'MIS'];
      } else {
        allowedDepartments = [currentDepartment];
      }

      const filteredDepartments = allDepartments.filter((d: Department) =>
        allowedDepartments.includes(d.name),
      );
      setDepartments(filteredDepartments);

      if (filteredDepartments.length === 1) {
        setDepartmentId(String(filteredDepartments[0].id));
      }
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!campaignId) { setSegments([]); setSegmentId(''); return; }
    loadSegments();
  }, [campaignId]);

  const loadSegments = async () => {
    try {
      const res = await campaignSegmentService.getSegmentsByCampaignId(Number(campaignId));
      setSegments(res || []);
    } catch {
      setSegments([]);
    }
  };

  useEffect(() => {
    if (!open) {
      setCampaignId('');
      setSegmentId('');
      setDepartmentId('');
      setFile(null);
      setSegments([]);
      setValidation(null);
      setRowValidation(null);
      setIsDragging(false);
    }
  }, [open]);

  useEffect(() => {
    setFile(null);
    setValidation(null);
    setRowValidation(null);
  }, [departmentId]);

  const processFile = async (selected: File) => {
    if (!selected.name.endsWith('.csv')) {
      toast.error('Only CSV files are supported');
      return;
    }

    setFile(selected);
    setValidation(null);
    setRowValidation(null);

    if (!sampleFile) return;

    try {
      setValidating(true);

      const [sampleHeaders, { headers: uploadedHeaders, rows, rowCount }] = await Promise.all([
        fetchSampleHeaders(sampleFile),
        parseUploadedFile(selected),
      ]);

      if (rowCount > MAX_ROWS) {
        toast.error(
          `File too large — max ${MAX_ROWS.toLocaleString()} rows allowed. Your file has ${rowCount.toLocaleString()} rows.`,
        );
        setFile(null);
        return;
      }

      // 1. Header validation
      const headerResult = validateHeaders(sampleHeaders, uploadedHeaders);
      setValidation(headerResult);

      // 2. Row validation — only if headers pass
      if (headerResult.valid && selectedDepartment) {
        const rowResult = validateRows(selectedDepartment.name, uploadedHeaders, rows);
        setRowValidation(rowResult);

        if (rowResult.invalidRows === 0) {
          toast.success(`File validated — ${rowResult.validRows.toLocaleString()} rows ready to upload`);
        } else if (rowResult.canUpload) {
          toast.warning(`${rowResult.invalidRows.toLocaleString()} rows have issues — ${rowResult.validRows.toLocaleString()} valid rows will be uploaded`);
        } else {
          toast.error('No valid rows found — please fix your file');
        }
      }
    } catch {
      toast.error('Failed to validate file');
      setFile(null);
    } finally {
      setValidating(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) processFile(selected);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!departmentId) return;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (!departmentId) return;
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) processFile(dropped);
  };

  const handleUpload = async () => {
    if (!validation?.valid || !rowValidation?.canUpload) return;
    try {
      setLoading(true);
      const payload = { campaign_id: campaignId, segment_id: segmentId, department_id: departmentId, file };
      console.log(payload);
      toast.success('Batch uploaded successfully');
      onOpenChange(false);
    } catch {
      toast.error('Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !campaignId || !segmentId || !departmentId || !file || !validation?.valid || !rowValidation?.canUpload || validating || loading;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">

        {/* ── HEADER ── */}
        <DialogHeader className="px-6 py-5 border-b bg-lightprimary/30 dark:bg-white/5">
          <DialogTitle className="text-xl">Upload Sentinel Batch</DialogTitle>
          <DialogDescription>
            Upload and configure batch processing details.
          </DialogDescription>
        </DialogHeader>

        {/* ── BODY ── */}
        <div className="px-6 py-6 space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Campaign</Label>
              <AutoComplete
                value={campaignId}
                onChange={(value) => setCampaignId(value)}
                placeholder="Select campaign"
                options={campaigns.map((c) => ({
                  label: `${c.code} - ${c.campaign_name}`,
                  value: String(c.id),
                }))}
              />
            </div>
            <div className="space-y-2">
              <Label>Campaign Segment</Label>
              <AutoComplete
                value={segmentId}
                onChange={setSegmentId}
                placeholder="Select segment"
                options={segments.map((s) => ({
                  label: `${s.segment_code} - ${s.title}`,
                  value: String(s.id),
                }))}
                disabled={!campaignId}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label>Department</Label>
              <Select
                value={departmentId}
                onValueChange={setDepartmentId}
                disabled={disableDepartmentSelect}
              >
                <SelectTrigger className="w-full h-11">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((d) => (
                    <SelectItem key={d.id} value={String(d.id)}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Sample CSV</Label>
              {sampleFileName ? (
                <div className="h-11 flex items-center gap-2.5 px-3 rounded-md border border-border bg-muted/40">
                  <Icon icon="solar:file-text-linear" width={16} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground truncate">{sampleFileName}</span>
                  <button
                    type="button"
                    onClick={() => sampleFile && window.open(sampleFile, '_blank')}
                    className="ml-auto shrink-0 text-muted-foreground hover:text-primary transition-colors"
                    title="Download sample"
                  >
                    <Icon icon="solar:download-linear" width={16} />
                  </button>
                </div>
              ) : (
                <div className="h-11 flex items-center px-3 rounded-md border border-border bg-muted/20">
                  <span className="text-sm text-muted-foreground">Select a department first</span>
                </div>
              )}
            </div>
          </div>

          {/* ── File Upload ── */}
          <div className="space-y-2">
            <Label>Upload File</Label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => departmentId && fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 select-none
                ${!departmentId
                  ? 'opacity-50 cursor-not-allowed border-border bg-muted/10'
                  : isDragging
                    ? 'border-primary bg-lightprimary/40 cursor-copy scale-[1.01]'
                    : 'border-border hover:border-primary hover:bg-muted/20 cursor-pointer bg-muted/10'
                }
              `}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <div className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors
                  ${isDragging ? 'bg-primary text-white' : 'bg-lightprimary text-primary'}`}
                >
                  <Upload size={22} />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {isDragging ? 'Drop your file here' : 'Drag & drop or click to upload'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    CSV only · Max {MAX_ROWS.toLocaleString()} rows
                  </p>
                </div>
              </div>
              <Input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>

            {/* File preview */}
            {file && (
              <div className="flex items-center gap-3 rounded-lg border bg-background px-3 py-2.5">
                <FileText size={18} className="text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                {validating && (
                  <Icon icon="solar:spinner-linear" width={18} className="animate-spin text-muted-foreground shrink-0" />
                )}
                {!validating && validation?.valid && rowValidation?.invalidRows === 0 && (
                  <CheckCircle2 size={18} className="text-success shrink-0" />
                )}
                {!validating && ((validation && !validation.valid) || (rowValidation && rowValidation.invalidRows > 0)) && (
                  <AlertCircle size={18} className="text-error shrink-0" />
                )}
              </div>
            )}

            {/* ── Header validation errors ── */}
            {validation && !validation.valid && (
              <div className="rounded-lg border border-error/30 bg-lighterror/50 p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertCircle size={16} className="text-erroremphasis shrink-0" />
                  <p className="text-sm font-semibold text-erroremphasis">
                    Header mismatch — please fix your file
                  </p>
                </div>
                {validation.missing.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                      Missing columns ({validation.missing.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {validation.missing.map((h) => (
                        <span key={h} className="text-xs px-2 py-0.5 rounded-md bg-lighterror text-erroremphasis font-medium border border-error/20">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {validation.extra.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
                      Extra columns ({validation.extra.length})
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {validation.extra.map((h) => (
                        <span key={h} className="text-xs px-2 py-0.5 rounded-md bg-lightwarning text-warningemphasis font-medium border border-warning/20">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Download the sample CSV to see the correct column structure.
                </p>
              </div>
            )}

            {/* ── Row validation summary ── */}
            {validation?.valid && rowValidation && (
              <div className={`rounded-lg border p-4 space-y-3
                ${rowValidation.invalidRows === 0
                  ? 'border-success/30 bg-lightsuccess/50'
                  : 'border-warning/30 bg-lightwarning/30'
                }`}
              >
                {/* Summary counts */}
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-successemphasis shrink-0" />
                    <span className="text-sm font-semibold text-successemphasis">
                      {rowValidation.validRows.toLocaleString()} valid rows
                    </span>
                  </div>
                  {rowValidation.invalidRows > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertCircle size={15} className="text-warningemphasis shrink-0" />
                      <span className="text-sm font-semibold text-warningemphasis">
                        {rowValidation.invalidRows.toLocaleString()} rows with issues
                      </span>
                    </div>
                  )}
                </div>

                {/* Issue breakdown */}
                {rowValidation.issues.length > 0 && (
                  <div className="space-y-1.5 pl-1">
                    {rowValidation.issues.map((issue) => (
                      <div key={issue.label} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-warning shrink-0" />
                        <span>{issue.label}</span>
                        <span className="ml-auto font-semibold text-warningemphasis">
                          {issue.count.toLocaleString()} rows
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload note when mixed */}
                {rowValidation.invalidRows > 0 && rowValidation.canUpload && (
                  <p className="text-xs text-muted-foreground border-t border-warning/20 pt-2">
                    Only valid rows will be uploaded. Invalid rows will be skipped.
                  </p>
                )}

                {/* All invalid */}
                {!rowValidation.canUpload && (
                  <p className="text-xs text-erroremphasis font-medium">
                    No valid rows — please fix your file before uploading.
                  </p>
                )}
              </div>
            )}

          </div>
        </div>

        {/* ── FOOTER ── */}
        <DialogFooter className="px-6 py-4 border-t bg-muted/20">
          <Button variant="lighterror" onClick={() => onOpenChange(false)} disabled={loading}>
            Cancel
          </Button>
          <Button variant="lightprimary" disabled={isDisabled} onClick={handleUpload}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Icon icon="solar:spinner-linear" width={14} className="animate-spin" />
                Uploading...
              </span>
            ) : validating ? (
              <span className="flex items-center gap-2">
                <Icon icon="solar:spinner-linear" width={14} className="animate-spin" />
                Validating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Upload size={14} />
                Upload Batch
              </span>
            )}
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};

export default SentinelBatchUploadDialog;