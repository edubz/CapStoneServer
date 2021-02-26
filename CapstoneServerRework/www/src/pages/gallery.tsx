import React from 'react';
import { Header } from '../containers/header';
import { Section } from '../containers/section';
import { GlobalStyle } from '../components/globalstyles';
import { Footer } from '../containers/footer';
import { FocusWindow } from '../components/focuswindow/focuswindow';
import { FlexContainer } from '../containers/flexparent';
import { GalleryElement } from '../components/gallery/galleryelement';
import { GalleryDate } from '../components/gallery/date';
import { GalleryName } from '../components/gallery/name';
import { GalleryTag } from '../components/gallery/tag';
import { GalleryButton } from '../components/gallery/button';
import { FooterText } from '../components/footer/footer';
import { PageTitle } from '../components/pagetitle';

export const Gallery = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Section primary>
                <PageTitle>GALLERY</PageTitle>
                <FocusWindow>
                    <FlexContainer column>
                        <GalleryElement>
                            <GalleryDate>11/29/2020</GalleryDate>
                            <GalleryName>Submitted by: Bob</GalleryName>
                            <GalleryTag>relaxed</GalleryTag>
                            <GalleryButton>OPEN</GalleryButton>
                        </GalleryElement>
                        <GalleryElement>
                            <GalleryDate>1/6/2021</GalleryDate>
                            <GalleryName>Submitted by: Jeff</GalleryName>
                            <GalleryTag>spooky</GalleryTag>
                            <GalleryButton>OPEN</GalleryButton>
                        </GalleryElement>
                    </FlexContainer>
                </FocusWindow>
            </Section>
            <Footer>
                <FooterText className="text_small">
                    <a>Insta</a>
                    <br />
                    <a>Contact</a>
                    <br />
                    <a>Donate</a>
                </FooterText>
            </Footer>
        </>
    );
};
