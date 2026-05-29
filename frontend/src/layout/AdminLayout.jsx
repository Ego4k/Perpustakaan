import SidebarAdmin from "../components/SidebarAdmin";

const AdminLayout = ({
  children,
}) => {
  return (
    <div className="layout">
      <SidebarAdmin />

      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;