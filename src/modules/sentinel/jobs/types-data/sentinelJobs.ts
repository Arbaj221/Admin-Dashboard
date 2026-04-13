// ── Types ──────────────────────────────────────────────
export interface SentinelJob {
  id: number;
  jobId: number;
  department: 'DataOps' | 'Email';
  campaignId: string;
  segmentId: string;
  batchIds: string[];
  uploadedFile: string | null;
  processedFile: string | null;
  invalidFile: string | null;
  status: 'Completed' | 'Pending';
  priority: 'Normal' | 'High' | 'Low';
}

// ── Data ──────────────────────────────────────────────
export const sentinelJobsData: SentinelJob[] = [
  {
    id: 1,
    jobId: 477,
    department: 'DataOps',
    campaignId: 'PV01_310326_0056',
    segmentId: '00062',
    batchIds: ['000070'],
    uploadedFile: 'DataOps_Upload_Sample-CRM.csv',
    processedFile: 'job_477_processed.csv',
    invalidFile: 'job_477_DataOps_invalid.csv',
    status: 'Completed',
    priority: 'Normal',
  },
  {
    id: 2,
    jobId: 476,
    department: 'Email',
    campaignId: 'PV01_310326_0057',
    segmentId: '00063',
    batchIds: ['00004V', '00005A', '00005M', '00005O', '00006E', '00006F', '00006G', '00006I'],
    uploadedFile: 'DataOps_Upload_Sample.csv',
    processedFile: 'job_476_processed.csv',
    invalidFile: 'job_476_DataOps_invalid.csv',
    status: 'Completed',
    priority: 'High',
  },
  {
    id: 3,
    jobId: 475,
    department: 'DataOps',
    campaignId: 'PV02_310326_0058',
    segmentId: '00064',
    batchIds: ['00003A', '00003B'],
    uploadedFile: 'DataOps_Upload_Sample-CRM.csv',
    processedFile: null,
    invalidFile: 'job_475_DataOps_invalid.csv',
    status: 'Pending',
    priority: 'Low',
  },
  {
    id: 4,
    jobId: 474,
    department: 'Email',
    campaignId: 'PV02_310326_0059',
    segmentId: '00065',
    batchIds: ['00001X', '00002Y', '00003Z'],
    uploadedFile: null,
    processedFile: null,
    invalidFile: null,
    status: 'Pending',
    priority: 'Normal',
  },
  {
    id: 5,
    jobId: 473,
    department: 'DataOps',
    campaignId: 'PV03_310326_0060',
    segmentId: '00066',
    batchIds: ['000080'],
    uploadedFile: 'DataOps_Upload_Sample.csv',
    processedFile: 'job_473_processed.csv',
    invalidFile: null,
    status: 'Completed',
    priority: 'High',
  },
  {
    id: 6,
    jobId: 472,
    department: 'Email',
    campaignId: 'PV03_310326_0061',
    segmentId: '00067',
    batchIds: ['00007A', '00007B', '00007C', '00007D', '00007E', '00007F'],
    uploadedFile: null,
    processedFile: null,
    invalidFile: null,
    status: 'Pending',
    priority: 'Low',
  },
];