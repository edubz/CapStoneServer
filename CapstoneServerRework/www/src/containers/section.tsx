import styled from 'styled-components';
import { Colors } from '../components/globalstyles';

interface Props {
    primary?: boolean;
    dark?: boolean;
}

export const Section = styled.section`
    height: ${(props: Props) => (props.primary ? '80vh' : '85vh')};
    max-height: 1440px;
    min-height: 700px;
    background-color: ${(props: Props) => (props.dark ? Colors.mid : Colors.light)};
    padding-top: 1.125vh;
`;
