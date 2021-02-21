import { HeaderContainer } from './headerstyle';
import { Title, TitleContainer } from '../components/header/title';
import { NavContainer, NavList, NavItem, NavLink, NavButton } from '../components/header/nav';
import React from 'react';
export function Header() {
    return (
        <>
            <HeaderContainer>
                <TitleContainer>
                    <Title>THE INPUT</Title>
                </TitleContainer>
                <NavContainer>
                    <NavList>
                        <NavItem>
                            <NavLink>HOME</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>DEVICES</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink>GALLERY</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavButton>REGISTER</NavButton>
                        </NavItem>
                    </NavList>
                </NavContainer>
            </HeaderContainer>
        </>
    );
}
