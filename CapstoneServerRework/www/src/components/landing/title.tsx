import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const OutlineText = styled.h1`
    font-family: 'Rubik', sans-serif;
    -webkit-text-stroke-width: 5px;
    -webkit-text-stroke-color: ${(props: { filled?: boolean }) => (props.filled ? 'black' : Colors.darkest)};
    color: ${(props: { filled?: boolean }) => (props.filled ? 'black' : Colors.lightest)};
    font-size: 10em;
    margin: 0.01em auto 0 auto;
    line-height: 0.9em;
`;
