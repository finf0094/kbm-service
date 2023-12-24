import React, { useState } from "react";
import {useGetAllLocationsQuery} from "../redux/api/locationApi.ts";
import {useGetAllDepartmentsQuery} from "../redux/api/departmentApi.ts";
import List from "../components/List.tsx";
import Loader from "../components/utils/Loader.tsx";
import {useGetAllPositionsQuery} from "../redux/api/positionApi.ts";

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
    if (!isSuccess) return <div>Error loading {title}</div>;

    const handleSearch = (search: string) => {
        setSearch(search);
        setCurrentPage(0); // Сбросить текущую страницу при поиске
    }

    return <List title={title} items={items.content} onSearch={handleSearch} />;
};

export default ItemListPage;