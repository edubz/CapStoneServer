import React, { useState } from 'react';
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
// import concat from 'concat-stream';

export const LandingPage = () => {
    const [show, setShow] = useState(false);
    const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
        audio: true,
        video: false,
    });

    // const [mediaSuccessful, setMediaSuccessful] = useState(false);
    // const [mediaReady, setMediaReady] = useState(false);
    // const [mediaStateText, setMediaStateText] = useState('loading...');
    // const [form, setForm] = useState(new FormData());
    // const [stream, setStream] = useState(new MediaStream());
    // const [audioRecorder, setAudioRecorder] = useState(new MediaStreamRecorder(stream));

    // useEffect(() => {
    //     console.log(mediaSuccessful);
    //     setMediaReady(true);
    //     console.log('successful');
    // }, [mediaSuccessful]);

    // async function useStream() {

    // mediaStream.ondataavailable = (blob: Blob) => {
    //     const file = new File([blob], 'msr-' + new Date().toISOString().replace(/:|\./g, '-') + '.wav', {
    //         type: 'audio/wav',
    //     });
    //     const formData = new FormData();
    //     formData.append('user_file', file, file.name);
    //     setForm(formData);
    // };
    // setAudioRecorder(mediaStream);
    // audioRecorder.start(3000);
    // }

    // audioRecorder.onstart = () => {
    //     console.log('started');
    // };

    // function onMediaSuccess(userMediaStream: any) {
    //     if (mediaSuccessful) {
    //         return;
    //     } else {
    //         setStream(userMediaStream);
    //         useStream().then(() => console.log('async completed'));
    //         setMediaSuccessful(true);
    //         setMediaStateText('Ready To Record');
    //     }
    // }

    // function startRecording() {
    //     setMediaStateText('Recording');
    //     setTimeout(() => stopRecording(), 3000);
    // }

    // function stopRecording() {
    //     setMediaStateText('Recording ready to submit');
    //     submitFile(form);
    // }

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

    function submitFile(formdata: any) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            boundary: formdata.boundary,
        };
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
                    .then((res) => console.log(res))
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
                        <p style={{ textAlign: 'center' }}>{status}</p>
                        <FlexContainer style={{ justifyContent: 'space-evenly' }}>
                            <Controls />
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
