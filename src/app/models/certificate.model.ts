import { CertificateType } from './certificateType.model';

export type Certificate = {
  id: number;
  crewId: number;
  type: CertificateType;
  issueDate: string;
  expiryDate: string;
};
