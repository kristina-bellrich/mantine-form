import React, { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { UserHeader } from './UserHeader'
import { Create } from './Create'
import { FormData } from '../types/data'
import { useForm } from '@mantine/form'
import { Button, MantineProvider } from '@mantine/core'

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

const App: React.FC = () => {
  const [active, setActive] = useState<number>(0)

  const form = useForm<FormData>({
    initialValues,
    validate: (values) => {
      console.log(values.phone)
      if (active > 0) {
        return {
          email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
          phone: /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(values.phone) ? null : 'Invalid phone number',
        }
      }
      if (active === 1) {
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
      if (active === 3) {
        return {
          about:
            values.about.trim().length > 200 ? 'String must include maximum 200 characters' : null,
        }
      }
      return {}
    },
  })


  return (
    <div>
      <Router>
        <Link to='/'> </Link>
        <Routes>
          <Route
            path='/'
            element={
              <div className='formContainer'>
                <UserHeader form={form} />
              </div>
            }
          ></Route>
          <Route
            path='/create'
            element={<Create active={active} setActive={setActive} form={form} />}
          ></Route>
        </Routes>
      </Router>
    </div>
  )
}

export { App }
