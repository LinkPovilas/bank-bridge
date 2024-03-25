export interface BankPayment {
  amount: string;
  currency: string;
  endToEndId: string;
  remittanceInformationUnstructured: string;
  creditorName: string;
  creditorIban: string;
  debtorIban: string;
}
