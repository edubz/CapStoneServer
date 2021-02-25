import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const GalleryElement = styled.div`
    min-height: 15%;
    width: 100%;

    border: 2px solid ${Colors.lightest};
    border-radius: 10px;
    margin: 0.5% 0 0 0;

    background-color: ${Colors.dark};

    display: flex;
    align-items: center;
`;
