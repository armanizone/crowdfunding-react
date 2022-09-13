import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';


const signup = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password)
}

const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password)
}

const sendEmail = async (user: any) => {
  return await sendEmailVerification(user)
}

const signout = async () => {
  return await signOut(auth) 
}

const logged = auth.currentUser

const UserService = {
  signup,
  login,
  signout,
  logged,
  sendEmail
}

export default UserService