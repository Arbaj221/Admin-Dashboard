export interface Campaign {
  id: number;
  crmCode: string;
  name: string;
  type: 'Email' | 'BANT' | 'Telemarketing';
  startDate: string;
  endDate: string;
  method: string;
  allocation: number;
  delivered: number;
  accepted: number;
  deficit: number;
  status: 'Live' | 'Completed';
}
 