import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const LogoSection = styled.div`
    width: 40vw;
    height: 75vh;
    overflow: hidden;

    display: flex;
    justify-content: center;
`;

export const Logo = styled.img`
    width: 45vw;
    align-self: center;
    transform: translateY(-15%);
    color: ${Colors.darkest};
`;
