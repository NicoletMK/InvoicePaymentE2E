export interface IInvoiceBase {
  id?: number;

  client_name: string;
  client_id: number;
  client_email?: string;

  date: Date;

  invoice_name: string;
  invoice_items: IInvoiceItem[];
  invoice_currency: Currency;

  isPaid?: boolean;

  // proper state check should be put here
  invoice_type?: InvoiceType;
  payfreq?: PaymentFrequency;
}

export interface IInvoiceItem {
  service_name: string;
  price: number;
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  INR = "INR",
  JPY = "JPY",
}

export enum InvoiceType {
  ONE_TIME_PAYMENT = "One-Time",
  RECURRING_PAYMENT = "Recurring",
}

export enum PaymentFrequency {
  MONTHLY = "Monthly",
  QUARTERLY = "Quarterly",
  YEARLY = "Yearly",
  WEEKLY = "Weekly",
}

/**
 * Array of both types of invoices (but also awkwardly can be IInoviceBase)
 */
export type IInvoiceHistory = IInvoiceBase[];

/*
interface IInvoice_OneTime extends IInvoiceBase {
  type: InvoiceType.ONE_TIME_PAYMENT;
}
interface IInvoice_Recurring extends IInvoiceBase {
  type: InvoiceType.RECURRING_PAYMENT;

  payment_frequency: PaymentFrequency;
}
*/
