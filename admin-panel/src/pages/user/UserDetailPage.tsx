import React, { useEffect, useState } from "react";
import './styles.css'
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../../redux/api/userApi.ts";
import { useGetAllPositionsQuery } from "../../redux/api/positionApi.ts";


// Mock roles data
const roles = [
    { id: 1, name: "ROLE_USER" },
    { id: 2, name: "ROLE_MODERATOR" },
    { id: 3, name: "ROLE_ADMIN" }
];

const UserDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { data: user, isLoading } = useGetUserQuery({ id: Number(id) });
    const { data: positions } = useGetAllPositionsQuery({ search: "", offset: 0, pageSize: 100 });
    const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();

    const [editedUser, setEditedUser] = useState(user);

    useEffect(() => {
        if (isUpdateSuccess) {
            navigate("/auth/users");
        }
    }, [isUpdateSuccess]);

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    if (isLoading || !editedUser || !positions) return <div>Loading...</div>;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditedUser({ ...editedUser, [event.target.name]: event.target.value });
    };

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedPosition = positions.content.find(position => position.name === event.target.value);
        if (selectedPosition) {
            setEditedUser({ ...editedUser, position: selectedPosition });
        }
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setEditedUser({ ...editedUser, roles: roles.filter(role => role.name === event.target.value) });
    };


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        updateUser({ userId: Number(id), user: editedUser });
        window.location.href = 'http://localhost:5173/auth/users'
    };

    return (
        <form onSubmit={handleSubmit} className="user-edit">
            <label className="user-edit__item">
                Имя:
                <input type="text" name="firstname" value={editedUser.firstname} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Фамилия:
                <input type="text" name="lastname" value={editedUser.lastname} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Email:
                <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Номер телефона:
                <input type="tel" name="phoneNumber" value={editedUser.phoneNumber} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                ИИН:
                <input type="text" name="itin" value={editedUser.itin} onChange={handleInputChange} />
            </label>
            <label className="user-edit__item">
                Позиция:
                <select name="position" value={editedUser.position?.id} onChange={handleSelectChange}>
                    {positions.content.map((position) => (
                        <option key={position.id} value={position.id}>{position.name}</option>
                    ))}
                </select>
            </label>
            <label className="user-edit__item">
                Роль:
                <select name="role" value={editedUser.roles[0]?.name} onChange={handleRoleChange}>
                    {roles.map((role) => (
                        <option key={role.id} value={role.name}>{role.name}</option>
                    ))}
                </select>
            </label>
            <button type="submit" className="user-edit__button">Сохранить</button>
        </form>
    );
};

export default UserDetailPage;