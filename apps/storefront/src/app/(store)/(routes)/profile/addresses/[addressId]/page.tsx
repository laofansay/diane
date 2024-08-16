
import { AddressForm } from './components/address-form'

export default async function AddressPage({
   params,
}: {
   params: { addressId: string }
}) {
   const address =[]

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 p-8 pt-6">
            <AddressForm initialData={address} />
         </div>
      </div>
   )
}
