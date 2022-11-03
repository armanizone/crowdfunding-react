import React from 'react'
import { Modal } from '@mantine/core'
import AuthForm from './Authform'
import { useDispatch, useSelector } from '../redux/store'
import { Close } from '../redux/slices/authModalSlice'

function AuthModal() {

  const { opened } = useSelector(state => state.authModalReducer)
  const dispath = useDispatch()

  const onClose = () => dispath(Close())
  
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Авторизация'
      size='sm'
      centered
      closeOnClickOutside={false}
      closeOnEscape
      lockScroll
    >
      <AuthForm />
    </Modal>
  )
}

export default AuthModal