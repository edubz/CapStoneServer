import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const GalleryButton = styled.a`
    text-decoration: none;
    background-color: ${Colors.dark};
    font-size: 1.44rem;
    font-family: 'Rubik', sans-serif;
    font-weight: 600;
    padding: 0.5em 1em;
    border-radius: 10px;
    border: 2px solid ${Colors.lightest};
    color: ${Colors.lightest};
    -webkit-text-stroke: 1px;
    -webkit-text-stroke-color: ${Colors.darkest};

    :link {
        color: ${Colors.lightest};
    }

    :visited {
        color: ${Colors.lightest};
    }

    :hover {
        font-weight: 600;
        padding: 0.6em 1.1em;
    }

    :active {
        opacity: 0.9;
    }
`;
