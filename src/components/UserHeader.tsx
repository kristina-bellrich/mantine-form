import { MantineProvider, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { FC } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FaFolder } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { FormData } from '../types/data'
import { Link } from 'react-router-dom'


// const isValidPhoneNumber = (phoneNumber:string) => /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phoneNumber);

interface IUserHeader {
  form: ReturnType<typeof useForm<FormData>>
}


export const UserHeader: FC<IUserHeader> = ({ form }) => {
  return (
    <MantineProvider>
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
          <p className='nameOfInput'>Email</p>
          <TextInput className='inputs' placeholder='Email' {...form.getInputProps('email')} />
          <p className='nameOfInput'>Telephone number</p>
          <InputMask
            className='inputs'
            mask='+7 (999) 999-99-99'
            placeholder='Enter phone number'
            {...form.getInputProps('phone')}
          />
        </div>


        <Link to='/create'>
    <button className='firstBtn'>Начать</button>
  </Link>




      </div>
    </MantineProvider>
  )
}
