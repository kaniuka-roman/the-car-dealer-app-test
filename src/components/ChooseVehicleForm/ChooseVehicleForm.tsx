'use client'

import { VehicleResponseType } from '@/types/types'
import { createYearsRange } from '@/utils/createYearsRange'
import { ComboBoxResponsive } from '../ComboBoxResponsive/ComboBoxResponsive'
import { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'

export type ChooseVehicleFormProps = {
   vehicleList: VehicleResponseType
}

export const ChooseVehicleForm = ({ vehicleList }: ChooseVehicleFormProps) => {
   const [vehicleId, setVehicleId] = useState<string | null>(null)
   const [year, setYear] = useState<string | null>(null)
   const vehicleOptionList = vehicleList.Results.map(({ MakeId, MakeName }) => ({
      value: MakeId.toString(),
      label: MakeName,
   }))
   const yearsOptionList = createYearsRange().map((year) => ({ value: year.toString(), label: year.toString() }))
   return (
      <div className='flex flex-col items-stretch'>
         <ComboBoxResponsive
            options={vehicleOptionList}
            placeholder='Choose vehicle name'
            filterPlaceholder='Filter vehicle name...'
            className='mb-4 min-w-48 justify-center'
            onSelect={(option) => setVehicleId(option.value)}
         />
         <ComboBoxResponsive
            options={yearsOptionList}
            placeholder='Choose vehicle year'
            filterPlaceholder='Filter year...'
            className='justify-center'
            onSelect={(option) => setYear(option.value)}
         />
         <Button disabled={!vehicleId || !year} className='mt-5'>
            <Link href={`result/${vehicleId}/${year}`}>Search</Link>
         </Button>
      </div>
   )
}
