import './UI/PermissionsPage.css';

const PermissionsPage = () => {

    const rolesWithPermissions = [
        {
            role: 'ROLE_USER',
            permissions: [
                'Can modify their profile',
                'Can upload videos',
                'Can process applications',
                'Can take quizzes',
                'Can upload resumes',
                'Can download policy',
            ],
        },
        {
            role: 'ROLE_MODERATOR',
            permissions: [
                'Can create quizzes',
                'Can view reports',
                'Can approve applications',
                'Can reject applications',
                'Can schedule interviews',
                'Can download user videos',
                'Can download user resumes',
            ],
        },
        {
            role: 'ROLE_ADMIN',
            permissions: [
                'Can add curators',
                'Can add departments',
                'Can add locations',
                'Can add positions',
                'Can add policy',
                'Can delete positions',
                'Can delete locations',
                'Can delete departments',
                'Can delete policy',
                'Can delete curators'
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