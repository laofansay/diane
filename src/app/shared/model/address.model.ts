import dayjs from 'dayjs'

export interface IAddress {
   id?: number
   tag?: string
   master?: boolean | null
   country?: string
   address?: string
   city?: string
   phone?: string
   name?: string
   postalCode?: string
   createdAt?: dayjs.Dayjs
}

export const defaultValue: Readonly<IAddress> = {
   master: false,
}
