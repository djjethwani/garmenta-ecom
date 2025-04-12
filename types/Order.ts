import { Product } from './Product';

interface Item {
  quantity: number;
  product: Product;
}

interface OrderItems {
  product: Product;
  quantity: number;
}

export type Order = {
  _id: string;
  total: number;
  downloadUrl: string;
  items: Item[];
  orderItems: OrderItems[];
  createdAt: Date;
};
