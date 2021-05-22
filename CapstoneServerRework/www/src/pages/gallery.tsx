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

export const Gallery: React.FC = () => {
    const [dates, setDates] = useState([]);
    const [ids, setIDs] = useState([]);

    interface GalleryFile {
        _id: string;
        length: number;
        chunkSize: number;
        uploadDate: string;
        filename: string;
        md5: string;
    }

    async function getGalleryFiles() {
        const res = await axiosInstance.get('/gallery/data');
        setDates(
            res.data.map((object: GalleryFile) => {
                const dateString = new Date(object.uploadDate);
                return dateString.getMonth() + '/' + dateString.getDay() + '/' + dateString.getFullYear();
            }),
        );
        setIDs(
            res.data.map((object: GalleryFile) => {
                return object._id;
            }),
        );
    }
    getGalleryFiles();

    return (
        <>
            <GlobalStyle />
            <Header />
            <Section primary>
                <PageTitle>GALLERY</PageTitle>
                <FocusWindow>
                    <FlexContainer column>
                        {dates.map((date, index) => {
                            return (
                                <GalleryElement key={date}>
                                    <GalleryDate>{date}</GalleryDate>
                                    <GalleryName>Submitted by: replace</GalleryName>
                                    <GalleryTag>replace</GalleryTag>
                                    <GalleryButton href={`http://api.theinput.tk/gallery/file?id=${ids[index]}`}>
                                        OPEN
                                    </GalleryButton>
                                </GalleryElement>
                            );
                        })}
                    </FlexContainer>
                </FocusWindow>
            </Section>
            <Footer>
                <FooterText className="text_small">
                    <a href="https://www.instagram.com/ioecwddtdpdal/">
                        <img
                            src={window.location.origin + '/images/instagram-logo.png'}
                            alt=""
                            width="50px"
                            height="auto"
                            style={{ opacity: 0.5 }}
                        />
                    </a>
                    <br />
                    <a href="mailto:thecapstoners2020@gmail.com">Support</a>
                    <br />
                    <a href="https://www.paypal.com/donate?hosted_button_id=5M3ECDG7GMQP8">Donate</a>
                </FooterText>
            </Footer>
        </>
    );
};
