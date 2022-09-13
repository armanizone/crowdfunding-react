import { auth } from '../utils/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';

const useAuth = (options?: any) => {
  const [user, loading, error] = useAuthState(auth, options)
  return {
    user,
    loading, 
    error
  }
}

export default useAuth