'use client'
import React, { useState, useEffect } from 'react';

import { ProductGrid, ProductSkeletonGrid } from '@/components/native/Product'
import { Heading } from '@/components/native/heading'
import { Separator } from '@/components/native/separator'
import prisma from '@/lib/prisma'
import { isVariableValid } from '@/lib/utils'

import { useAppDispatch, useAppSelector } from '@/store/index';

import { getEntities } from '@/app/shared/reducers/entities/product.reducer';

import { getEntities as getBrandEntities } from '@/app/shared/reducers/entities/brand.reducer';

import { getEntities as getCategoryEntities } from '@/app/shared/reducers/entities/category.reducer';


import {
   AvailableToggle,
   BrandCombobox,
   CategoriesCombobox,
   SortBy,
} from './components/options'

export default async function Products({ searchParams }) {

   const dispatch = useAppDispatch();
   const products = useAppSelector(state => state.product.entities);
   const loading = useAppSelector(state => state.product.loading);

   const brands = useAppSelector(state => state.brand.entities);
   const loading1 = useAppSelector(state => state.brand.loading);
   const categories = useAppSelector(state => state.category.entities);
   const loading2 = useAppSelector(state => state.category.loading);

   const { sort, isAvailable, brand, category, page = 1 } = searchParams ?? null


   // 构建 query 对象
   const query = [
      brand ? `brand.name=${brand}` : '',
      category ? `tag=${category}` : ''
   ].filter(param => param !== '').join('&');


   const getAllEntities = () => {
      dispatch(
         getEntities({
            query,
            page: page - 1,
            size: 10,
            sort: `id,desc`,
         }),
      );
   }

   useEffect(() => {
      getAllEntities();
      getBrandEntities({ sort: "id,desc" });
      getCategoryEntities({ sort: "id,desc" });
   }, [sort]);






   return (
      <>
         <Heading
            title="Products"
            description="Below is a list of products you have in your cart."
         />
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
            <SortBy initialData={sort} />
            <CategoriesCombobox
               initialCategory={category}
               categories={categories}
            />
            <BrandCombobox initialBrand={brand} brands={brands} />
            <AvailableToggle initialData={isAvailable} />
         </div>
         <Separator />
         {isVariableValid(products) ? (
            <ProductGrid products={products} />
         ) : (
            <ProductSkeletonGrid />
         )}
      </>
   )
}

function getOrderBy(sort) {
   let orderBy

   switch (sort) {
      case 'featured':
         orderBy = {
            orders: {
               _count: 'desc',
            },
         }
         break
      case 'most_expensive':
         orderBy = {
            price: 'desc',
         }
         break
      case 'least_expensive':
         orderBy = {
            price: 'asc',
         }
         break

      default:
         orderBy = {
            orders: {
               _count: 'desc',
            },
         }
         break
   }

   return orderBy
}
