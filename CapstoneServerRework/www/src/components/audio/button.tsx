import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const ModalButton = styled.a`
    text-decoration: none;
    cursor: pointer;
    border: 2px solid ${Colors.dark};
    padding: 1em 2em;
    border-radius: 5px;

    font-weight: 900;

    margin-bottom: 2em;

    :link {
        color: ${Colors.dark};
    }

    :visited {
        color: ${Colors.dark};
    }

    :hover {
        color: ${Colors.darkest};
    }

    :active {
        color: ${Colors.mid};
    }
`;
