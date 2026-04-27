export interface House {
  id: number
  city: string
  address: string
  beds: number
  baths: number
  sqft: number | string
  type: string
  year: number
  description: string
  images: string[]
  price: number
}
