import { FC, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { UserHeader } from './firstPage/UserHeader'
import { Create } from './form/Form'
import { FormData } from './types/types'
import { useForm } from '@mantine/form'
import { ActivStep } from './constans/EnumActiveStep'
import { useSelector } from 'react-redux'
import { RootState } from 'components/redux/store'

const initialValues: FormData = {
  phone: '',
  email: '',
  nickname: '',
  name: '',
  surname: '',
  sex: '',
  advantages: [],
  radio: '',
  checkbox: [],
  about: '',
}

export type UseFormType = ReturnType<typeof useForm<FormData>>

const App: FC = () => {
  const active = useSelector((state: RootState) => state.data.active)

  const form = useForm<FormData>({
    initialValues,
    validate: (values) => {
      if (active > 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          phone: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(values.phone)
            ? null
            : 'Invalid phone number',
        }
      }
      if (active === ActivStep.StepOne) {
        return {
          nickname:
            values.nickname.trim().length > 30
              ? 'Nickname must include maximum 30 characters'
              : null,
          name:
            values.name.length > 30 || /^[a-zA-Z]+$/.test(values.name)
              ? 'Name must include maximum 50 characters und only letters'
              : null,
          surname:
            values.name.length > 50 || /^[A-Zz-z]+$/.test(values.surname)
              ? 'Surname must include maximum 50 characters  und only letters'
              : null,
        }
      }
      if (active === ActivStep.StepTree) {
        return {
          about:
            values.about.trim().length > 200 ? 'String must include maximum 200 characters' : null,
        }
      }
      return {}
    },
  })

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={
            <div className='formContainer'>
              <UserHeader form={form} />
            </div>
          }
        ></Route>
        <Route path='/create' element={<Create form={form} />} />
      </Routes>
    </Router>
  )
}

export { App }
