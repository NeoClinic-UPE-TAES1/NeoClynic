import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';

const SecretaryHome = () => {
    return (
        <>
            <Header userType="secretary" />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default SecretaryHome;