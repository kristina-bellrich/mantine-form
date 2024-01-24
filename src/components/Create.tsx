import React, { useState } from 'react'
import './App.css'
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
  Code,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { MdDelete } from 'react-icons/md'
import Modal from './Modal'
import ModalError from './ModalError'
import { FormData } from '../types/data'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { sendData } from '../redux/dataSlice'
import { useAppDispatch } from '../redux/store'

interface ICreate {
  active: number
  setActive: React.Dispatch<React.SetStateAction<number>>
  form: ReturnType<typeof useForm<FormData>>
}

export const Create: React.FC<ICreate> = ({ active, setActive, form }) => {
  const [showModal, setShowModal] = useState<boolean>(false)
  const [errorModal, setErrorModal] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const { loading, error } = useSelector((state: any) => state.data)

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
        <Modal open={showModal} onClose={sendedData} />
        <ModalError open={errorModal} onClose={sendDataApi} />
      </div>
    </MantineProvider>
  )
}

// import React, { useState } from 'react'
// import './App.css'
// import '@mantine/core/styles.css'
// import {
//   Checkbox,
//   MantineProvider,
//   Radio,
//   Select,
//   Textarea,
//   Stepper,
//   Button,
//   Group,
//   TextInput,
//   Code,
// } from '@mantine/core'
// import InputMask from 'react-input-mask'
// import { useForm } from '@mantine/form'
// import { MdDelete } from 'react-icons/md'
// import Modal from './Modal'
// import ModalError from './ModalError'

// interface FormData {
//   phone: string
//   email: string
//   nickname: string
//   name: string
//   surname: string
//   sex: string
//   advantages: string[]
//   radio: string
//   checkbox: string[]
//   about: string
// }

// const initialValues: FormData = {
//   phone: '',
//   email: '',
//   nickname: '',
//   name: '',
//   surname: '',
//   sex: '',
//   advantages: [],
//   radio: '',
//   checkbox: [],
//   about: '',
// }

// const App: React.FC = () => {
//   const [active, setActive] = useState<number>(0)
//   const [showModal, setShowModal] = useState<boolean>(false)
//   const [errorModal, setErrorModal] = useState<boolean>(false)
//   // const [forma, setForma] = useState();

//   const form = useForm<FormData>({
//     initialValues,
//     validate: (values) => {
//       if (active === 0) {
//         return {
//           email: /^\S+@\S+$/.test(values.email) ? null : 'Invalid email',
//         }
//       }

//       if (active === 1) {
//         return {
//           nickname:
//             values.nickname.trim().length > 30
//               ? 'Nickname must include maximum 30 characters'
//               : null,
//           name: values.name.length > 30 ? 'Name must include maximum 50 characters' : null,
//           surname: values.name.length > 50 ? 'Surname must include maximum 50 characters' : null,
//         }
//       }
//       if (active === 4) {
//         return {
//           about:
//             values.about.trim().length > 200 ? 'String must include maximum 200 characters' : null,
//         }
//       }

//       return {}
//     },
//   })

//   const nextStep = () =>
//     setActive((current) => {
//       if (form.validate().hasErrors) {
//         return current
//       }
//       return current < 4 ? current + 1 : current
//     })

//   const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current))

//   const addString = () => {
//     form.setFieldValue('advantages', [...form.values.advantages, ''])
//   }

//   const removeString = (index: number) => {
//     const updatedAdvantages = [...form.values.advantages]
//     updatedAdvantages.splice(index, 1)
//     form.setFieldValue('advantages', updatedAdvantages)
//   }
//   const sendData = () => {

