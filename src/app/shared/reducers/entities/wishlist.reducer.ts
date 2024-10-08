import { IWishlist, defaultValue } from '@/app/shared/model/wishlist.model'
import {
   EntityState,
   IQueryParams,
   createEntitySlice,
   serializeAxiosError,
} from '@/app/shared/reducers/reducer.utils'
import { cleanEntity } from '@/app/shared/util/entity-utils'
import { ASC } from '@/app/shared/util/pagination.constants'
import { createAsyncThunk, isFulfilled, isPending } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: EntityState<IWishlist> = {
   loading: false,
   errorMessage: null,
   entities: [],
   entity: defaultValue,
   updating: false,
   updateSuccess: false,
}

const apiUrl = 'api/wishlists'

// Actions

export const getEntities = createAsyncThunk(
   'wishlist/fetch_entity_list',
   async ({ sort, query }: IQueryParams) => {
      const requestUrl = `${apiUrl}?${sort ? `sort=${sort}&${query}` : ` ${query}`}cacheBuster=${new Date().getTime()}`
      return axios.get<IWishlist[]>(requestUrl)
   },
   { serializeError: serializeAxiosError }
)

export const getEntity = createAsyncThunk(
   'wishlist/fetch_entity',
   async (id: string | number) => {
      const requestUrl = `${apiUrl}/${id}`
      return axios.get<IWishlist>(requestUrl)
   },
   { serializeError: serializeAxiosError }
)

export const createEntity = createAsyncThunk(
   'wishlist/create_entity',
   async (entity: IWishlist, thunkAPI) => {
      const result = await axios.post<IWishlist>(apiUrl, cleanEntity(entity))
      thunkAPI.dispatch(getEntities({}))
      return result
   },
   { serializeError: serializeAxiosError }
)

export const updateEntity = createAsyncThunk(
   'wishlist/update_entity',
   async (entity: IWishlist, thunkAPI) => {
      const result = await axios.put<IWishlist>(
         `${apiUrl}/${entity.id}`,
         cleanEntity(entity)
      )
      thunkAPI.dispatch(getEntities({}))
      return result
   },
   { serializeError: serializeAxiosError }
)

export const partialUpdateEntity = createAsyncThunk(
   'wishlist/partial_update_entity',
   async (entity: IWishlist, thunkAPI) => {
      const result = await axios.patch<IWishlist>(
         `${apiUrl}/${entity.id}`,
         cleanEntity(entity)
      )
      thunkAPI.dispatch(getEntities({}))
      return result
   },
   { serializeError: serializeAxiosError }
)

export const deleteEntity = createAsyncThunk(
   'wishlist/delete_entity',
   async (id: string | number, thunkAPI) => {
      const requestUrl = `${apiUrl}/${id}`
      const result = await axios.delete<IWishlist>(requestUrl)
      thunkAPI.dispatch(getEntities({}))
      return result
   },
   { serializeError: serializeAxiosError }
)

// slice

export const WishlistSlice = createEntitySlice({
   name: 'wishlist',
   initialState,
   extraReducers(builder) {
      builder
         .addCase(getEntity.fulfilled, (state, action) => {
            state.loading = false
            state.entity = action.payload.data
         })
         .addCase(deleteEntity.fulfilled, (state) => {
            state.updating = false
            state.updateSuccess = true
            state.entity = {}
         })
         .addMatcher(isFulfilled(getEntities), (state, action) => {
            const { data } = action.payload

            return {
               ...state,
               loading: false,
               entities: data.sort((a, b) => {
                  if (!action.meta?.arg?.sort) {
                     return 1
                  }
                  const order = action.meta.arg.sort.split(',')[1]
                  const predicate = action.meta.arg.sort.split(',')[0]
                  return order === ASC
                     ? a[predicate] < b[predicate]
                        ? -1
                        : 1
                     : b[predicate] < a[predicate]
                        ? -1
                        : 1
               }),
            }
         })
         .addMatcher(
            isFulfilled(createEntity, updateEntity, partialUpdateEntity),
            (state, action) => {
               state.updating = false
               state.loading = false
               state.updateSuccess = true
               state.entity = action.payload.data
            }
         )
         .addMatcher(isPending(getEntities, getEntity), (state) => {
            state.errorMessage = null
            state.updateSuccess = false
            state.loading = true
         })
         .addMatcher(
            isPending(
               createEntity,
               updateEntity,
               partialUpdateEntity,
               deleteEntity
            ),
            (state) => {
               state.errorMessage = null
               state.updateSuccess = false
               state.updating = true
            }
         )
   },
})

export const { reset } = WishlistSlice.actions

// Reducer
export default WishlistSlice.reducer
