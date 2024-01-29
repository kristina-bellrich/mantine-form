import React, { FC, useState } from 'react'
import '@mantine/core/styles.css'
import {
  Checkbox,
  MantineProvider,
  Radio,
  Select,
  Textarea,
  Stepper,
  Button,
  Group,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { MdDelete } from 'react-icons/md'
import Modal from '../modal/Modal'
import ModalError from '../modal/ModalError'
import { FormData } from '../../types/data'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { sendData } from '../../redux/dataSlice'
import { useAppDispatch } from '../../redux/store'

interface ICreate {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  form: ReturnType<typeof useForm<FormData>>
}

export const Create: FC<ICreate> = ({ active, setActive, form }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorModal, setErrorModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { loading } = useSelector((state: any) => state.data)

  const nextStep = () =>
    setActive((current: number) => {
      if (form.validate().hasErrors) {
        return current
      }
      return current < 3 ? current + 1 : current
    })
  const prevStep = () => setActive((current: number) => (current > 0 ? current - 1 : current))
  const addString = () => {
    form.setFieldValue('advantages', [...form.values.advantages, ''])
  }
  const removeString = (index: number) => {
    const updatedAdvantages = [...form.values.advantages]
    updatedAdvantages.splice(index, 1)
    form.setFieldValue('advantages', updatedAdvantages)
  }
  const sendDataApi = async () => {
    try {
      await dispatch(sendData(form.values))
      setShowModal(!showModal)
      console.log(`sended: ${JSON.stringify(form.values)}`)
    } catch (error) {
      setErrorModal(!errorModal)
      console.log('error')
    }
  }
  const sendedData = () => {}
  return (
    <MantineProvider>
      <div className='formContainer'>
        <Stepper
          color='violet'
          size='xs'
          active={active}
          styles={{
            stepBody: {
              display: 'none',
            },
            stepIcon: {
              borderWidth: 4,
            },
            separator: {
              marginLeft: -2,
              marginRight: -2,
              height: 3,
            },
          }}
        >
          <Stepper.Step label='1'>
            <TextInput
              className='each'
              label='Nickname'
              placeholder='Nickname'
              {...form.getInputProps('nickname')}
            />
            <TextInput
              className='each'
              label='Name'
              placeholder='Name'
              {...form.getInputProps('name')}
            />
            <TextInput
              className='each'
              label='Surname'
              placeholder='Surname'
              {...form.getInputProps('surname')}
            />
            <Select
              className='each'
              label='Sex'
              placeholder='Not selected'
              {...form.getInputProps('sex')}
              data={['man', 'woman']}
            />
          </Stepper.Step>

          <Stepper.Step label='2'>
            <label>Advantage</label>
            {form.values.advantages.map((advantage, index) => (
              <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                <TextInput
                  key={index}
                  mt='md'
                  placeholder='Placeholder'
                  {...form.getInputProps(`advantages.${index}`)}
                  style={{ flex: 1 }}
                />
                <MdDelete size={33} fill='#959ead' onClick={() => removeString(index)} />
              </div>
            ))}
            <button className='btnAdd' type='button' onClick={addString}>
              +
            </button>
            <Checkbox.Group label='Checkbox group' {...form.getInputProps('checkbox')}>
              <Group mt='xs'>
                <Checkbox value='1' label='1' />
                <Checkbox value='2' label='2' />
                <Checkbox value='3' label='3' />
              </Group>
            </Checkbox.Group>

            <Radio.Group label='Radio group' {...form.getInputProps('radio')}>
              <Group mt='xs'>
                <Radio value='1' label='1' />
                <Radio value='2' label='2' />
                <Radio value='3' label='3' />
              </Group>
            </Radio.Group>
          </Stepper.Step>

          <Stepper.Step label='3'>
            <Textarea
              {...form.getInputProps('about')}
              label='About'
              placeholder='Placeholder'
              autosize
              maxRows={200}
            />
          </Stepper.Step>
        </Stepper>

        <Group justify='flex-end' mt='xl'>
          <div className='btns'>
            {active === 0 ? (
              <Link to='/'>
                <Button variant='default' onClick={prevStep}>
                  Back
                </Button>
              </Link>
            ) : (
              <Button variant='default' onClick={prevStep}>
                Back
              </Button>
            )}
            {active !== 2 ? (
              <Button id='btnNext' onClick={nextStep}>
                Next step
              </Button>
            ) : (
              <Button id='btnNext' onClick={sendDataApi} disabled={loading}>
                {loading ? 'Sending...' : 'Send'}
              </Button>
            )}
          </div>
        </Group>
        {showModal && <Modal open={showModal} onClose={sendedData} />}
        {errorModal && <ModalError open={errorModal} onClose={sendDataApi} />}
      </div>
    </MantineProvider>
  )
}
