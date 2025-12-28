import { useEffect, useState } from "react";
import PageHeader from "../../components/common/PageHeader";
import UserFilters from "./UserFilters";
import UserTable from "./UserTable";
import api from "../../api/axios";
import { Button } from "antd";
import AddUserModal  from "./AddUserModal"

function UserManagement() {
    const [openRole, setOpenRole] = useState(null); 
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("All");
    const [search, setSearch] = useState("");
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 5,
        total: 0,
    });

    const fetchUsers = async (page = 1) => {
        setLoading(true);

        const res = await api.get("users/users/", {
        params: {
            page,
            page_size: pagination.pageSize,
            role: role !== "All" ? role : undefined,
            search,
        },
        });

        setUsers(res.data.results);
        setPagination({
        ...pagination,
        current: page,
        total: res.data.count,
        });

        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(1);
    }, [role, search]);

  return (
    <>
      <PageHeader 
      title="User Management" 
      actions={
          <>
            <Button onClick={() => setOpenRole("GROUP_ADMIN")}>
              + Group Admin
            </Button>
            <Button onClick={() => setOpenRole("HOTEL_MANAGER")}>
              + Hotel Manager
            </Button>
            <Button onClick={() => setOpenRole("HOTEL_STAFF")}>
              + Hotel Staff
            </Button>
            <Button onClick={() => setOpenRole("SUPPORT")}>
              + Support Agent
            </Button>
          </>
        }
      />

      <UserFilters
        role={role}
        setRole={setRole}
        search={search}
        setSearch={setSearch}
      />

      <UserTable
        data={users}
        loading={loading}
        pagination={pagination}
        onChange={(pagination) => fetchUsers(pagination.current)}
      />

      {openRole && (
        <AddUserModal
          open={true}
          role={openRole}
          onClose={() => setOpenRole(null)}
        />
      )}
    </>
  );
}

export default UserManagement;
