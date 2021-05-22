import styled from 'styled-components';
import { Colors } from '../globalstyles';
export const StyledDetails = styled.details``;

export const StyledSummary = styled.summary`
    > * {
        display: inline;
    }
    /* display: inline; */
    padding-left: 1em;
    width: 100%;
    ::marker {
        /* align-self: flex-end; */
        /* justify-self: flex-start; */
        color: ${Colors.lightest};
    }
`;
