import * as yup from 'yup'

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const loginSchema = yup.object({
  email: yup.string().email("Неверный формат почты").required("Почта обязательна для заполнения"),
  password: yup.string().min(8, "Минимум 8 символов").max(14, "Максимум 14 символов").required("Пароль обязателен для заполнения"),
})

const optionalSchema = yup.object().shape({
  name: yup.string().min(2, "Слишком мало символов").required("Имя обязательно для заполнения"),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
})

const merged = loginSchema.concat(optionalSchema)

const passwordSchema = yup.object({
  old_password: yup.string().min(8, "Минимум 8 символов").max(14, "Максимум 14 символов").required("Пароль обязателен для заполнения"),
  password: yup.string().min(8, "Минимум 8 символов").max(14, "Максимум 14 символов").required("Пароль обязателен для заполнения"),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'Пароли не совпадают')
})

const userSchema = yup.object({
  displayName: yup.string().min(2, 'Минимум 2 символа').nullable().required('Обязательное поле'),
  phoneNumber: yup.string().matches(phoneRegExp, 'Неверныйй формат номера'),
})

const projectSchema = yup.object({
  title: yup.string().max(50, 'Максимальное количество символов 50').nullable(),
  // required('Название обязательно для заполнения'),
  description: yup.string().max(180, 'Максимальное количество символов').nullable(),
  // required('Описание обязательно для заполнения'),
  image: yup.string().nullable(),
  city: yup.string().nullable(),
  goal: yup.number().typeError('Укажите сумму сбора проекта').min(5000, 'Минимальная сумма сбора 5000 тг').nullable(),
  // required('Сумма сбора обязательна для заполнения'),
  duration: yup.number().typeError('Укажите длительность проекта (дни)').min(15, 'Минимальная длительность проекта 15 дней').max(120, 'Максимальная длительность проекта 120 дней').nullable(),
  // required('Длительность обязательна для заполнения'),
})

const rewardSchema = yup.object({
  title: yup.string().max(70, 'Максимальное количество символов 50'),
  // required('Название обязательно для заполнения'),
  description: yup.string().max(500, 'Максимальное количество символов 500'),
  // required('Описание обязательно для заполнения'),
  how_to_get: yup.string().max(240, 'Максимальное количество символов 240'),
  image: yup.string().nullable(),
  city: yup.string().nullable(),
  cost: yup.number().typeError('Укажите стоимость вознаграждения').min(100, 'Минимальное стоимость 100 тг'),
  // required('Стоимость обязательна для заполнения'),
  count: yup.number().typeError('Укажите количество вознаграждений').min(5, 'Минимальное количество 5'),
  // required('Количество обязательно для заполнения'),
  sending: yup.date(),
})

export {
  merged,
  loginSchema,
  userSchema,
  passwordSchema,
  projectSchema,
  rewardSchema
}