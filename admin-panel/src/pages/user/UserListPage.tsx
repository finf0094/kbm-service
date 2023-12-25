import React, { useState } from "react";
import {useGetAllUsersQuery} from "../../redux/api/userApi.ts";
import Loader from "../../components/utils/Loader.tsx";
import UserList from "../../components/UserList.tsx";
import Pagination from "../../components/Pagination.tsx";

const UserListPage: React.FC = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0);

    const { data: users, isLoading, isSuccess } = useGetAllUsersQuery({
        search,
        offset: currentPage,
        pageSize: 10,
    });

    if (isLoading) return <div className="center"><Loader/></div>;
    if (!isSuccess) return <div>Error loading users</div>;

    const handleSearch = (search: string) => {
        setSearch(search);
        setCurrentPage(0); // Reset current page on search
    }

    return (
        <div>
            <UserList users={users.content} onSearch={handleSearch} />
            <Pagination totalPages={users.totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
    );
};

export default UserListPage;