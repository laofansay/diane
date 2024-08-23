export interface IOrderItem {
  id?: number;
  count?: number;
  price?: number;
  discount?: number;
  product?: IProduct | null;
  orderItem?: IOrder | null;
}

export const defaultValue: Readonly<IOrderItem> = {};
