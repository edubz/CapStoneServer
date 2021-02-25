import React from 'react';
import { GlobalStyle } from '../components/globalstyles';
import { EnterButton } from '../components/landing/button';
import { Logo, LogoSection } from '../components/landing/logo';
import { PageWrapper } from '../components/landing/pagewrapper';
import { OutlineText } from '../components/landing/title';
import { TitleSection } from '../components/landing/titlesection';

export const LandingPage = () => {
    return (
        <>
            <GlobalStyle />
            <PageWrapper>
                <TitleSection>
                    <OutlineText>THE INPUT</OutlineText>
                    <OutlineText>THE INPUT</OutlineText>
                    <OutlineText>THE INPUT</OutlineText>
                    <OutlineText filled>THE INPUT</OutlineText>
                    <OutlineText>THE INPUT</OutlineText>
                </TitleSection>
                <LogoSection>
                    <Logo src={window.location.origin + '/images/logo.png'}></Logo>
                </LogoSection>
                <EnterButton href="/home">ENTER</EnterButton>
            </PageWrapper>
        </>
    );
};
