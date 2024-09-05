import { Badge } from '@/components/ui/badge'
import React from 'react'

const Price = (product) => {
   const price = (product?.price * product?.discount) / 100
   if (product.discount > 0) {
      const price = (product?.price * product?.discount) / 100
      return (
         <div className="flex gap-2 items-center">
            <Badge className="flex gap-4" variant="destructive">
               <div className="line-through">${product?.price}</div>
               <div>{product?.discount}%222222222222222</div>
            </Badge>
            <h2 className="">${price.toFixed(2)}11111111</h2>
         </div>
      )
   }

   return <h2>${product?.price}</h2>
}

export default Price
