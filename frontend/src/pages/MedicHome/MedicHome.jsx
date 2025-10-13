import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const MedicHome = () => {
    return (
        <>
            <Header userType="medic" />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MedicHome;