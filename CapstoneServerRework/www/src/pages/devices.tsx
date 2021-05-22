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
import { StyledDetails, StyledSummary } from '../components/devices/devicedetails';

export const DevicesPage: React.FC = () => {
    const [names, setNames] = useState([]);
    const [value, setValue] = useState(['']);
    const [address, setAddress] = useState(['']);
    const [description, setDescription] = useState(['']);

    interface DeviceObject {
        name: string;
        number: string;
        description: string;
    }

    interface OscArgs {
        type: string;
        value: string;
    }

    interface OscMessage {
        address: string;
        args: Array<OscArgs>;
    }

    useEffect(() => {
        async function fetchDeviceData() {
            const res = await axiosInstance.get('/devices/data');
            const namesArray = res.data.map((device: DeviceObject) => {
                return device.name;
            });
            setNames(namesArray);
            const descriptionArray = res.data.map((device: DeviceObject) => {
                return device.description;
            });
            setDescription(descriptionArray);
            return res;
        }

        fetchDeviceData();
        const socket = io('https://api.theinput.tk', { secure: true });
        socket.on('connect', () => console.log('connected to wss'));
        socket.on('error', (e: Error) => console.log(e));
        socket.on('osc message', (message: Array<OscMessage>) => {
            const val = message.map((arg: OscMessage) => {
                return arg.args[0].value;
            });
            setValue(val);

            const addressArray = message.map((arg: OscMessage) => {
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
                        {names.map((name, index) => {
                            return (
                                <DeviceCard key={name}>
                                    <DeviceImage src={window.location.origin + '/images/stuffedanimal1.jpg'} />
                                    <StyledDetails>
                                        <StyledSummary>
                                            <DeviceName key={name}>{name}</DeviceName>
                                        </StyledSummary>
                                        <DeviceValue>{description[index]}</DeviceValue>
                                        <DeviceValue>
                                            {value.map((val, index) => {
                                                if ('/' + name == address[index]) return `current value: ${val}`;
                                            })}
                                        </DeviceValue>
                                    </StyledDetails>
                                </DeviceCard>
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
