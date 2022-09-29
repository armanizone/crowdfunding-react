import { doc, getDoc, setDoc, updateDoc, serverTimestamp, getDocs, query, collection, where } from 'firebase/firestore';
import { db } from '../utils/firebase';

const createProject = async (id: string, data: object) => {
  return await setDoc(doc(db, 'projects', id), {
    ...data, 
    created_at: serverTimestamp(),
    updated_at: serverTimestamp()
  })
}

const getProjectById = async (id: string) => {
  if (!id) return 
  const docSnap = await getDoc(doc(db, 'projects', id!))
  if (docSnap.exists()) 
    return {id: docSnap.id,  ...docSnap.data() }
   else 
    return null
}

const updateProject = async (id: string | undefined, data: object) => {
  if (!id) return 
  return await updateDoc(doc(db, 'projects', id), {
    ...data, 
    updated_at: serverTimestamp()
  })
}

const getAllProjects = async () => {

}

const getAllPostedProjects = async () => {
  return await getDocs(query(collection(db, 'projects'), where('status', '==', 'posted')))
}

const getProjectsByCategory = async () => {

}

const getProjectsByUser = async (uid: string) => {
  return await getDocs(query(collection(db, 'projects'), where('uid', '==', uid)))
}

const ProjectService = {
  createProject,
  getProjectById,
  updateProject,
  getAllProjects,
  getProjectsByUser,
  getProjectsByCategory,
  getAllPostedProjects,
}

export default ProjectService
