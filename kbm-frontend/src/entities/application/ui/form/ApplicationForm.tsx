import { FC, useCallback, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';
import { IEmployee } from '../../model/IEmployee';
import { useSetEmployeeMutation } from '../../api';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { setApplicationData } from '../..';
import { Loader } from '@/shared/ui/loader/Loader';
import './ApplicationForm.css';

interface ApplicationFormProps {
  isChangble: boolean;
  onNext?: () => void;
}

export const ApplicationForm: FC<ApplicationFormProps> = ({ isChangble, onNext }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IEmployee>();

  const [setEmployee, { 
		data: applicationData, 
		isLoading: isEmployeeLoading,
		isSuccess: isEmployeeSuccess, 
		isError: isEmployeeError, 
		error: employeeError 
	}] = useSetEmployeeMutation();
  const dispatch = useAppDispatch();
  const application = useAppSelector(state => state.application);
  const { employee } = application;

  const setEmployeeDataToHookForm = useCallback(async () => {
    if (employee) {
      const formattedBirthDate = employee.birthDate ? new Date(employee.birthDate).toISOString().split('T')[0] : null;

      reset({ ...employee, birthDate: formattedBirthDate });
    }
  }, [employee, reset]);

  const onSubmit: SubmitHandler<IEmployee> = (data) => {
    const applicationId = application.id;
    setEmployee({ applicationId, body: data });
  };

  useEffect(() => {
    setEmployeeDataToHookForm()

    if (isEmployeeSuccess && applicationData) {
      onNext && onNext()
      dispatch(setApplicationData(applicationData))
    }

    if (isEmployeeError && employeeError && 'data' in employeeError && employeeError.data) {
      toast.error(`Ошибка: ${employeeError.data.message}`)
      console.log(employeeError)
    }
  }, [applicationData, dispatch, isEmployeeError, employeeError, isEmployeeSuccess, onNext, setEmployeeDataToHookForm])

  if (isEmployeeLoading) return <Loader />;

  return (
    <div className='app-form'>
      <form onSubmit={handleSubmit(onSubmit)} className='app-form__form'>
        <div className='app-form__fields'>
          <div className='app-form__field'>
            <label htmlFor='fullName'>Табельный номер*</label>
            <input type='text' {...register('personnelNumber', { required: true })} disabled={!isChangble} />
            {errors.personnelNumber && <span className='app-form__error'>Это поле обязательно!</span>}
          </div>
          <div className='app-form__field'>
            <label htmlFor='fullName'>Гражданство*</label>
            <input type='text' {...register('citizenship', { required: true })} disabled={!isChangble} />
            {errors.citizenship && <span className='app-form__error'>Это поле обязательно!</span>}
          </div>
          <div className='app-form__field'>
            <label htmlFor='fullName'>Информация о детях*</label>
            <input type='text' {...register('informationAboutChildren', { required: true })} disabled={!isChangble} />
            {errors.informationAboutChildren && <span className='app-form__error'>Это поле обязательно!</span>}
          </div>
          <div className='app-form__field'>
            <label htmlFor='fullName'>Дата рождения*</label>
            <input type='date' {...register('birthDate', { required: true })} disabled={!isChangble} />
            {errors.birthDate && <span className='app-form__error'>Это поле обязательно!</span>}
          </div>
          <div className='app-form__field'>
            <label htmlFor='fullName'>Контактные данные*</label>
            <input type='text' {...register('phoneNumber', { required: true })} disabled={!isChangble} />
            {errors.phoneNumber && <span className='app-form__error'>Это поле обязательно!</span>}
          </div>
          <div className='app-form__field'>
            <label htmlFor='fullName'>Семейное положение*</label>
            <input type='text' {...register('familyStatus', { required: true })} disabled={!isChangble} />
            {errors.familyStatus && <span className='app-form__error'>Это поле обязательно!</span>}
          </div>
          <div className='app__buttons'>
            {onNext && <button type='submit' className='app__next'>Далее</button>}
          </div>
        </div>
      </form>
    </div>
  );
};
