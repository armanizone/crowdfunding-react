import React from 'react'
import { Button, TextInput } from '@mantine/core'
import useForm, { FormProps } from '../hooks/useForm'

const styles = {
  form: 'flex flex-col gap-y-4 w-[minmax(290px_350px)]',
  error: 'text-red-500 text-sm',
  input: 'w-full rounded-md',
}

function AuthForm() {

  const [current, setCurrent] = React.useState("login")

  return (
    <>
      {current === "login" && <Login setCurrent={setCurrent}/>}
      {current === "signup" && <SignUp setCurrent={setCurrent}/>}
      {current === "forgot" && <ForgotPassword setCurrent={setCurrent}/>}
    </>
  )
}

export default AuthForm

function Login ({setCurrent}: FormProps):JSX.Element {
  
  const { values, handleInputChange, errors, handleSubmit, loading } = useForm()

  return (
    <form 
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit.login(e)}
      className={styles.form}
    >
      <div>
        <TextInput
          name='email'
          value={values.email}
          onChange={handleInputChange}
          placeholder='Ваш email'
          className={styles.input}
          error={errors.email?.[0]}
        /> 
      </div>
      <div>
        <TextInput
          name='password'
          value={values.password}
          onChange={handleInputChange}
          placeholder='Пароль'
          className={styles.input}
          error={errors.password?.[0]}
        /> 
        {errors.other?.[0] && (
          <p className={styles.error}>
            {errors.other[0]}
          </p>
        )}
      </div>
      <Button 
        type='submit' 
        loading={loading}
      >
        Войти
      </Button>

      <div className='flex gap-2 justify-center'>
        <p>Первый раз тут?</p>
        <p onClick={() => setCurrent('signup')} className='link'>Зарегистрируйтесь!</p>
      </div>
      <div className='text-center'>
        <span className='link' onClick={() => setCurrent('forgot')}>
          Забыли пароль?
        </span>
      </div>

    </form>
  )
}

function SignUp({ setCurrent }: FormProps): JSX.Element {

  const { values, handleInputChange, errors, handleSubmit, loading } = useForm()

  return (
    <form 
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit.register(e)}
      className={styles.form}
    >
      <div>
        <TextInput
          name='name'
          value={values.name}
          onChange={handleInputChange}
          placeholder='Ваше имя'
          className={styles.input}
          error={errors.name?.[0]}
        />
        <p></p>
      </div>
      <div>
        <TextInput
          name='email'
          value={values.email}
          onChange={handleInputChange}
          placeholder='Ваш email'
          className={styles.input}
          error={errors.email?.[0]}
        />
      </div>
      <div>
        <TextInput
          name='password'
          value={values.password}
          onChange={handleInputChange}
          placeholder='Пароль'
          className={styles.input}
          error={errors.password?.[0]}
        />
      </div>
      <div>
        <TextInput
          name='password_confirmation'
          value={values.password_confirmation}
          onChange={handleInputChange}
          placeholder='Подтверждение пароля'
          className={styles.input}
          error={errors.password_confirmation?.[0]}
        />

        {errors.other?.[0] && (
          <p className={styles.error}>
            {errors.other[0]}
          </p>
        )}

      </div>
 
      <Button 
        type='submit'
        loading={loading}
      >
        Создать аккаунт
      </Button>

      <div className='flex gap-2 justify-center'>
        <p>Уже были у нас?</p>
        <p onClick={() => setCurrent('login')} className='link'>Войти!</p>
      </div>

    </form>
  )
}

function ForgotPassword({ setCurrent }: FormProps): JSX.Element {

  const { values, handleInputChange, errors, handleSubmit, loading } = useForm()

  return (
    <form 
      onSubmit={(e: React.ChangeEvent<HTMLFormElement>) => handleSubmit.login(e)}
      className={styles.form}  
    >
      <TextInput
        name='email'
        value={values.email}
        onChange={handleInputChange}
        className={styles.input}
        placeholder='Ваш email'
        error={errors.email?.[0]}
      />
      <Button 
        type='submit'
        loading={loading}
      >
        Восстановить пароль
      </Button>
      <div className='text-center'>
        <span className='link' onClick={() => setCurrent('login')}>
          Назад
        </span>
      </div>
    </form>
  )
}
