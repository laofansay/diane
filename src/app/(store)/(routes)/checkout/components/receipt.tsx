'use client'

import { Separator } from '@/components/native/separator'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useState } from 'react'

export function Receipt({ carts }) {
   const [paymentMethod, setPaymentMethod] = useState('credit-card')

   const handleCheckOut = async () => {
      try {
         await fetch(`/api/address/${params.addressId}`, {
            method: 'DELETE',
            cache: 'no-store',
         })
      } catch (error: any) {
      } finally {
      }
   }

   function calculatePayableCost() {
      let totalAmount = 0,
         discountAmount = 0

      for (const item of carts) {
         totalAmount +=
            (item?.count * item?.product?.price * item.product?.discount) / 100
         discountAmount += (item?.count * (100 - item?.product?.discount)) / 100
      }

      const afterDiscountAmount = totalAmount
      const taxAmount = afterDiscountAmount * 0.09
      const payableAmount = afterDiscountAmount + taxAmount

      return {
         totalAmount: totalAmount.toFixed(2),
         discountAmount: discountAmount.toFixed(2),
         afterDiscountAmount: afterDiscountAmount.toFixed(2),
         taxAmount: taxAmount.toFixed(2),
         payableAmount: payableAmount.toFixed(2),
      }
   }

   return (
      <Card className={'animate-pulse'}>
         <CardHeader className="p-4 pb-0  ">
            <h2 className="font-bold tracking-tight">小计</h2>
         </CardHeader>
         <CardContent className="p-4 text-sm">
            <div className="block space-y-[1vh]">
               <div className="flex justify-between">
                  <p>总额</p>
                  <h3>¥{calculatePayableCost().totalAmount}</h3>
               </div>
               <div className="flex justify-between">
                  <p>折扣</p>
                  <h3>¥{calculatePayableCost().discountAmount}</h3>
               </div>
               <div className="flex justify-between">
                  <p>税</p>
                  <h3>¥{calculatePayableCost().taxAmount}</h3>
               </div>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between">
               <p>应付金额</p>
               <h3 font-bold tracking-tight>
                  ¥{calculatePayableCost().payableAmount}
               </h3>
            </div>
         </CardContent>
         <Separator className="my-4" />
         <CardHeader className="p-4 pb-0">
            <h2 className="font-bold tracking-tight">支付方式</h2>
         </CardHeader>
         <CardContent className="p-4 text-sm">
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
               <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">信用卡</Label>
               </div>
               <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="alipay" id="alipay" />
                  <h3>支付宝</h3>
               </div>
               <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wechat-pay" id="wechat-pay" />
                  <h3>微信支付</h3>
               </div>
            </RadioGroup>

            {paymentMethod === 'credit-card' && (
               <div className="mt-4 space-y-4">
                  <Separator className="my-4" />
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

         <Separator />
         <CardFooter>
            <Button
               disabled={carts.length === 0}
               className="w-full"
               onClick={() => handleCheckOut()}
            >
               确认支付 ¥{calculatePayableCost().payableAmount}
            </Button>
         </CardFooter>
      </Card>
   )
}
