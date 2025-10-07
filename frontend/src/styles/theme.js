// Tema com cores, fontes, etc.

const theme = {
    colors: {
        primary: '#007bff',      // Um azul principal para botões e links
        secondary: '#6c757d',    // Um cinza para textos secundários
        background: '#A1C0B1',   // Cor de fundo da página de login e de header e footer
        backgroundLight: '#D0E9E8', // Cor de fundo clara para fundos de seções (Conteúdo da página - <main>)
        success: '#28a745',      // Verde para ações de sucesso
        danger: '#dc3545',       // Vermelho para alertas e ações de exclusão
        light: '#f8f9fa',        // Cor de fundo clara
        dark: '#0D0F36',         // Cor de texto principal
        white: '#ffffff',
        gray: '#dee2e6',         // Cinza para bordas e divisórias
    },
    fonts: {
        family: {
            primary: '"Istok Web", Arial, sans-serif',
            secondary: 'Georgia, serif',
        },
        sizes: {
            small: '0.8rem',
            medium: '1rem',
            large: '1.2rem',
            xlarge: '1.5rem',
        },
    },
    spacing: {
        xsmall: '4px',
        small: '8px',
        medium: '16px',
        large: '24px',
        xlarge: '32px',
    },
    breakpoints: {
        mobile: '576px',
        tablet: '768px',
        desktop: '992px',
    },
    borderRadius: '4px',
};

export default theme;