// /src/pages/admin/Sidebar.jsx or SidebarLayout.jsx
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    return (
        <div className="">
            <Sidebar />
            <div className="ml-0 md:ml-64 p-4">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
