import { ChooseVehicleForm } from '@/components/ChooseVehicleForm/ChooseVehicleForm'
import { kyInstance } from '@/lib/ky'
import { VehicleResponseType } from '@/types/types'
import { Suspense } from 'react'

export default async function Home() {
   const vehicleResult = await kyInstance.get('GetMakesForVehicleType/car?format=json').json<VehicleResponseType>()

   return (
      <div className='flex min-h-screen flex-col items-center justify-center bg-background'>
         <Suspense fallback='Loading...'>
            <ChooseVehicleForm vehicleList={vehicleResult} />
         </Suspense>
      </div>
   )
}
