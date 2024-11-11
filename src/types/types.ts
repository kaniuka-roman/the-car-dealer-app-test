export type VehicleType = {
   MakeId: number
   MakeName: string
   VehicleTypeId: number
   VehicleTypeName: string
}
export type VehicleResponseType = {
   Count: number
   Message: string
   SearchCriteria: string
   Results: VehicleType[]
}

export type VehicleDetailsType = {
   Make_ID: number
   Make_Name: string
   Model_ID: number
   Model_Name: string
}
export type VehicleSearchResultsType = {
   Count: number
   Message: string
   SearchCriteria: string
   Results: VehicleDetailsType[]
}