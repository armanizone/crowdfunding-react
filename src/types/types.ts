export interface IReward {
  project_id: string | null,
  title: string | null,
  description: string | null,
  how_to_get: string | null,
  image: string | null,
  imageRef?: string | null,
  cost: number | null,
  count: number | null,
  bought: number | null,
  sending: Date | string | null,
  uid: string | null,
  created_at: Date | string | null,
  updated_at?: Date | string | null,
  id: string | null,
  user: IUser
}

export interface IUser {
  displayName: string, 
  email: string, 
  photoURL: string, 
  uid: string
}

export interface IProject {
  id: string | undefined | null,
  title: string | null,
  description: string | null,
  image: string | null | undefined,
  city: string | null,
  goal: number | null,
  status: string,
  category: string | null,
  duration: number | null,
  detail_description: any | null,
  backed: number,
  earned: number | null,
  started: Date | null,
  uid: string | null,
  author: string | null,
  iin: number | null,
  phone: number | null,
  comments: number, 
  document_front: File | null,
  document_back: File | null,
  rewards: number,
  created_at: any,
  updated_at?: any,
  user: IUser

}
