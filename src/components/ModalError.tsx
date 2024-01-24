import { FC } from 'react'
import { RiCloseCircleFill } from 'react-icons/ri'

interface ModalProps {
  open: boolean
  onClose: () => void
}

export default function ModalError(props: ModalProps): ReturnType<FC> {
  return (
    <div className={`${'modal'} ${props.open ? 'display-block' : 'display-none'}`}>
      <div className='modal-main'>
        <div className='modal-body'>
          <p className='nameOfInput'>Ошибка</p>
        </div>
        <div className='modal-head'>
          <RiCloseCircleFill color='#e84e58' size={50} />
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick={props.onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
