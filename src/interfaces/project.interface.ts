import { IReward } from './reward.interface';

export interface ProjectCardProps {

}

export interface IProject {
  id?: string | undefined | null,
  title?: string | null,
  description?: string | null,
  image?: string | null | undefined,
  city?: string | null,
  goal?: number | null,
  status?: string,
  category?: string | null,
  duration?: number | null,
  detail_description?: any | null,
  backed?: number,
  earned?: number | null,
  started?: Date | null,
  uid?: string | null,
  author?: string | null,
  iin?: number | null,
  phone?: number | null,
  document_front?: File | null,
  document_back?: File | null,
  created_at?: any,
  updated_at?: any,
}
