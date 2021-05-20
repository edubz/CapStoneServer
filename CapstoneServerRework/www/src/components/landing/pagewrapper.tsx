import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const PageWrapper = styled.div`
    width: 100vw;
    height: 100vh;

    overflow: hidden;

    background-color: ${Colors.light};
    margin: 0;

    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    @media (max-width: 1050px) {
        flex-wrap: nowrap;
    }
`;
