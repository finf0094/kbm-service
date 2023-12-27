import React, { useState } from "react";

import {useGetAllLocationsQuery} from "../../redux/api/locationApi.ts";
import {useGetAllDepartmentsQuery} from "../../redux/api/departmentApi.ts";
import {useGetAllPositionsQuery} from "../../redux/api/positionApi.ts";

import List from "../../components/List.tsx";
import Loader from "../../components/utils/Loader.tsx";
import Pagination from "../../components/Pagination.tsx";


const ItemListPage: React.FC<{
    queryFn: typeof useGetAllLocationsQuery | typeof useGetAllDepartmentsQuery | typeof useGetAllPositionsQuery,
    title: string
}> = ({ queryFn, title }) => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0)

    const { data: items, isLoading, isSuccess } = queryFn({
        search,
        offset: currentPage,
        pageSize: 10,
    });

    if (isLoading) return <div className="center"><Loader/></div>;
    if (!isSuccess) return <div>Ошибка при загрузке {title}</div>;

    const handleSearch = (search: string) => {
        setSearch(search);
        setCurrentPage(0); // Сбросить текущую страницу при поиске
    }

    return (
        <div>
            <List title={title} items={items.content} onSearch={handleSearch} />
            {items.totalPages > 1 && <Pagination totalPages={items.totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
        </div>
    );
};

export default ItemListPage;