//     // {JSON.stringify(form.values, null, 2)}
//     //   console.log(JSON.stringify(form.values, null, 2))
//     //   if (active === 3) {
//       fetch('https://frontcloudbootcamp.free.beeceptor.com/api/create', {
//             method: 'POST',
//             mode: 'no-cors',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(form.values, null, 2),
//           })
//             .then((response) => response.json())
//             .then((data) => {
//               console.log('API response:', data);
//              setShowModal(!showModal)
//             })
//             .catch((error) => {
//               console.error('Error sending form data:', error);
//               setErrorModal(!errorModal)
//             });
//     // }
//   }
//   // const sendData = async () => {
//   //   const response = await fetch(
//   //       `https://frontcloudbootcamp.free.beeceptor.com/api/create`,
//   //   );
//   //   const data = await response.json();
//   //   setRecArray(data.hits);
//   // };
//   return (
//     <MantineProvider>
//       <div className='formContainer'>
//         <Stepper color="violet" size="xs" active={active} styles={{
//         stepBody: {
//           display: 'none',
//         },
//         stepIcon: {
//           borderWidth: 4,
//         },
//         separator: {
//           marginLeft: -2,
//           marginRight: -2,
//           height: 3,
//         },
//       }}>
//           <Stepper.Step label='1'>
//             <p className='nameOfInput'>Email</p>
//             <TextInput
//               className='inputs'
//               mt='md'
//               placeholder='Email'
//               {...form.getInputProps('email')}
//             />
//             <p className='nameOfInput'>Telephone number</p>
//             <InputMask
//               className='inputs'
//               mask='+7 (999) 999-99-99'
//               placeholder='Enter phone number'
//               {...form.getInputProps('phone')}
//             />
//           </Stepper.Step>

//           <Stepper.Step label='2'>
//             <TextInput
//               className='each'
//               label='Nickname'
//               placeholder='Nickname'
//               {...form.getInputProps('nickname')}
//             />
//             <TextInput
//               className='each'
//               label='Name'
//               placeholder='Name'
//               {...form.getInputProps('name')}
//             />
//             <TextInput
//               className='each'
//               label='Surname'
//               placeholder='Surname'
//               {...form.getInputProps('surname')}
//             />
//             <Select
//               className='each'
//               label='Sex'
//               placeholder='Not selected'
//               {...form.getInputProps('sex')}
//               data={['man', 'woman']}
//             />
//           </Stepper.Step>

//           <Stepper.Step label='3'>
//             <label>Advantage</label>
//             {form.values.advantages.map((advantage, index) => (
//               <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
//                 <TextInput
//                   key={index}
//                   mt='md'
//                   placeholder='Placeholder'
//                   {...form.getInputProps(`advantages.${index}`)}
//                   style={{ flex: 1 }}
//                 />
//                 <MdDelete size={33} fill='#959ead' onClick={() => removeString(index)} />
//               </div>
//             ))}
//             <button className='btnAdd' type='button' onClick={addString}>
//               +
//             </button>
//             <Checkbox.Group label='Checkbox group' {...form.getInputProps('checkbox')}>
//               <Group mt='xs'>
//                 <Checkbox value='1' label='1' />
//                 <Checkbox value='2' label='2' />
//                 <Checkbox value='3' label='3' />
//               </Group>
//             </Checkbox.Group>

//             <Radio.Group label='Radio group' {...form.getInputProps('radio')}>
//               <Group mt='xs'>
//                 <Radio value='1' label='1' />
//                 <Radio value='2' label='2' />
//                 <Radio value='3' label='3' />
//               </Group>
//             </Radio.Group>
//           </Stepper.Step>

//           <Stepper.Step label='4' >
//             <Textarea
//               {...form.getInputProps('about')}
//               label='About'
//               placeholder='Placeholder'
//               autosize
//               maxRows={200}
//             />
//           </Stepper.Step>

//           <Stepper.Completed>
//             Completed! Form values:
//             <Code block mt='xl'>
//               {JSON.stringify(form.values, null, 2)}
//             </Code>
//           </Stepper.Completed>
//         </Stepper>

//         <Group justify='flex-end' mt='xl'>
//           <div className='btns'>
//             {active !== 0 && (
//               <Button variant='default' onClick={prevStep}>
//                 Back
//               </Button>
//             )}
//             {active !== 3 ? (
//               <Button id='btnNext' onClick={nextStep}>
//                 Next step
//               </Button>
//             ) : (
//               // <Button id='btnNext' onClick={sendData}>Send</Button>}
//               <Button id='btnNext' onClick={sendData}>
//                 Send
//               </Button>
//             )}
//           </div>
//         </Group>
//         <Modal open={showModal} onClose={sendData}/>
//         <ModalError open={errorModal} onClose={sendData}/>
//       </div>
//     </MantineProvider>
//   )
// }

// export { App }
