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
import { useEffect, useState } from 'react';
import { axiosInstance } from '../axios';
export const DevicesPage = () => {
    const [names, setNames] = useState([]);

    useEffect(() => {
        async function fetchDeviceData() {
            const res = await axiosInstance.get('/devices/data');
            const namesArray = res.data.map((device: any) => {
                return device.name;
            });
            setNames(namesArray);
            return res;
        }
        fetchDeviceData();
    }, []);

    return (
        <>
            <GlobalStyle />
            <Header />
            <Section primary>
                <PageTitle>DEVICES</PageTitle>
                <FocusWindow>
                    <FlexContainer>
                        {names.map((name) => {
                            return (
                                <DeviceCard key={name}>
                                    <DeviceImage src={window.location.origin + '/images/stuffedanimal1.jpg'} />
                                    <DeviceName key={name}>{name}</DeviceName>
                                    <DeviceValue>5</DeviceValue>
                                </DeviceCard>
                            );
                        })}
                        ;
                        {/* {names.map((device) => {
                            return (
                                <DeviceCard key={device}>
                                    <DeviceImage
                                        key={device}
                                        src={window.location.origin + '/images/stuffedanimal1.jpg'}
                                    />
                                    <DeviceName key={device}>{device}</DeviceName>
                                    <DeviceValue key={device}>5</DeviceValue>
                                </DeviceCard>
                            );
                        })} */}
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
