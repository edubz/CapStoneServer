import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const FocusWindow = styled.section`
    overflow-y: scroll;
    overflow-x: hidden;
    margin: 1.5vh auto 11vh auto;
    background-color: ${Colors.mid};
    width: 77vw;
    height: 66vh;
    min-height: 600px;

    ::-webkit-scrollbar {
        border-radius: 10px;
    }

    ::-webkit-scrollbar:disabled {
        display: none;
    }

    ::-webkit-scrollbar-thumb {
        border-radius: 8px;
        background: ${Colors.dark};
        opacity: 0.1;
    }

    border: 2px solid ${Colors.dark};
    border-radius: 10px;
`;