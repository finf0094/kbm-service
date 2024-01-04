import React, { useRef } from 'react'
import { useDeletePolicyMutation, useGetAllPoliciesQuery, useUploadPolicyMutation } from '../redux/api/policyApi'
import Loader from '../components/utils/Loader';
import { baseUrl } from '../redux/api/baseQuery';

const PolicyPage = () => {

    const { data: policies, isLoading, isError } = useGetAllPoliciesQuery();
    const [uploadPolicy] = useUploadPolicyMutation();
    const [deletePolicy] = useDeletePolicyMutation();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            try {
                await uploadPolicy({ file });
                window.location.reload()
            } catch (error) {
                console.error("File upload failed");
            }
        }
    };

    const handleDelete = async (id: number) => {
        await deletePolicy(id);
        window.location.reload()
    };

    const openFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    if (isLoading) return <div className='center'><Loader /></div>
    if (isError) return <div className='center'>Ошибка при получении политики</div>

    return (
        <div className='policy'>
            <div className="policy__button" style={{ margin: "10px 0 25px" }}>
                <label className="user-edit__button" style={{ padding: '10px 25px', margin: '0 auto' }} onClick={openFileInput}>Добавить политику</label>
                <input
                    type="file"
                    accept=".pdf"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                />
            </div>
            {policies && <table className="content__table">
                <thead>
                    <tr>
                        <th className="content__table-id">id</th>
                        <th className="content__table-title">Политика</th>
                        <th className="content__table-title">Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy) => (
                        <tr key={policy.id}>
                            <td className="content__table-id">{policy.id}</td>
                            <td className="content__table-title content__table-link" onClick={() => window.location.href = `${baseUrl}/${policy.policyUrl}`}>{policy.policyUrl}</td>
                            <td className="content__table-title" onClick={() => handleDelete(policy.id)}>Удалить</td>
                        </tr>
                    ))}
                </tbody>
            </table>}
        </div>
    )
}

export default PolicyPage