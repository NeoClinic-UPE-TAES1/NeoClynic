import React from 'react';
import styled from 'styled-components';

const FooterBar = styled.footer`
	width: 100%;
	padding: 1rem;
	text-align: center;
	background: linear-gradient(90deg, #f5f7f6, #eef6f2);
	color: #2c6b63;
	border-top: 1px solid rgba(0,0,0,0.04);
`;

const Footer = () => (  
	<FooterBar>
		<div>&copy; 2025 NeoClinic. Todos os direitos reservados.</div>
		<div style={{ fontSize: 12, marginTop: 6 }}>Sistema em conformidade com a LGPD</div>
	</FooterBar>
);

export default Footer;