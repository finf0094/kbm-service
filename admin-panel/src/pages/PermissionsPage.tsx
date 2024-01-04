import './UI/PermissionsPage.css'

const PermissionsPage = () => {

    return (
        <div className="admin-panel">
            <h1>Add Group</h1>
            <div className="form-container">
                <form>
                    <div className="form-group">
                        <label htmlFor="groupName">Name:</label>
                        <input type="text" id="groupName" name="groupName" />
                    </div>
                    <div className="permissions-container">
                        <div className="available-permissions">
                            <h2>Available Permissions</h2>
                            {/* Здесь будет список доступных разрешений */}
                        </div>
                        <div className="selected-permissions">
                            <h2>Chosen Permissions</h2>
                            {/* Здесь будет список выбранных разрешений */}
                        </div>
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        </div>
    );
};

export default PermissionsPage;