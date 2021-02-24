import styled from 'styled-components';
import { Colors } from '../components/globalstyles';
export const Footer = styled.footer`
    height: ${(props: { big?: boolean }) => (props.big ? '44vh' : '11.9vh')};
    background: ${Colors.dark};

    display: flex;
`;
