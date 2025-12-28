import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RoleTag from "../../components/common/RoleTag";

function UserTable({ data, loading, pagination, onChange }) {  
  const columns = [
    {
      title: "Name",
      dataIndex: "username",
    },
    {
      title: "Email ID",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
    },
    {
      title: "Hotels",
      render: (_, record) => 
        record.hotels && record.hotels.length
        ? record.hotels.map(h => h.name).join(", ") : ""
    },
    {
      title: "Roles",
      render: (_, record) => <RoleTag role={record.role} />,
    },
    {
      title: "Action",
      render: () => (
        <Space>
          <Button type="text" icon={<EditOutlined />} />
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Space>
      ),
    },
  ];

  return (
    <Table
      rowKey="uuid"
      columns={columns}
      dataSource={data}
      loading={loading}
      pagination={{
        ...pagination,
        placement: ["bottomCenter"],
    }}
      onChange={onChange}
    />
  );
}

export default UserTable;
