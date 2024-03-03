import { FC, FormEvent, useEffect, useState } from 'react'
import './ProfilePage.css'
import { UserCard } from '@/entities/user'
import useCurrentUser from '@/shared/lib/useCurrentUser'
import { useGetUserByItinQuery, useUpdateUserMutation } from '@/entities/user'
import { ProgressSpinner } from 'primereact/progressspinner'
import { UserEdit } from '@/entities/user'
import { IUserDetail } from '@/entities/user'
import { toast } from 'react-toastify'

export const ProfilePage: FC = () => {

	const { itin } = useCurrentUser()
	const [isEditing, setIsEditing] = useState<boolean>(false);

	const {
		data: userData,
		isSuccess: isUserSuccess,
		isLoading: isUserLoading,
		isError: isUserError,
		error: userError,
	} = useGetUserByItinQuery(itin)

	const [updateUser, {
		data: updatedData,
		isSuccess: isUpdateSuccess,
		isLoading: isUpdateLoading,
		isError: isUpdateError,
		error: updateError,
	}] = useUpdateUserMutation()

	console.log(userData);
	
	useEffect(() => {
		// eslint-disable-next-line
		// @ts-ignore
		// if (isUserError && userError && 'data' in userError && userError.data) toast.error(userError.data.message);
		if (isUserError) console.log(userError);
		
		// eslint-disable-next-line
		// @ts-ignore
		// if (isUpdateError && updateError && 'data' in updateError && updateError.data) toast.error(updateError.data.message)
		if (isUpdateError) console.log(updateError);
		if (isUpdateSuccess) toast.success('Информация успешно изменена!')
		if (updatedData) console.log('updated data', updatedData);
	}, [isUserError, userError, isUpdateError, updateError, isUpdateSuccess, updatedData])

	if (isUserLoading || isUpdateLoading) {
		return <div className="page"><ProgressSpinner /></div>
	}


	if (isUserError && userError && 'data' in userError && userError.data) {
		return <div className="page">{userError.data.message}</div>
	}

	if (!isUserSuccess) return <div className="page">Ошибка!</div>
	
	const handleSave = (data: IUserDetail, e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
    setIsEditing(false)
		console.log(data);
		
		updateUser(data);
	}

	return (
		<div className='profile page'>
			{isEditing 
				? <UserEdit data={userData} handleSave={handleSave} />
				: <UserCard data={userData} handleEdit={() => setIsEditing(true)} />
			}
		</div>
	)
}