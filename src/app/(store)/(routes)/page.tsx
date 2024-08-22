'use client'
import { getEntities } from '@/app/shared/reducers/entities/banner.reducer'
import {
   BlogPostCard,
   BlogPostGrid,
   BlogPostSkeletonGrid,
} from '@/components/native/BlogCard'
import Carousel from '@/components/native/Carousel'
import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import { isVariableValid } from '@/lib/utils'
import { useAppDispatch, useAppSelector } from '@/store'
import { useEffect } from 'react'
import { getEntities as getProdlistEntities } from '@/app/shared/reducers/entities/product.reducer'

export default async function Index() {

   const dispatch = useAppDispatch();
   const banners = useAppSelector(state => state.banner.entities);
   const products = useAppSelector(state => state.product.entities);
   useEffect(() => {
      dispatch(
         getEntities({
            sort: `id ,desc`,
         }),
      );
      dispatch(
         getProdlistEntities({
            sort: `id ,desc`,
         }),
      );
   }, []);


   const blogs = []


   return (
      <div className="flex flex-col border-neutral-200 dark:border-neutral-700">
         <Carousel images={banners.map((obj) => obj.images)} />
         <Separator className="my-8" />
         <Heading
            title="Products"
            description="Below is a list of products we have available for you."
         />
         {isVariableValid(products) ? (
            <ProductGrid products={products} />
         ) : (
            <ProductSkeletonGrid />
         )}
         <Separator className="my-8" />
         {isVariableValid(blogs) ? (
            <BlogPostGrid blogs={blogs} />
         ) : (
            <BlogPostSkeletonGrid />
         )}
      </div>
   )
}
