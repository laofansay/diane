import { IRefund } from '@/app/shared/model/refund.model'
import dayjs from 'dayjs'

import { IAddress } from './address.model'
import { ICart } from './cart.model'

export interface OrderForm {
   address?: IAddress
   carts?: Array<ICart>
   paymentMethod?: ''
}
