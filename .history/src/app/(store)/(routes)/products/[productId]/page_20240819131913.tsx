'use client'
import Carousel from '@/components/native/Carousel'
import { isVariableValid } from '@/lib/utils'
import { ChevronRightIcon } from 'lucide-react'
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'

import { DataSection } from './components/data'
import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'
import { getEntity } from '@/app/shared/reducers/entities/product.reducer'

type Props = {
   params: { productId: string }
   searchParams: { [key: string]: string | string[] | undefined }
}


export default async function Product({
   params,
}: {
   params: { productId: number }
}) {

   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(getEntity(params.productId));
   }, []);
   const product = useAppSelector(state => state.product.entity);



   if (isVariableValid(product)) {
      return (
         <>
            <Breadcrumbs product={product} />
            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-3">
               <ImageColumn product={product} />
               <DataSection product={product} />
            </div>
         </>
      )
   }
}

const ImageColumn = ({ product }) => {
   let images = product?.images;
   // 检查 images 是否为数组
   if (!Array.isArray(images)) {
      if (typeof images === 'string') {
         // 如果是字符串，则将其转换为数组
         images = [images];
      } else {
         console.error('Expected images to be an array or a string but received:', images);
         return <div>No images available</div>;
      }
   }

   return (
      <div className="relative min-h-[50vh] w-full col-span-1">
         <Carousel images={product?.images} />
      </div>
   )
}

const Breadcrumbs = ({ product }) => {
   return (
      <nav className="flex text-muted-foreground" aria-label="Breadcrumb">
         <ol className="inline-flex items-center gap-2">
            <li className="inline-flex items-center">
               <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium"
               >
                  Home
               </Link>
            </li>
            <li>
               <div className="flex items-center gap-2">
                  <ChevronRightIcon className="h-4" />
                  <Link className="text-sm font-medium" href="/products">
                     Products
                  </Link>
               </div>
            </li>
            <li aria-current="page">
               <div className="flex items-center gap-2">
                  <ChevronRightIcon className="h-4" />
                  <span className="text-sm font-medium">{product?.title}</span>
               </div>
            </li>
         </ol>
      </nav>
   )
}
