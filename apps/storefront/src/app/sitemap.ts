
const URL = process.env.NEXT_PUBLIC_URL

export default async function sitemap() {
   const products =[]
   const blogs =[]

   const routes = ['', '/products', '/blog'].map((route) => ({
      url: `${URL}${route}`,
      lastModified: new Date().toISOString(),
   }))

   return [...routes, ...products, ...blogs]
}
