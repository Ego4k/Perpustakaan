import SidebarSiswa from "../components/SidebarSiswa";

const SiswaLayout = ({
  children,
}) => {
  return (
    <div className="layout">
      <SidebarSiswa />

      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default SiswaLayout;