import { ChangeEvent, FC, FormEvent, useState } from 'react';
import './UserEdit.css';
import { IUserDetail } from '../../model/IUserDetail';
import PhoneInput from 'react-phone-number-input/input';

interface UserEditProps {
  handleSave: (editedData: IUserDetail, e: FormEvent<HTMLFormElement>) => void;
  data: IUserDetail;
  handleCancel: () => void;
}

export const UserEdit: FC<UserEditProps> = ({ handleSave, data, handleCancel }) => {
  const [editedData, setEditedData] = useState<IUserDetail>({
    ...data,
    firstname: data.firstname,
    lastname: data.lastname,
    phoneNumber: data.phoneNumber,
    aboutMe: data.aboutMe,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (!/^[a-zA-Zа-яА-Я,.!\s]*$/.test(e.target.value)) return;

    setEditedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setEditedData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
  };

  console.log(editedData);

  return (
    <div>
      <div className='edit-card'>
        <form onSubmit={(e) => handleSave(editedData, e)} className='edit-card__form'>
          <div className='edit-card__name'>
            <div className='edit-card__firstName edit-card__item'>
              <label htmlFor='firstname'>Имя</label>
              <input
                type='text'
                name='firstname'
                value={editedData.firstname}
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className='edit-card__lastName edit-card__item'>
              <label htmlFor='lastname'>Фамилия</label>
              <input
                type='text'
                name='lastname'
                value={editedData.lastname}
                required
                onChange={(e) => handleInputChange(e)}
              />
            </div>
          </div>
          <div className='edit-card__phoneNumber edit-card__item'>
            <label htmlFor='phoneNumber'>Номер телефона</label>
            <PhoneInput placeholder='+7 777 777 7777' value={editedData.phoneNumber} onChange={handlePhoneChange} />
          </div>
          <div className='edit-card__aboutMe edit-card__item'>
            <label htmlFor='aboutMe'>Обо мне</label>
            <textarea
              name='aboutMe'
              rows={7}
              cols={4}
              maxLength={200}
              value={editedData.aboutMe}
              required
              onChange={(e) => handleInputChange(e)}
            />
          </div>

          <div className='edit-card__buttons'>
            <button className='card__button edit-card__button' onClick={handleCancel}>Отменить</button>
            <button className='card__button edit-card__button' type='submit'>Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};
