import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const InfoCard = styled.div`
    width: 30vw;
    height: inherit;

    background: linear-gradient(${Colors.darkest}, ${Colors.dark});
    /* border: 2px solid;
    border-image-slice: 3;
    border-image-source: linear-gradient(to bottom, ${Colors.light}, ${Colors.mid}); */
    border-radius: 50px;
`;
