import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { db } from '../utils/firebase'


const createReward = async (id: string, data: object) => {
  return await setDoc(doc(db, 'rewards', id), {
    ...data, 
    created_at: serverTimestamp(),
    updated_at: serverTimestamp()
  })
}

const getRewardsByProjectId = async (id: string) => {
  return await getDocs(query(collection(db, 'rewards'), where('project_id', '==', id)))
}

const RewardService = {
  createReward,
  getRewardsByProjectId
}


export default RewardService