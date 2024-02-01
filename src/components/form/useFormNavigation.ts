import { UseFormType } from 'components/App'
import { useDispatch, useSelector } from 'react-redux'
import { dataSliceActions } from '../redux/dataSlice'
import { RootState, useAppDispatch } from '../redux/store'
import { ActivStep } from 'components/constans/EnumActiveStep'

interface UseFormNavigationReturn {
  nextStep: () => void
  prevStep: () => void
  addString: () => void
  removeString: (index: number) => void
}

const useFormNavigation = (form: UseFormType): UseFormNavigationReturn => {
  const dispatch = useAppDispatch()

  const active = useSelector((state: RootState) => state.data.active)

  const nextStep = () => {
    if (form.validate().hasErrors) {
      return
    }

    dispatch(dataSliceActions.setActive(active < ActivStep.StepTree ? active + 1 : active))
  }

  const prevStep = () => {
    dispatch(dataSliceActions.setActive(active > ActivStep.StepNull ? active - 1 : active))
  }

  const addString = () => {
    form.setFieldValue('advantages', [...form.values.advantages, ''])
  }

  const removeString = (index: number) => {
    const updatedAdvantages = [...form.values.advantages]
    updatedAdvantages.splice(index, 1)
    form.setFieldValue('advantages', updatedAdvantages)
  }

  return {
    nextStep,
    prevStep,
    addString,
    removeString,
  }
}

export default useFormNavigation
