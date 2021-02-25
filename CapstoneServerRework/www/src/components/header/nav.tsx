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
    font-size: 1.25em;
    font-weight: 600;

    :link {
        color: ${Colors.dark};
    }

    :visited {
        color: ${Colors.dark};
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
    font-size: 16px;
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    padding: 0.75em;
    border-radius: 10px;
    border: 2px solid ${Colors.dark};

    :link {
        color: ${Colors.darkest};
    }

    :visited {
        color: ${Colors.dark};
    }

    :hover {
        font-weight: 600;
        padding: 0.8em;
    }

    :active {
        opacity: 0.9;
    }
`;
