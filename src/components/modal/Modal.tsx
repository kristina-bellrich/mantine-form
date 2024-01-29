import { Button, Text } from '@mantine/core'
import { FC } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

interface ModalProps {
  open: boolean
  onClose: () => void
}

export default function Modal(props: ModalProps): ReturnType<FC> {
  return (
    <div className='modal-main'>
      <div className='modal-body'>
        <Text className='nameOfInput'>Форма успешно отправлена</Text>
      </div>
      <div className='modal-head'>
        <FaCircleCheck color='#05ae71' size={50} />
      </div>

      <div className='btn-container'>
        <Link to='/'>
          <Button type='button' className='btn' onClick={props.onClose}>
            На главную
          </Button>
        </Link>
      </div>
    </div>
  )
}
