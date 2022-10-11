import { updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import React from 'react'
import { Close } from '../redux/slices/authModalSlice'
import { useDispatch } from '../redux/store'
import UserService from '../service/UserService'
import { db } from '../utils/firebase'
import { loginSchema, merged } from "../utils/validation"


export type FormChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLButtonElement | HTMLFormElement>

export interface SubmitProps {
  register: (e: FormChangeEvent) => void,
  login: (e: FormChangeEvent) => void,
  loginWithGoogle: (e: FormChangeEvent) => void,
  singout: (e: FormChangeEvent) => void,
}

interface ErrorsProps {
  name?: string[],
  email?: string[],
  password?: string[],
  password_confirmation?: string[],
  other?: string[],
}

export interface FormProps {
  setCurrent: (name: string) => void,
}

export default function useForm() {

  const dispatch = useDispatch()

  const onClose = () => {
    dispatch(Close())
  }

  const [values, setValues] = React.useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    stay: false
  })

  const [errors, setErrors] = React.useState<ErrorsProps | any>({
    name: [],
    email: [],
    password: [],
    password_confirmation: [],
    other: [],
  })

  const [loading, setLoading] = React.useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    setErrors({ ...errors, [name]: [], other: [] })
  }

  const yupErrorToErrorObject = (err: any) => {
    const object:any [] = [];
    err.inner.forEach((x: any) => {
      if (x.path !== undefined) {
        object[x.path] = x.errors;
      }
    });
    return setErrors(object);
  }

  const handleSubmit = {
    register: (event: FormChangeEvent) => {
      event.preventDefault();
      setErrors({})
      setLoading(true)
      merged.validate(values, { abortEarly: false })
      .then(e => {
        UserService.signup(values.email, values.password)
        .then(async e => {
          await updateProfile(e.user, {
            displayName: values.name
          })
          await setDoc(doc(db, 'users', e.user.email!), {
            displayName: values.name,
            email: values.email, 
            created_at: serverTimestamp()
          })
          UserService.sendEmail(e.user)
          .then(() => {
            setLoading(false)
            onClose()
            alert(`Регистрация прошла успешно! Письмо с подтверждением было выслано на почту ${e.user.email}`)
          })
          .catch(e => {
            console.log(e);
            setLoading(false)
            onClose()
            alert(`Регистрация прошла успешно! Не удалось отправить письмо с подтверждением на почту ${e.user.email}`)
          })
        })
        .catch(e => {
          if (e.code === 'auth/too-many-requests') {
            setErrors({ ...errors, other: ['Сликом много попыток попробуйте чуть позже'] })
          }
          if (e.code === 'auth/email-already-in-use') {
            setErrors({ ...errors, other: ['Пользователь с такой почтой уже существует'] })
          }
          setLoading(false)
          console.log(e);
        })
      })   
      .catch(e => {
        yupErrorToErrorObject(e)
        setLoading(false)
      })
    },
    login: async (event: FormChangeEvent) => {
      event.preventDefault();
      setErrors({})
      setLoading(true)
      loginSchema.validate({ email: values.email, password: values.password }, { abortEarly: false })
      .then(e => {
        UserService.login(values.email, values.password)
        .then(e => {
          setLoading(false)
          onClose()
          alert(`Вы успешно вошли в систему как ${e.user.displayName}`)
        })
        .catch(e => {
          if (e.code === 'auth/too-many-requests') {
            setErrors({ ...errors, other: ['Слишком много попыток попробуйте чуть позже'] })
          }
          if (e.code === 'auth/user-not-found') {
            setErrors({ ...errors, other: ['Пользователь не найден'] })
          }
          if (e.code === 'auth/wrong-password') {
            setErrors({ ...errors, password: ['Неверный пароль'] })
          }
          console.log(e);
          setLoading(false)
        })
      })
      .catch(e => {
        yupErrorToErrorObject(e)
        setLoading(false)
      })
    },
    // loginWithGoogle: async (event: FormChangeEvent) => {
    //   event.preventDefault();
    //   setErrors({})
    //   setLoading(true)
    // },
    resetPassword: async (event: FormChangeEvent) => {
      event.preventDefault();
      setErrors({})
      setLoading(true)
    },
    singout: (event: FormChangeEvent) => {
      event.preventDefault();
    }
  }

  return {
    values,
    handleInputChange,
    handleSubmit,
    errors,
    loading,
    setErrors,
  }
}