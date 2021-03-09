import React, { useState } from 'react';
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
import { axiosInstance } from '../axios';

export const Gallery = () => {
    const [date, setDate] = useState('');
    const [id, setID] = useState();
    // const [user, setUser] = useState();
    // const [tags, setTags] = useState();

    async function getGalleryFiles() {
        const res = await axiosInstance.get('/gallery/data');
        setID(res.data[0]._id);
        console.log(res.data);
        const dateString = new Date(res.data[0].uploadDate);
        setDate(dateString.getMonth() + '/' + dateString.getDay() + '/' + dateString.getFullYear());
        // setUser(res.data[0].filename);
        // setTags(res.data[0].tags);
        // console.log(res);
    }
    getGalleryFiles();

    async function downloadFile() {
        const res = await axiosInstance.get(`/gallery/files?${id}`);
        console.log(res);
    }

    return (
        <>
            <GlobalStyle />
            <Header />
            <Section primary>
                <PageTitle>GALLERY</PageTitle>
                <FocusWindow>
                    <FlexContainer column>
                        <GalleryElement>
                            <GalleryDate>{date}</GalleryDate>
                            <GalleryName>Submitted by: replace</GalleryName>
                            <GalleryTag>replace</GalleryTag>
                            <GalleryButton onClick={downloadFile}>OPEN</GalleryButton>
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
