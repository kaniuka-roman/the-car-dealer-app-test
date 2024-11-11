'use client'

import * as React from 'react'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type Option = {
   value: string
   label: string
}

export const ComboBoxResponsive = ({
   options,
   placeholder,
   filterPlaceholder,
   className,
   onSelect,
}: {
   options: Option[]
   placeholder: string
   filterPlaceholder: string
   className?: string
   onSelect: (option: Option) => void
}) => {
   const [open, setOpen] = React.useState(false)
   const isDesktop = useMediaQuery('(min-width: 768px)')
   const [selectedOption, setSelectedOption] = React.useState<Option | null>(null)
   const onSelectOption = (option: Option) => {
      setSelectedOption(option)
      onSelect(option)
   }
   if (isDesktop) {
      return (
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
               <Button variant='outline' className={cn('min-w-[150px] justify-start', className)}>
                  {selectedOption ? <>{selectedOption.label}</> : <>{placeholder}</>}
               </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0' align='start'>
               <OptionList
                  optionList={options}
                  setOpen={setOpen}
                  setSelectedOption={onSelectOption}
                  filterPlaceholder={filterPlaceholder}
               />
            </PopoverContent>
         </Popover>
      )
   }

   return (
      <Drawer open={open} onOpenChange={setOpen}>
         <DrawerTitle></DrawerTitle>
         <DrawerTrigger asChild>
            <Button variant='outline' className={cn('min-w-[150px] justify-start', className)}>
               {selectedOption ? <>{selectedOption.label}</> : <>{placeholder}</>}
            </Button>
         </DrawerTrigger>
         <DrawerContent>
            <div className='mt-4 border-t'>
               <OptionList
                  optionList={options}
                  setOpen={setOpen}
                  setSelectedOption={onSelectOption}
                  filterPlaceholder={filterPlaceholder}
               />
            </div>
         </DrawerContent>
      </Drawer>
   )
}

function OptionList({
   setOpen,
   setSelectedOption,
   optionList,
   filterPlaceholder,
}: {
   setOpen: (open: boolean) => void
   setSelectedOption: (option: Option) => void
   optionList: Option[]
   filterPlaceholder: string
}) {
   return (
      <Command>
         <CommandInput placeholder={filterPlaceholder} />
         <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
               {optionList.map((option) => (
                  <CommandItem
                     key={option.value}
                     value={option.label}
                     onSelect={() => {
                        setSelectedOption(option)
                        setOpen(false)
                     }}
                  >
                     {option.label}
                  </CommandItem>
               ))}
            </CommandGroup>
         </CommandList>
      </Command>
   )
}
