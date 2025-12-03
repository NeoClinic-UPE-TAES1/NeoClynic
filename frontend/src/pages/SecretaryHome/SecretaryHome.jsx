import { Outlet } from 'react-router-dom';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%);
`

const StyledMain = styled.main`
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
`

const SecretaryHome = () => {
    return (
        <Container>
            <Header userType="secretary" />
            <StyledMain>
                <Outlet />
            </StyledMain>
            <Footer />
        </Container>
    );
};

export default SecretaryHome;