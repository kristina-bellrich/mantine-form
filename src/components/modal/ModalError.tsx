import { FC } from 'react';

import { Button, Text } from '@mantine/core';
import { RiCloseCircleFill } from 'react-icons/ri';

interface ModalProps {
  onClose: () => void;
}

const ModalError: FC<ModalProps> = (props) => {
  return (
    <div className='modal-main'>
      <div className='modal-body'>
        <Text className='nameOfInput'>Ошибка</Text>
      </div>
      <div className='modal-head'>
        <RiCloseCircleFill color='#e84e58' size={50} />
      </div>
      <div className='btn-container'>
        <Button type='button' className='btn' onClick={props.onClose}>
          Закрыть
        </Button>
      </div>
    </div>
  );
};

export default ModalError;
