import React from 'react';
import { Header } from '../containers/header';
import { Section } from '../containers/section';
import { GlobalStyle } from '../components/globalstyles';
import { Footer } from '../containers/footer';
import { FocusWindow } from '../components/focuswindow/focuswindow';
import { DeviceCard } from '../components/devices/devicecard';
import { FlexContainer } from '../containers/flexparent';

export const DevicesPage = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <Section primary>
                <FocusWindow>
                    <FlexContainer>
                        <DeviceCard />
                        <DeviceCard />
                        <DeviceCard />
                        <DeviceCard />
                        <DeviceCard />
                        <DeviceCard />
                    </FlexContainer>
                </FocusWindow>
            </Section>
            <Footer>Footer</Footer>
        </>
    );
};
