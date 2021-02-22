import styled from 'styled-components';
import { Colors } from '../globalstyles';

export const NavContainer = styled.div`
    width: 50vw;
`;

export const NavList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 100%;
    padding: 0 3.33vw 0 0;
    list-style: none;
`;

export const NavItem = styled.li``;

export const NavLink = styled.a`
    text-decoration: none;
    font-size: 1.25rem;

    :link {
        color: ${Colors.darkest};
    }

    :visited {
        color: ${Colors.darkest};
    }

    :hover {
        font-weight: 800;
    }

    :active {
        opacity: 0.6;
    }
`;

export const NavButton = styled.a`
    text-decoration: none;
    background-color: ${Colors.lightest};
    font-size: 1.25rem;
    font-weight: bold;
    padding: 0.75em;
    border-radius: 10px;

    :link {
        color: ${Colors.darkest};
    }

    :visited {
        color: ${Colors.darkest};
    }

    :hover {
        font-weight: 400;
        padding: 0.8em;
    }

    :active {
        opacity: 0.9;
    }
`;
