import { useState } from "react";
import { useGetAllLocationsQuery } from "../../redux/api/locationApi";
import List from "../../components/List";

const Locations = () => {
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(0)

    const { data: locations, isLoading, isSuccess } = useGetAllLocationsQuery({
        search,
        offset: currentPage,
        pageSize: 10,
      });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isSuccess) {
        return <div>Error loading locations</div>;
    }

    return <List title="Location" items={locations.content} />;
};

export default Locations;
