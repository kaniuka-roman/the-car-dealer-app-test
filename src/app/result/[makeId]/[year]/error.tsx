'use client' // Error boundaries must be Client Components

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({ error }: { error: Error & { digest?: string } }) {
   useEffect(() => {
      console.log(error.message)
   }, [error])
   const [vehicleId, year] =
      error.message
         ?.split(' ')
         ?.at(-1)
         ?.match(/\d+/g)
         ?.filter((elem) => !!Number(elem)) ?? []
   return (
      <div className='flex h-screen items-center justify-center'>
         <div className='flex flex-col gap-6'>
            <h2 className='text-3xl font-bold text-destructive'>Something went wrong!</h2>
            {vehicleId && year ? (
               <Button variant={'destructive'}>
                  <Link href={`result/${vehicleId}/${year}`}>Try again</Link>
               </Button>
            ) : (
               <Button variant={'destructive'}>
                  <Link href={`/`}>Home</Link>
               </Button>
            )}
         </div>
      </div>
   )
}
