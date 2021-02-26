import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const Submit = styled.input`
    width: 30%;
    margin: auto;
    font-size: 16px;
    font-weight: 800;
    border: 2px solid ${Colors.lightest};
    border-radius: 10px;
    padding: 1em 0;
    color: ${Colors.lightest};
    background-color: ${Colors.dark};

    :link {
        color: ${Colors.lightest};
    }

    :visited {
        color: ${Colors.lightest};
    }

    :hover {
        font-weight: 600;
    }

    :active {
        opacity: 0.9;
    }
`;
