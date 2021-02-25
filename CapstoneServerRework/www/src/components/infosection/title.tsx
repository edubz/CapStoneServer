import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const InfoTitle = styled.h2`
    color: ${(props: { dark?: boolean }) => (props.dark ? Colors.dark : Colors.light)};
    font-weight: 600;
    text-align: center;
`;
