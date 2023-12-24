import { useState } from "react";
import { useGetAllDepartmentsQuery } from "../../redux/api/departmentApi";
import List from "../../components/List";

const Departments = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0)

    const { data: departments, isError, error, isLoading, isSuccess } = useGetAllDepartmentsQuery({
        search,
        offset: currentPage,
        pageSize: 10,
      });
      
      console.log(departments);


    if (!isSuccess) {
        return <div>Error loading departments</div>;
    }

    if (isError) {
        console.log(error);
    }

    return <List title="Department" items={departments.content} />;
};

export default Departments;
