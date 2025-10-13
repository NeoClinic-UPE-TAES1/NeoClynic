import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const AdminHome = () => {
    return (
        <>
            <Header userType="admin" />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default AdminHome;