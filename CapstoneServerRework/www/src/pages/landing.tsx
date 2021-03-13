import React, { useEffect, useState } from 'react';
import { GlobalStyle } from '../components/globalstyles';
import { EnterButton } from '../components/landing/button';
import { Logo, LogoSection } from '../components/landing/logo';
import { PageWrapper } from '../components/landing/pagewrapper';
import { OutlineText } from '../components/landing/title';
import { TitleSection } from '../components/landing/titlesection';
import { RecordPromptModal } from '../components/audio/recordmodal';
import { RecordPromptContent } from '../components/audio/recordinterface';
import { ModalTitle } from '../components/audio/title';
import { ModalButton } from '../components/audio/button';
import { FlexContainer } from '../containers/flexparent';
import { useReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';
import { Redirect } from 'react-router';

export const LandingPage: React.FC = () => {
    const [show, setShow] = useState(false);
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
        video: false,
    });

    const [progessText, setProgressText] = useState('Ready To Record');

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        switch (status) {
            case 'recording':
                setProgressText('Recording');
                break;

            case 'stopped':
                setProgressText('Ready To Submit');
                break;
        }
    }, [status]);

    function Controls() {
        return (
            <>
                <ModalButton onClick={startRecording}>Start</ModalButton>
                <ModalButton onClick={stopRecording}>Stop</ModalButton>
                <ModalButton onClick={submitFile}>Submit</ModalButton>
                <ModalButton href="./home">Cancel</ModalButton>
            </>
        );
    }

    function submitFile() {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            // boundary: formdata.boundary,
        };
        setProgressText('Submitting...');
        if (mediaBlobUrl) {
            axios({
                method: 'get',
                url: mediaBlobUrl,
                responseType: 'blob',
            }).then((res) => {
                const file = new File([res.data], 'msr-' + new Date().toISOString().replace(/:|\./g, '-') + '.wav', {
                    type: 'audio/wav',
                });
                const formData = new FormData();
                formData.append('user_file', file, file.name);
                axios
                    .post('https://api.theinput.tk/uploads', formData, config)
                    .then((res) => {
                        console.log(res);
                        setProgressText('Submitted');
                        setSubmitted(true);
                    })
                    .catch((err) => console.log(err));
            });
        }
    }

    function recorderPrompt() {
        setShow(!show);
    }

    return (
        <>
            <GlobalStyle />
            <PageWrapper>
                <RecordPromptModal shown={show}>
                    <RecordPromptContent>
                        <ModalTitle>Would you like to record and submit an audio file to the input?</ModalTitle>
                        <p style={{ textAlign: 'center' }}>{progessText}</p>
                        <FlexContainer style={{ justifyContent: 'space-evenly' }}>
                            {submitted ? <Redirect to="/Home" /> : <Controls />}
                        </FlexContainer>
                    </RecordPromptContent>
                </RecordPromptModal>
                <TitleSection>
                    <OutlineText>THE INPUT</OutlineText>
                    <OutlineText>THE INPUT</OutlineText>
                    <OutlineText>THE INPUT</OutlineText>
                    <OutlineText filled>THE INPUT</OutlineText>
                    <OutlineText>THE INPUT</OutlineText>
                </TitleSection>
                <LogoSection>
                    <Logo src={window.location.origin + '/images/logo.png'}></Logo>
                </LogoSection>
                <EnterButton onClick={recorderPrompt}>ENTER</EnterButton>
            </PageWrapper>
        </>
    );
};
