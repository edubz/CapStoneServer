import React from 'react';
import { GlobalStyle } from '../components/globalstyles';
import { FocusWindow } from '../components/focuswindow/focuswindow';
import { Footer } from '../containers/footer';
import { Header } from '../containers/header';
import { Section } from '../containers/section';
import { InfoCard } from '../components/infosection/infocard';
import { InfoCardsContainer } from '../containers/infocards';

export const Home = () => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <Header />
            <main>
                <Section primary>
                    <FocusWindow />
                </Section>
                <Section primary dark>
                    <strong>
                        <h3>
                            In &#38; Out Of Euclidean Closeness, We Disregard Distance To Take Digital Pills &#38; Dive
                            Into The Algorithm Life
                        </h3>
                    </strong>
                    <InfoCardsContainer>
                        <InfoCard />
                        <InfoCard />
                        <InfoCard />
                    </InfoCardsContainer>
                </Section>
            </main>
            <Footer big />
        </React.Fragment>
    );
};
