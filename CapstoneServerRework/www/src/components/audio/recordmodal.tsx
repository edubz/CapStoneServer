import styled from 'styled-components';

export const RecordPromptModal = styled.div`
    display: ${(props: { shown: boolean }) => (props.shown ? 'block' : 'none')};
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.8);
`;
