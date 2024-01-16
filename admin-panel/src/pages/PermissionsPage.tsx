import './UI/PermissionsPage.css';

const PermissionsPage = () => {

    const rolesWithPermissions = [
        {
            role: 'ROLE_USER',
            permissions: [
                'Может изменять свой профиль',
                'Может загружать видео',
                'Может проходить заявку',
                'Может проходить тесты',
                'Может загружать резюме',
                'Может скачивать политику',
            ],
        },
        {
            role: 'ROLE_MODERATOR',
            permissions: [
                'Может создавать тесты',
                'Может просматривать отчеты',
                'Может одобрять заявки',
                'Может отклонять заявки',
                'Может назначать собеседования',
                'Может скачивать видео пользователей',
                'Может скачивать резюме пользователей',
            ],
        },
        {
            role: 'ROLE_ADMIN',
            permissions: [
                'Может добавлять кураторов',
                'Может добавлять отделы',
                'Может добавлять места',
                'Может добавлять позиции',
                'Может добавлять политику',
                'Может удалять позиции',
                'Может удалять места',
                'Может удалять отделы',
                'Может удалять политику',
                'Может удалять кураторов'
            ],
        },
    ];

    return (
        <div className="admin-panel">
            <h1>Права по ролям</h1>
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