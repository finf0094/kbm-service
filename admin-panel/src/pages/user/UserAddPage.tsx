import React, { useState } from "react";
import "./styles.css";
import { useCreateUserMutation } from "../../redux/api/userApi.ts";
import { IUserDetail } from "../../models/user/IUserDetail.ts";
import { useNavigate } from "react-router-dom";
import { useGetAllPositionsQuery } from "../../redux/api/positionApi.ts";
import { toast } from "react-toastify";

// Mock roles data
const roles = [
  { id: 1, name: "ROLE_USER" },
  { id: 2, name: "ROLE_MODERATOR" },
  { id: 3, name: "ROLE_ADMIN" },
];

const UserAddPage: React.FC = () => {
  const [createUser, { error, isSuccess }] = useCreateUserMutation();
  const { data: positions } = useGetAllPositionsQuery({
    search: "",
    offset: 0,
    pageSize: 100,
  });
  const [userData, setUserData] = useState<IUserDetail>({
    id: 0,
    itin: "",
    firstname: "",
    lastname: "",
    password: "",
    email: "",
    position: {
      id: 0,
      name: "",
    },
    phoneNumber: "",
    roles: [
      {
        id: 0,
        name: "",
      },
    ],
    aboutMe: "",
  });
  const navigate = useNavigate();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPositionId = parseInt(event.target.value, 10); 
    const selectedPosition = positions?.content.find(
      (position) => position.id === selectedPositionId
    );
    
    if (selectedPosition) {
      setUserData({ ...userData, position: selectedPosition });
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserData({
      ...userData,
      roles: roles.filter((role) => role.name === event.target.value),
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (error && 'data' in error && error.data) return toast.error(`Ошибка: ${error.data.message}`);
  if (isSuccess) return toast.success('Пользователь успешно создан!');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await createUser(userData).unwrap();
      console.log("Curator created successfully:", result);

      setUserData({
        id: 0,
        itin: "",
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        position: {
          id: 0,
          name: "",
        },
        phoneNumber: "",
        roles: [
          {
            id: 0,
            name: "",
          },
        ],
        aboutMe: "",
      });
      navigate("/auth/users", { replace: true });
    } catch (error) {
      // Handle the error, e.g., display an error message
      console.error("Error creating curator:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="user-edit">
      <div className="user-edit__row">
        <label className="user-edit__item">
          Имя:
          <input
            type="text"
            name="firstname"
            value={userData.firstname}
            onChange={handleInputChange}
          />
        </label>
        <label className="user-edit__item">
          Фамилия:
          <input
            type="text"
            name="lastname"
            value={userData.lastname}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="user-edit__row">
        <label className="user-edit__item">
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <label className="user-edit__item">
          Номер телефона:
          <input
            type="tel"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <div className="user-edit__row">
        <label className="user-edit__item">
          ИИН:
          <input
            type="text"
            name="itin"
            value={userData.itin}
            onChange={handleInputChange}
          />
        </label>
        <label className="user-edit__item">
          Пароль:
          <input
              type="text"
              name="itin"
              value={userData.password}
              onChange={handleInputChange}
          />
        </label>
        {positions && (
          <label className="user-edit__item">
            Позиция:{" "}
            <select
              name="position"
              value={userData.position?.id}
              onChange={handleSelectChange}
            >
              <option value="">Выберите</option>
              {positions.content.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <label className="user-edit__item" style={{ width: "100%" }}>
        Роль:{" "}
        <select
          name="role"
          value={userData.roles[0]?.name}
          onChange={handleRoleChange}
        >
          <option value="">Выберите</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </select>
      </label>

      <div className="user-edit__buttons">
        <button type="submit" className="user-edit__button">
          Создать
        </button>
      </div>

    </form>
  );
};

export default UserAddPage;
