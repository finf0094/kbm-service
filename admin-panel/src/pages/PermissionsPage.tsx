import './UI/PermissionsPage.css';

const PermissionsPage = () => {

    const rolesWithPermissions = [
        {
            role: 'ROLE_USER',
            permissions: [
                'Может изменять свой профиль',
                'Может загружать видео',
                'Может проходить заявку',
                'Может проходить quiz',
                'Может загружать резюме',
                'Может скачивать политику',
            ],
        },
        {
            role: 'ROLE_MODERATOR',
            permissions: [
                'Может создавать квиз',
                'Может смотреть отчет',
                'Может approve заявки',
                'Может reject заявки',
                'Может назначать собеседование',
                'Может скачивать видео пользователя',
                'Может скачивать резюме пользователя',
            ],
        },
        {
            role: 'ROLE_ADMIN',
            permissions: [
                'Может добавлять локацию',
                // Дополнительные разрешения для админа
            ],
        },
    ];

    return (
        <div className="admin-panel">
            <h1>Permissions by Role</h1>
            <div className="permissions-container">
                {rolesWithPermissions.map((roleWithPermissions) => (
                    <div key={roleWithPermissions.role} className="role-permissions">
                        <h2>{roleWithPermissions.role}</h2>
                        <ul className="permissions-list">
                            {roleWithPermissions.permissions.map((permission, index) => (
                                <li key={index}>{permission}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PermissionsPage;