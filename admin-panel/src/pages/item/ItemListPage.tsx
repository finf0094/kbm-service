import React, { useState } from "react";

import List from "../../components/List.tsx";
import Loader from "../../components/utils/Loader.tsx";
import Pagination from "../../components/Pagination.tsx";
import CuratorList from "../../components/CuratorList.tsx";


const ItemListPage: React.FC<{
    queryFn: any,
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

    let itemsComponent;
    switch (title) {
        case 'кураторов':
            itemsComponent = <CuratorList items={items.content} onSearch={handleSearch} />;
            break;
        default:
            itemsComponent = <List title={title} items={items.content} onSearch={handleSearch} />;
    }

    return (
        <div>
            {itemsComponent}
            {items.totalPages > 1 && <Pagination totalPages={items.totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
        </div>
    );
};

export default ItemListPage;