import styled from 'styled-components';

export const FlexContainer = styled.div`
    width: 98%;
    height: 100%;
    margin: auto;

    display: flex;
    flex-wrap: ${(props: { column?: boolean }) => (props.column ? 'none' : 'wrap')};
    flex-direction: ${(props: { column?: boolean }) => (props.column ? 'column' : 'row')};
`;
