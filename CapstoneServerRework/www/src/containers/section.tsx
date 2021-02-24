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
    background: linear-gradient(
        ${(props: Props) => (props.dark ? Colors.dark : Colors.light)},
        ${(props: Props) => (props.dark ? Colors.dark : Colors.dark)}
    );
    padding-top: 1.125vh;
`;
