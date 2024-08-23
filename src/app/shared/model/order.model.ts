import dayjs from 'dayjs';
import { IRefund } from '@/app/shared/model/refund.model';

export interface IOrder {
  id?: number;
  number?: number;
  status?: string;
  total?: number;
  shipping?: number;
  payable?: number;
  tax?: number;
  discount?: number;
  paid?: boolean;
  completed?: boolean;
  createdAt?: dayjs.Dayjs;
  updatedAt?: dayjs.Dayjs;
}

export const defaultValue: Readonly<IOrder> = {
  paid: false,
  completed: false,
};
