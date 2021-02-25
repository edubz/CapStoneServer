import styled from 'styled-components';
import { Colors } from '../globalstyles';

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.h1`
    width: 50vw;
    padding-left: 1.5vw;
    padding-top: 1.5vh;
    letter-spacing: 10px;
`;

const TitleLink = styled.a`
    text-decoration: none;
    color: ${Colors.darkest};
`;

export { Title, TitleContainer, TitleLink };
