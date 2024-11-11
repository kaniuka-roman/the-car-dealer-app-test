export const createYearsRange = (startYear: number = 2015): number[] => {
   const currentYear = new Date().getFullYear()
   return Array(currentYear + 1 - startYear)
      .fill(startYear)
      .map((year, i) => year + i)
}
