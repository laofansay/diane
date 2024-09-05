'use client'

import { Separator } from '@/components/native/separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useAuthenticated } from '@/hooks/useAuthentication'
import { isVariableValid } from '@/lib/utils'
import { useCartContext } from '@/state/Cart'
import Link from 'next/link'
import { useState } from 'react'

export function PayMethod({}) {
   const [paymentMethod, setPaymentMethod] = useState('credit-card')

   const total = 100
   return (
      <Card>
         <CardHeader>
            <h2>支付方式</h2>
         </CardHeader>
         <CardContent>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
               <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">信用卡</Label>
               </div>
               <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="alipay" id="alipay" />
                  <Label htmlFor="alipay">支付宝</Label>
               </div>
               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wechat-pay" id="wechat-pay" />
                  <Label htmlFor="wechat-pay">微信支付</Label>
               </div>
            </RadioGroup>

            {paymentMethod === 'credit-card' && (
               <div className="mt-4 space-y-4">
                  <div>
                     <Label htmlFor="cardNumber">卡号</Label>
                     <Input id="cardNumber" placeholder="输入卡号" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor="expiryDate">有效期</Label>
                        <Input id="expiryDate" placeholder="MM/YY" />
                     </div>
                     <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="输入CVV" />
                     </div>
                  </div>
               </div>
            )}
         </CardContent>
         <CardFooter>
            <Button className="w-full">确认支付 ¥{total.toFixed(2)}</Button>
         </CardFooter>
      </Card>
   )
}
