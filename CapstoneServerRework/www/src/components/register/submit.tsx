import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const Submit = styled.input`
    width: 30%;
    margin: auto;
    font-size: 16px;
    font-weight: 800;
    border: 2px solid ${Colors.dark};
    border-radius: 10px;
    padding: 1em 0;

    :link {
        color: ${Colors.darkest};
    }

    :visited {
        color: ${Colors.dark};
    }

    :hover {
        font-weight: 600;
    }

    :active {
        opacity: 0.9;
    }
`;
