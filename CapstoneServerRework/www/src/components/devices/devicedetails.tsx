import styled from 'styled-components';
import { Colors } from '../globalstyles';
export const StyledDetails = styled.details`
    summary > * {
        display: inline;
    }
`;

export const StyledSummary = styled.summary`
    /* display: inline; */
    padding: 0 1em 1em 1em;
    width: 100%;
    ::marker {
        /* align-self: flex-end; */
        /* justify-self: flex-start; */
        color: ${Colors.light};
    }
`;
