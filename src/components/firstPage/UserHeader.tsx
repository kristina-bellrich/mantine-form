import { Button, MantineProvider, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FC } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FaFolder } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { FormData } from '../types/types'
import { Link } from 'react-router-dom'
interface IUserHeader {
  form: ReturnType<typeof useForm<FormData>>
}

export const UserHeader: FC<IUserHeader> = ({ form }) => {
  return (
    <div>
      <div className='userInfo'>
        <FaUserCircle color='#7d7d82' size={70} />
        <div className='userRight'>
          <h2>Иванов Иван</h2>
          <div className='folder'>
            <div className='Eachfolder'>
              <FaFolder color='#7d7d82' />
              <p>Telegram</p>
            </div>
            <div className='Eachfolder'>
              <FaFolder color='#7d7d82' />
              <p>GitHub</p>
            </div>
            <div className='Eachfolder'>
              <FaFolder color='#7d7d82' />
              <p>Resume</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Text className='nameOfInput'>Email</Text>
        <TextInput className='inputs' placeholder='Email' {...form.getInputProps('email')} />
        <Text className='nameOfInput'>Telephone number</Text>
        <InputMask
          className='inputs'
          mask='+7 (999) 999-99-99'
          placeholder='Enter phone number'
          {...form.getInputProps('phone')}
        />
      </div>

      <Link to='/create'>
        <Button className='firstBtn'>Начать</Button>
      </Link>
    </div>
  )
}
