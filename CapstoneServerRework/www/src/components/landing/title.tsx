import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const OutlineText = styled.h1`
    font-family: 'Rubik', sans-serif;
    -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: ${(props: { filled?: boolean }) => (props.filled ? 'black' : Colors.darkest)};
    color: ${(props: { filled?: boolean }) => (props.filled ? 'black' : Colors.light)};
    font-size: 10em;
    margin: 0.01em auto 0 auto;
    line-height: 0.9em;

    @media (max-width: 1415px) {
        font-size: 11vw;
    }
    @media (max-width: 1050px) {
        font-size: 7em;
        margin: 0.25em;
    }
`;
