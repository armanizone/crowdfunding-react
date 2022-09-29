
export interface IReward {
  project_id?: string | null,
  title: string | null, 
  description: string | null,
  how_to_get: string | null,
  image: string | null,
  cost: number | null, 
  count: number | null,
  bought: number | null,
  sending: Date | string | null,
  uid?: string | null,
  created_at?: Date | string | null,
  updated_at?: Date | string | null,
}



