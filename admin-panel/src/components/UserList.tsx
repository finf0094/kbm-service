import React from "react";
import { Link } from "react-router-dom";
import { IUserSummary } from "../models/user/IUserDetail.ts";

interface IUserListProps {
    users: IUserSummary[];
    onSearch: (search: string) => void;
}

const UserList: React.FC<IUserListProps> = ({ users, onSearch }) => {
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const input = form.querySelector('input');
        if (input) onSearch(input.value);
    }

    return (
        <div className="content">
            <div className="content__inner">
                <div className="content__head">
                    <div className="content__title">Выберите пользователя для редактирования</div>
                    <form action="" className="content__search" onSubmit={handleSearch}>
                        <input type="text" placeholder="Поиск" />
                        <button type="submit"><svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_15_152)">
                                <rect width="24" height="24" />
                                <circle cx="10.5" cy="10.5" r="6.5" stroke="rgba(255,255,255,.2)" strokeLinejoin="round" />
                                <path className="content__search-icon_path" d="M19.6464 20.3536C19.8417 20.5488 20.1583 20.5488 20.3536 20.3536C20.5488 20.1583 20.5488 19.8417 20.3536 19.6464L19.6464 20.3536ZM20.3536 19.6464L15.3536 14.6464L14.6464 15.3536L19.6464 20.3536L20.3536 19.6464Z" fill="rgba(255,255,255,.2)" />
                            </g>
                            <defs>
                                <clipPath id="clip0_15_152">
                                    <rect width="24" height="24" />
                                </clipPath>
                            </defs>
                        </svg></button>
                    </form>
                    <Link to='add' className="content__add">Добавить пользователя</Link>
                </div>
                <table className="content__table">
                    <thead>
                        <tr>
                            <th className="content__table-id">ID</th>
                            <th className="content__table-title">Имя Фамилия</th>
                            <th className="content__table-title">Позиция</th>
                            <th className="content__table-title">Email</th>
                            <th className="content__table-title">Номер телефона</th>
                            <th className="content__table-title">ИИН</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td className="content__table-id">{user.id}</td>
                                <td className="content__table-title">
                                    {user.firstname && user.lastname ? <Link to={`${user.id}`}>{user.firstname} {user.lastname}</Link> : <Link to={`${user.id}`}>Редактировать</Link>}
                                </td>
                                <td className="content__table-title">{user.position}</td>
                                <td className="content__table-title">{user.email}</td>
                                <td className="content__table-title">{user.phoneNumber}</td>
                                <td className="content__table-title">{user.itin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserList;