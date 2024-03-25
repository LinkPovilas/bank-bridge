export interface SebSwedenPaymentInfo {
  creditorAccount?: {
    iban?: string;
  };
  creditorAccountMessage?: string;
  creditorName?: string;
  debtorAccount?: {
    iban: string;
  };
  debtorAccountMessage?: string;
  endToEndIdentification: string;
  instructedAmount: {
    amount: string;
    currency: string;
  };
  remittanceInformationStructured?: {
    reference: string;
    referenceType: 'OCR';
  };
  remittanceInformationUnstructured?: string;
  requestedExecutionDate: string;
  templateId: string;
}
