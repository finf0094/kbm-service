import React, { useState } from "react";
import './UI/ItemPage.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/utils/Loader.tsx";
import { toast } from "react-toastify";

interface IItemPageProps {
    queryFn: any;
    relatedQueryFn?: any;
    delQueryFn?: any;
    updateMutationFn: any;
    title: string;
    relatedTitle?: string;
}

const ItemPage: React.FC<IItemPageProps> = ({ queryFn, relatedQueryFn, delQueryFn, updateMutationFn, title, relatedTitle }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        data: itemData,
        isLoading: itemLoading,
        isError: itemError,
    } = queryFn(id);
    

    // Query for related items
    const {
        data: relatedData,
        isLoading: relatedLoading,
        isError: relatedError,
    } = relatedQueryFn ? relatedQueryFn({ id, search: '', offset: 0, pageSize: 10 }) : { data: null, isLoading: false, isError: false };

    // Mutation for deleting item
    const [deleteItem, { isLoading: deleteLoading, isError: deleteError, error: deleteErrorData }] = delQueryFn ? delQueryFn() : [null, { isLoading: false, isError: false, error: null }];
    const [updateItem, { isLoading: updateLoading, isError: updateError, error: updateErrorData }] = updateMutationFn();
    console.log(itemData);
    
    const [editedName, setEditedName] = useState(itemData.name);


    if (deleteError) return <div>{deleteErrorData.data.message}</div>
    if (updateError) return <div>{updateErrorData.data.message}</div>
    if (!itemData) return <div>Не удалось получить информацию о элементе.</div>; // or return a loading indicator

    if (itemLoading || relatedLoading || deleteLoading || updateLoading) return <div className="center"><Loader /></div>
    if (itemError || relatedError || deleteError || updateError) return <div>Ошибка с загрузкой информации о элементе.</div>

    const handleDelete = () => {
        if (deleteItem) {
            deleteItem(id);
            toast.success('Успешно удалено.')
        }
    }

    const handleUpdate = () => {
        if (updateItem) {
            updateItem(id, editedName);
            window.history.back();
            window.location.reload();
            toast.success(`${itemData.name} успешно переименован в ${editedName}!`)
        }
    }

    return (
        <div>
            <div className="item">
                <div className="item__inner">
                    <div className="item__head">
                        <h1 className="item__title">{title}</h1>
                        <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                        <form onSubmit={handleUpdate} className="item__head-info">
                            <button className="item__save" onClick={handleUpdate}>Сохранить</button>
                            {delQueryFn && (
                                <button onClick={handleDelete} className="item__delete">Удалить</button>
                            )}
                        </form>
                        {itemData.location || itemData.department || itemData.department && itemData.department.location ? (
                            <div className="item__datas">
                                {itemData.location && (
                                    <p className="item__data">Локация: <span>{itemData.location.name}</span></p>
                                )}
                                {itemData.department && (
                                    <p className="item__data">Департамент: <span>{itemData.department.name}</span></p>
                                )}
                                {itemData.department && itemData.department.location && (
                                    <p className="item__data">Локация: <span>{itemData.department.location.name}</span></p>
                                )}
                            </div>
                        ) : <p className="item__data-notFound">Не найдено локации или департаментов.</p>}
                    </div>
                    {relatedData && (
                        <div className="related-items">
                            <h2 className="related-items__title">Похожие {relatedTitle && relatedTitle.toLowerCase()}</h2>
                            <table className="content__table">
                                <thead>
                                    <tr>
                                        <th className="content__table-id">id</th>
                                        <th className="content__table-title">{relatedTitle}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {relatedData.content.map((item: any) => (
                                        <tr key={item.id}>
                                            <td className="content__table-id">{item.id}</td>
                                            <td className="content__table-title"><Link to="" onClick={() => navigate(-1)}>{item.name}</Link></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ItemPage;