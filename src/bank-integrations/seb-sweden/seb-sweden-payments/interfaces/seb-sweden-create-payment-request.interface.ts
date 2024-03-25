export interface CreateSebSwedenCreatePaymentRequest {
  bankCharges?: string; // See specific payment types.
  categoryPurpose?: string; // Value to be used to determine if the payment is a Split payment (VATX) or a Tax payment (TAXS)
  chargeBearer?: string; // Charge sharing instructions for corporate payments.
  creditorAccount?: {
    bban?: string; // Debtor account number in BBAN format, only for corporate payments.
    bgnr?: string;
    iban?: string; // Debtor account number in IBAN format
    pgnr?: string;
  };
  creditorAccountMessage?: string; // A message shown on creditor account statement. Only usable with some payment products.
  creditorName: string;
  creditorAddress?: {
    city?: string;
    country?: string;
    postalCode?: string;
    street?: string;
  };
  creditorAgentBic?: string;
  creditorAgentOther?: {
    clearingSystemId?: string;
    memberId?: string;
  };
  creditorDetails?: any; // See specific payment types.
  debtorAccount?: {
    bban?: string; // Debtor account number in BBAN format, only for corporate payments.
    iban?: string; // Debtor account number in IBAN format
  };
  debtorAccountMessage?: string; // A message shown on debtor account statement, max length depending on payment product
  debtorAgentBic?: string;
  debtorReceipt?: boolean; // Receipt can be requested for some payment types.
  endToEndIdentification?: string;
  instructedAmount?: {
    amount?: string;
    currency?: string;
    equivalentAmount?: string; // Amount in SEK for non SEK account
  };
  instructionId?: string; // All fields after this are only relevant to corporate payments. The remitters own reference which will be stated in the transaction reporting by the bank in order to identify the transaction. It will not be forwarded to the beneficiary.
  intermediaryAgentBic?: string;
  regulatoryReporting?: {
    debitCreditReportingIndicator?: string;
    reportingCode?: string;
    reportingInformation?: string;
  }[];
  remittanceInformationStructured?: {
    reference?: string; // The structured remittance reference number for the payment.
    referenceType?: 'OCR' | 'SCOR'; // Type of reference number.
  };
  remittanceInformationUnstructured?: string; // Message field to creditor.
  requestedExecutionDate?: string; // Requested execution date of transaction in format yyyy-mm-dd. If the date is not a valid bank date for the payment product, then the payment will be rejected.
  templateId?: string; // Optional field in input. If provided it needs to match product in path.
}
