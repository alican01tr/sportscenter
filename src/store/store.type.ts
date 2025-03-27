import { Gender } from "@/types/gender.type"

export interface Member {
  id: number
  name: string
  surname: string
  identityNumber: string
  height: number
  weight: number
  phone: string
  gender: Gender
  memberStartDate: Date
  memberEndDate: Date
}
