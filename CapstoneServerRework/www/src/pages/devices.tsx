import React from 'react';
import { Header } from '../containers/header';
import { Section } from '../containers/section';
import { GlobalStyle } from '../components/globalstyles';
import { Footer } from '../containers/footer';
import { FocusWindow } from '../components/focuswindow/focuswindow';
import { DeviceCard } from '../components/devices/devicecard';
import { FlexContainer } from '../containers/flexparent';
import { DeviceImage } from '../components/devices/deviceimage';
import { DeviceName } from '../components/devices/title';
import { DeviceValue } from '../components/devices/devicevalue';
import { FooterText } from '../components/footer/footer';
import { PageTitle } from '../components/pagetitle';

export const DevicesPage = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Section primary>
                <PageTitle>DEVICES</PageTitle>
                <FocusWindow>
                    <FlexContainer>
                        <DeviceCard>
                            <DeviceImage src={window.location.origin + '/images/stuffedanimal1.jpg'} />
                            <DeviceName>Jimmy</DeviceName>
                            <DeviceValue>Value: 1</DeviceValue>
                        </DeviceCard>
                        <DeviceCard>
                            <DeviceImage src={window.location.origin + '/images/stuffedanimal2.jpg'} />
                            <DeviceName>Kat</DeviceName>
                            <DeviceValue>Value: 3</DeviceValue>
                        </DeviceCard>
                        <DeviceCard>
                            <DeviceImage src={window.location.origin + '/images/stuffedanimal3.jpg'} />
                            <DeviceName>Panda</DeviceName>
                            <DeviceValue>Value: 4</DeviceValue>
                        </DeviceCard>
                        <DeviceCard>
                            <DeviceImage src={window.location.origin + '/images/stuffedanimal4.jpg'} />
                            <DeviceName>Trashlord</DeviceName>
                            <DeviceValue>Value: 1</DeviceValue>
                        </DeviceCard>
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
