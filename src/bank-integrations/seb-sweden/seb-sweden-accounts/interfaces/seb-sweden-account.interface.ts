import { SebSwedenAccountProduct } from '../enums/seb-sweden-account-product.enum';

export interface SebSwedenAccount {
  resourceId: string;
  iban: string;
  bban: string;
  status: string;
  currency: string;
  ownerName: string;
  product: SebSwedenAccountProduct;
  name: string;
  _links: {
    transactions: {
      href: string;
    };
  };
}
