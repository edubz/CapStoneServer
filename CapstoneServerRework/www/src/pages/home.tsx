import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '../components/globalstyles';
import { FocusWindow } from '../components/focuswindow/focuswindow';
import { Footer } from '../containers/footer';
import { Header } from '../containers/header';
import { Section } from '../containers/section';
import { InfoCard } from '../components/infosection/infocard';
import { InfoCardsContainer } from '../containers/infocards';
import { InfoTitle } from '../components/infosection/title';
import { FooterText } from '../components/footer/footer';
import { InfoBlurb } from '../components/infosection/infoblurb';
import { ReactiveP5Sketch } from '../components/p5/reactivesketch';
import { InfoMainTitle } from '../components/infosection/maintitle';
import axios from 'axios';

export const Home: React.FC = () => {
    const audioSource: any = document.getElementById('audio-source');
    const [stream, setStream] = useState(new MediaStream());
    const [mediaRecorder, setMediaRecorder] = useState(new MediaRecorder(stream));
    const [blobURL, setBlobURL] = useState('');
    if (audioSource) {
        audioSource.onplay = () => {
            setStream(audioSource.captureStream());
        };
    }

    useEffect(() => {
        setMediaRecorder(new MediaRecorder(stream));
    }, [stream]);

    const chunks: any[] = [];

    function useStreamData(e: any) {
        chunks.push(e.data);
    }

    function startRecording() {
        mediaRecorder.ondataavailable = useStreamData;
        mediaRecorder.start(100);
        setTimeout(() => {
            mediaRecorder.stop();
            const blob = new Blob(chunks, { type: 'audio/wav' });
            const blobURL = URL.createObjectURL(blob);
            setBlobURL(blobURL);
            console.log('stopped');
        }, 3000);
    }

    function submitRecording() {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        if (blobURL != '') {
            axios({
                method: 'get',
                url: blobURL,
                responseType: 'blob',
            }).then((res: any) => {
                const file = new File([res.data], 'msr-' + new Date().toISOString().replace(/:|\./g, '-') + '.wav', {
                    type: 'audio/wav',
                });
                const formData = new FormData();
                formData.append('gallery_file', file, file.name);
                axios.post('https://api.theinput.tk/gallery', formData, config).then((res: any) => {
                    console.log(res);
                });
            });
        }
    }

    return (
        <>
            <GlobalStyle />
            <Header />
            <main>
                <Section primary>
                    <FocusWindow id="sketch-container" noscroll>
                        <ReactiveP5Sketch />
                    </FocusWindow>
                </Section>
                <Section primary dark>
                    <InfoMainTitle>
                        The Input is an interactive system of software and hardware that is connected to a digital sound
                        installation
                    </InfoMainTitle>
                    <InfoCardsContainer>
                        <InfoCard>
                            <InfoTitle>What is it?</InfoTitle>
                            <InfoBlurb>
                                The sound you are hearing consists of audio files that can be submitted by any visitor
                                of this website, which are put through a custom generative audio processing software.
                                Various parameters of the software are controlled from this website, as well as by a
                                collection of distributed embedded devices with touch reactive sensors.
                            </InfoBlurb>
                        </InfoCard>
                        <InfoCard>
                            <InfoTitle>How Does it Work?</InfoTitle>
                            <InfoBlurb>
                                It uses a custom Node API with Web Sockets and a cloud-based database to pass audio
                                files and control data from ESP32 WiFi-enabled microcontrollers and this React.js web
                                application to Max, a digital signal processing software. The resulting audio output is
                                streamed to this website and drives an audio-reactive visual made with p5js.
                            </InfoBlurb>
                        </InfoCard>
                        <InfoCard>
                            <InfoTitle>Who We Are</InfoTitle>
                            <InfoBlurb>
                                The Input was originally created for the 2020 Creative Coding Capstone project at
                                Portland Community College with the intention to facilitate a sense of connection,
                                touch,and shared experience during a time of unprecedented isolation.
                            </InfoBlurb>
                        </InfoCard>
                    </InfoCardsContainer>
                    <button onClick={startRecording}>Record</button>
                    <button onClick={submitRecording}>Submit</button>
                </Section>
            </main>
            <Footer>
                <FooterText className="text_small">
                    Our thanks go out to the Portland Community College Creative Coding program
                </FooterText>
            </Footer>
        </>
    );
};
