import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const GalleryButton = styled.a`
    text-decoration: none;
    background-color: ${Colors.lightest};
    font-size: 16px;
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    padding: 0.25em 0.5em;
    border-radius: 10px;
    border: 2px solid ${Colors.dark};

    :link {
        color: ${Colors.darkest};
    }

    :visited {
        color: ${Colors.dark};
    }

    :hover {
        font-weight: 600;
        padding: 0.5em 0.75em;
    }

    :active {
        opacity: 0.9;
    }
`;
