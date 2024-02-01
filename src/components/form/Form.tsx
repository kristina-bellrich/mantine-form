import { FC } from 'react';

import {
  Button,
  Checkbox,
  Group,
  Loader,
  Radio,
  Select,
  Stepper,
  Textarea,
  TextInput,
} from '@mantine/core';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '@mantine/core/styles.css';
import ModalError from '../modal/ModalError';
import { selectErrorModal, selectShowModal } from '../redux/selectors';
import { RootState, useAppDispatch } from '../redux/store';

import useFormNavigation from './useFormNavigation';

import { sendData } from 'components/api/Api';
import { UseFormType } from 'components/App';
import { ActivStep } from 'components/constans/EnumActiveStep';
import { Modal } from 'components/modal/Modal';
interface ICreate {
  form: UseFormType;
}

export const Create: FC<ICreate> = ({ form }) => {
  const { nextStep, prevStep, addString, removeString } = useFormNavigation(form);
  const dispatch = useAppDispatch();
  const showModal = useSelector(selectShowModal);
  const errorModal = useSelector(selectErrorModal);
  const { loading, active } = useSelector((state: RootState) => state.data);

  const sendDataApi = async (): Promise<void> => {
    await dispatch(sendData(form.values));
  };

  
  return (
    <div className="formContainer">
      <Stepper
        color="violet"
        size="xs"
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
        <Stepper.Step label="1">
          <TextInput
            className="each"
            label="Nickname"
            placeholder="Nickname"
            {...form.getInputProps('nickname')}
          />
          <TextInput
            className="each"
            label="Name"
            placeholder="Name"
            {...form.getInputProps('name')}
          />
          <TextInput
            className="each"
            label="Surname"
            placeholder="Surname"
            {...form.getInputProps('surname')}
          />
          <Select
            className="each"
            label="Sex"
            placeholder="Not selected"
            {...form.getInputProps('sex')}
            data={['man', 'woman']}
          />
        </Stepper.Step>

        <Stepper.Step label="2">
          <label>Advantage</label>
          {form.values.advantages.map((advantage, index) => (
            <Group key={index} className="advantage">
              <TextInput
                key={index}
                mt="md"
                placeholder="Placeholder"
                {...form.getInputProps(`advantages.${index}`)}
                style={{ flex: 1 }}
              />
              <MdDelete size={33} fill="#959ead" onClick={() => removeString(index)} />
            </Group>
          ))}
          <Button className="btnAdd" type="button" onClick={addString}>
            +
          </Button>
          <Checkbox.Group label="Checkbox group" {...form.getInputProps('checkbox')}>
            <Group mt="xs">
              <Checkbox value="1" label="1" />
              <Checkbox value="2" label="2" />
              <Checkbox value="3" label="3" />
            </Group>
          </Checkbox.Group>

          <Radio.Group label="Radio group" {...form.getInputProps('radio')}>
            <Group mt="xs">
              <Radio value="1" label="1" />
              <Radio value="2" label="2" />
              <Radio value="3" label="3" />
            </Group>
          </Radio.Group>
        </Stepper.Step>

        <Stepper.Step label="3">
          <Textarea
            {...form.getInputProps('about')}
            label="About"
            placeholder="Placeholder"
            autosize
            maxRows={200}
          />
        </Stepper.Step>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        <div className="btns">
          {active === ActivStep.StepNull ? (
            <Link to="/">
              <Button variant="default" onClick={prevStep}>
                Back
              </Button>
            </Link>
          ) : (
            <Button variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          {active !== ActivStep.StepTwo ? (
            <Button className="btnNext" onClick={nextStep}>
              Next step
            </Button>
          ) : (
            <Button className="btnNext" onClick={sendDataApi} disabled={loading}>
              {loading ? <Loader size={36} /> : 'Send'}
            </Button>
          )}
        </div>
      </Group>
      {showModal && <Modal />}
      {errorModal && <ModalError onClose={sendDataApi} />}
    </div>
  );
};
