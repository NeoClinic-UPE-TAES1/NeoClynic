import styled from "styled-components";
import SadDogImage from "../../assets/images/sad-dog.png";
import { Link } from "react-router-dom";

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    gap: 10px;
`
const StyledImg = styled.img`
    width: 200px;
    height: auto;
`

const StyledButton = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 15%;
    height: 5%;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    text-decoration: underline;

    &:hover {
        text-decoration: none;
    }
`

const NaoEncontrada = () => {
    return (
        <StyledDiv>
            <StyledImg src={SadDogImage} alt="Cachorro triste" />
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <p>Desculpe, mas a página que você está procurando não existe.</p>
            <StyledButton to="/">Voltar para a página inicial</StyledButton>
        </StyledDiv>
    );
}

export default NaoEncontrada;