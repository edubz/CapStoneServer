import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const LogoSection = styled.div`
    width: 40vw;
    height: 60vh;
    overflow: hidden;

    display: flex;
    justify-content: center;
    margin: 1em auto;

    @media (max-width: 1050px) {
        height: auto;
        margin: 2em auto;
    }

    @media (max-width: 1050px) and (max-height: 1020px) {
        display: none;
    }
`;

export const Logo = styled.img`
    width: 90%;
    height: auto;
    align-self: center;
    color: ${Colors.darkest};
`;
