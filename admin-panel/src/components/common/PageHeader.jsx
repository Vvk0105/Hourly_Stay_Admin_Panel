import { Breadcrumb, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function PageHeader({ title }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
      <div>
        <Breadcrumb
          items={[
            { title: "Home" },
            { title }
          ]}
        />
        <h2 style={{ marginTop: 8 }}>{title}</h2>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        <Button>+ Group Admin</Button>
        <Button>+ Hotel Manager</Button>
        <Button>+ Hotel Staff</Button>
        <Button>+ Support</Button>
      </div>
    </div>
  );
}

export default PageHeader;
