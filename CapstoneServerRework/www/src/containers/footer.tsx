import styled from 'styled-components';
import { Colors } from '../components/globalstyles';
export const Footer = styled.footer`
    height: ${(props: { big?: boolean }) => (props.big ? '24vh' : '11.9vh')};
    background-color: ${Colors.light};
`;
