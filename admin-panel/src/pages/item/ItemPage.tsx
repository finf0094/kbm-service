import React from "react";
import {useParams} from "react-router-dom";
import Loader from "../../components/utils/Loader.tsx";
import List from "../../components/List.tsx";

interface IItemPageProps {
    queryFn: any;
    relatedQueryFn?: any;
    delQueryFn?: any;
    title: string;
}

const ItemPage: React.FC<IItemPageProps> = ({queryFn, relatedQueryFn, delQueryFn, title}) => {
    const {id} = useParams();

    // Query for item details
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


    if (deleteError) return <div>{deleteErrorData.data.message}</div>
    if (itemLoading || relatedLoading || deleteLoading) return <div className="center"><Loader/></div>
    if (itemError || relatedError || deleteError) return <div>Error loading data</div>

    const handleSearch = () => {
        console.log("1")
    }

    const handleDelete = () => {
        if (deleteItem) {
            deleteItem(id);
        }
    }

    return (
        <div>
            <h1>{title}</h1>
            {/* Display item details */}
            <div>
                <h2>{itemData.name}</h2>
                {itemData.location && (
                    <p>Location: {itemData.location.name}</p>
                )}
                {itemData.department && (
                    <p>Department: {itemData.department.name}</p>
                )}
                {itemData.department && itemData.department.location && (
                    <p>Location: {itemData.department.location.name}</p>
                )}
                {delQueryFn && (
                    <button onClick={handleDelete}>Delete</button>
                )}
            </div>
            <hr></hr>
            {/* Display related items */}
            {relatedData && (
                <div>
                    <h2>Related Items</h2>
                    <List title="Department" items={relatedData.content} onSearch={handleSearch} />
                </div>
            )}
        </div>
    );
}

export default ItemPage;