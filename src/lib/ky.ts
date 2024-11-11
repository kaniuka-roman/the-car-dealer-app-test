import ky from 'ky'

export const kyInstance = ky.create({ prefixUrl: process.env.BASE_API_URL })
