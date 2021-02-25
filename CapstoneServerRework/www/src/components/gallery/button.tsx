import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const GalleryButton = styled.a`
    text-decoration: none;
    background-color: ${Colors.light};
    font-size: 16px;
    font-family: 'Rubik', sans-serif;
    font-weight: 600;
    padding: 1em 2em;
    border-radius: 10px;
    border: 2px solid ${Colors.dark};

    :link {
        color: ${Colors.dark};
    }

    :visited {
        color: ${Colors.dark};
    }

    :hover {
        font-weight: 600;
        padding: 0.8em 1.8em;
    }

    :active {
        opacity: 0.9;
    }
`;
