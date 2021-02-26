import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const EnterButton = styled.a`
    text-decoration: none;
    text-align: center;
    background-color: ${Colors.light};
    font-size: 5em;
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    padding: 0.15em;
    border-radius: 10px;
    border: 5px solid ${Colors.dark};
    margin: 0 1em;

    :link {
        color: ${Colors.darkest};
    }

    :visited {
        color: ${Colors.dark};
    }

    :hover {
        font-weight: 600;
        padding: 0.18em;
        cursor: pointer;
    }

    :active {
        opacity: 0.9;
    }
`;
