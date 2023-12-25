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
        if (input) {
            onSearch(input.value);
        }
    }

    return (
        <div className="content">
            <div className="content__inner">
                <div className="content__head">
                    <div className="content__title">Select User to change</div>
                    <form className="content__search" onSubmit={handleSearch}>
                        <input type="text" placeholder="Поиск" />
                        <button type="submit" className="content__search-button">Search</button>
                    </form>
                    <Link to={`add`} className="content__add">
                        Add User
                    </Link>
                </div>
                <table className="content__table">
                    <thead>
                    <tr>
                        <th className="content__table-id">ID</th>
                        <th className="content__table-title">User</th>
                        <th className="content__table-title">Position</th>
                        <th className="content__table-title">Email</th>
                        <th className="content__table-title">Phone Number</th>
                        <th className="content__table-title">ITIN</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td className="content__table-id">{user.id}</td>
                            <td className="content__table-title">
                                <Link to={`${user.id}`}>{user.firstname} {user.lastname}</Link>
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