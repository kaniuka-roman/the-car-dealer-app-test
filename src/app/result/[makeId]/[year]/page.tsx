import { kyInstance } from '@/lib/ky'
import { VehicleResponseType, VehicleSearchResultsType } from '@/types/types'
import { createYearsRange } from '@/utils/createYearsRange'
import { Suspense } from 'react'

export async function generateStaticParams() {
   const data = await kyInstance.get('GetMakesForVehicleType/car?format=json').json<VehicleResponseType>()
   const yearsOptionList = createYearsRange()

   return yearsOptionList.flatMap((year) =>
      data.Results.map(({ MakeId }) => ({ makeId: MakeId.toString(), year: year.toString() }))
   )
}

export default async function Page({ params }: { params: Promise<{ makeId: string; year: string }> }) {
   const { makeId, year } = await params
   const searchResult = await kyInstance
      .get(`GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`)
      .json<VehicleSearchResultsType>()
   return (
      <div className='flex max-h-screen flex-col items-center justify-center gap-10 overflow-hidden px-5 pt-6 md:px-10 lg:px-28'>
         <h1 className='text-5xl font-bold'>Results</h1>
         <Suspense fallback={'Loading...'}>
            <div className='flex justify-center gap-4 overflow-auto'>
               <div className='grid grid-cols-3 items-stretch justify-center gap-4 p-6'>
                  {searchResult.Results.map(({ Make_ID, Make_Name, Model_ID, Model_Name }) => (
                     <div key={Model_ID} className='rounded-lg border p-4 shadow-lg'>
                        <div>
                           <span className='font-semibold'>Make ID: </span>
                           <span>{Make_ID}</span>
                        </div>
                        <div>
                           <span className='font-semibold'>Brand name: </span>
                           <span>{Make_Name}</span>
                        </div>
                        <div>
                           <span className='font-semibold'>Model ID: </span>
                           <span>{Model_ID}</span>
                        </div>
                        <div>
                           <span className='font-semibold'>Model name: </span>
                           <span>{Model_Name}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </Suspense>
      </div>
   )
}
