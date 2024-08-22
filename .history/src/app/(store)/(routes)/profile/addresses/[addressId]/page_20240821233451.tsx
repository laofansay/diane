import prisma from '@/lib/prisma'

import { AddressForm } from './components/address-form'


export default async function AddressPage({
   params,
}: {
   params: { addressId: string }
}) {

   const dispatch = useAppDispatch();

   const pageLocation = useLocation();
   const navigate = useNavigate();

   const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

   const addressList = useAppSelector(state => state.address.entities);
   const loading = useAppSelector(state => state.address.loading);

   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 p-8 pt-6">
            <AddressForm initialData={address} />
         </div>
      </div>
   )
}
