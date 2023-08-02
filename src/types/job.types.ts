export interface IJob {
  _id: string;
  title: string;
  payType: string;
  payRate: string;
  desc: string;
  createdBy?: string[];
}
