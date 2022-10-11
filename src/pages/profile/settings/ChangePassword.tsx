import { Button, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth'
import React from 'react'
import { Heading } from '../../../components'
import useAuth from '../../../hooks/useAuth'
import { passwordSchema } from '../../../utils/validation'
import { styles } from './UserData'

function ChangePassword() {

  const [password, setPassowrd] = React.useState({
    old_password: '',
    password: '',
    password_confirmation: '',
  })

  const [errors, setErrors] = React.useState<any>({
    old_password: [],
    password: [],
    password_confirmation: [],
  })

  const [loading, setLoading] = React.useState(false)

  const yupErrorToErrorObject = (err: any) => {
    const object: any[] = [];
    err.inner.forEach((x: any) => {
      if (x.path !== undefined) {
        object[x.path] = x.errors;
      }
    });
    return setErrors(object);
  }

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setPassowrd({...password, [name]: value})
    setErrors({})
  }

  const {user} = useAuth()
  
  const change = async () => {
    setLoading(true)
    setErrors({})
    await passwordSchema.validate({...password}, {abortEarly: false})
    .then(async () => {
      const credential = EmailAuthProvider.credential(
        user?.email!,
        password.old_password
      )
      await reauthenticateWithCredential(user!, credential)
      .then(async e => {
        console.log(e, 'succes');
        await updatePassword(user!, password.password)
        .then(e => {
          showNotification({
            title: 'Пароль',
            message: 'Пароль успешно изменен!',
            autoClose: 3000,
            color: 'green'
          })
          setErrors({})
          setPassowrd({
            old_password: '',
            password: '',
            password_confirmation: '',
          })
        })
        .catch(e => {
          console.log(e);
          showNotification({
            title: 'Пароль',
            message: 'Не удалось изменить пароль',
            autoClose: 3000,
            color: 'red'
          })
        })
      })
      .catch(e => {
        console.log(e, 'error');
        setErrors({...errors, old_password: ['Неверный пароль']})
      })
       .finally(() => {
        setLoading(false)
       })
    })
    .catch(e => {
      yupErrorToErrorObject(e)
      setLoading(false)
    })
  }

  return (
    <div className='w-full h-full relative'>
      <Heading title='Изменение пароля' description='Введите данные для изменения пароля' />
      <div className='mt-4 max-w-2xl'>
        <TextInput
          label='Старый пароль'
          classNames={{
            label: styles.label
          }}
          name='old_password'
          value={password.old_password}
          onChange={handleChange}
          error={errors?.old_password?.[0]}
        />
        <TextInput
          label='Новый пароль'
          classNames={{
            label: styles.label
          }}
          name='password'
          value={password.password}
          onChange={handleChange}
          error={errors?.password?.[0]}
        />
        <TextInput
          label='Повторите пароль'
          classNames={{
            label: styles.label
          }}
          name='password_confirmation'
          value={password.password_confirmation}
          onChange={handleChange}
          error={errors?.password_confirmation?.[0]}
        />
      </div>
      <div className='flex justify-end max-w-2xl mt-4'>
        <Button 
          size='md'
          onClick={change}
          loading={loading}
        >
          Сохранить
        </Button>
      </div>
    </div>
  )
}

export default ChangePassword