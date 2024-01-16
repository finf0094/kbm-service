import React, {useEffect, useState} from "react";
import './UI/ItemPage.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/utils/Loader.tsx";

interface IItemPageProps {
    queryFn: any;
    relatedQueryFn?: any;
    delQueryFn?: any;
    updateMutationFn: any;
    title: string;
    relatedTitle?: string;
    apiUtil: any
}

const ItemPage: React.FC<IItemPageProps> = ({ queryFn, relatedQueryFn, delQueryFn, updateMutationFn, title, relatedTitle, apiUtil }) => {
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
    const [deleteItem, { isLoading: deleteLoading, isSuccess: deleteSuccess, isError: deleteError, error: deleteErrorData }] = delQueryFn ? delQueryFn() : [null, { isLoading: false, isSuccess: false, isError: false, error: null }];
    const [updateItem, { isLoading: updateLoading, isSuccess: updateSuccess, isError: updateError, error: updateErrorData }] = updateMutationFn();

    useEffect(() => {
        if (deleteSuccess || updateSuccess) {
            // Инвалидируйте тег после успешного удаления или обновления элемента
            apiUtil.invalidateTags([{ type: 'Item' }]);
        }
    }, [deleteSuccess, updateSuccess, apiUtil]);

    const [editedName, setEditedName] = useState("");

    if (deleteError) return <div>{deleteErrorData.data.message}</div>
    if (updateError) return <div>{updateErrorData.data.message}</div>

    if (itemLoading || relatedLoading || deleteLoading || updateLoading) return <div className="center"><Loader /></div>
    if (itemError || relatedError || deleteError || updateError) return <div>Ошибка с загрузкой информации о элементе.</div>

    const handleDelete = () => {
        if (deleteItem) {
            deleteItem(id);
        }
    }

    const handleUpdate = () => {
        if (id && editedName) {
            updateItem({id, newName: editedName});
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
                        ): null}
                    </div>
                    {relatedData && (
                        <div className="related-items">
                            <h2 className="related-items__title">{relatedTitle && relatedTitle.toLowerCase()}</h2>
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