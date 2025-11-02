import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`

const StyledMain = styled.main`
    flex: 1;
`

const AdminHome = () => {
    return (
        <Container>
            <Header userType="admin" />
            <StyledMain>
                <Outlet />
            </StyledMain>
            <Footer />
        </Container>
    );
};

export default AdminHome;