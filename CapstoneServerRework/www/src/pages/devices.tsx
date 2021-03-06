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
import io from 'socket.io-client';

export const DevicesPage = () => {
    const [names, setNames] = useState([]);
    const [value, setValue] = useState([]);
    const [address, setAddress] = useState([]);

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
        const socket = io('ws://159.203.191.234');
        socket.on('connect', () => console.log('connected to wss'));
        socket.on('error', (e: any) => console.log(e));
        socket.on('osc message', (message: any) => {
            const val = message.map((arg: any) => {
                return arg.args[0].value;
            });
            setValue(val);

            const addressArray = message.map((arg: any) => {
                return arg.address;
            });
            setAddress(addressArray);
        });
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
                                    <DeviceValue>
                                        {value.map((val, index) => {
                                            if ('/' + name == address[index]) return val;
                                        })}
                                    </DeviceValue>
                                </DeviceCard>
                            );
                        })}
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
