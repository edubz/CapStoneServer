import React from 'react';
import { Header } from '../containers/header';
import { Section } from '../containers/section';
import { GlobalStyle } from '../components/globalstyles';
import { Footer } from '../containers/footer';
import { FocusWindow } from '../components/focuswindow/focuswindow';
import { FlexContainer } from '../containers/flexparent';
import { GalleryElement } from '../components/gallery/galleryelement';

export const Gallery = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Section primary>
                <FocusWindow>
                    <FlexContainer column>
                        <GalleryElement />
                        <GalleryElement />
                    </FlexContainer>
                </FocusWindow>
            </Section>
            <Footer>Footer</Footer>
        </>
    );
};
