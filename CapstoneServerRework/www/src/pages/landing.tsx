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
// import { axiosInstance } from '../axios';
import MediaStreamRecorder from 'msr';
import axios from 'axios';
// import concat from 'concat-stream';

export const LandingPage = () => {
    const [show, setShow] = useState(false);
    const [audioRecorder, setAudioRecorder] = useState(new MediaStreamRecorder(new MediaStream()));
    const mediaConstraints = {
        audio: true,
        video: false,
    };
    const [mediaSuccessful, setMediaSuccessful] = useState(false);
    const [mediaReady, setMediaReady] = useState(false);
    const [mediaStateText, setMediaStateText] = useState('loading...');
    const [form, setForm] = useState(new FormData());
    useEffect(() => {
        async function getStream() {
            const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
            onMediaSuccess(stream);
        }
        getStream();
        setMediaReady(true);
        setMediaStateText('Ready To Record');
    }, [mediaSuccessful]);

    function onMediaSuccess(stream: any) {
        setMediaSuccessful(true);
        const mediaRecorder = new MediaStreamRecorder(stream);
        setAudioRecorder(mediaRecorder);
        mediaRecorder.mimeType = 'audio/wav';
        mediaRecorder.ondataavailable = (blob: Blob) => {
            // const blobURL = URL.createObjectURL(blob);
            // console.log(blobURL);
            const file = new File([blob], 'msr-' + new Date().toISOString().replace(/:|\./g, '-') + '.wav', {
                type: 'audio/wav',
            });
            // console.log(file);
            const formData = new FormData();
            formData.append('user_file', file, file.name);
            setForm(formData);
            console.log(form);
            // formData.pipe(
            //     concat((data) => {
            //         submitFile(data);
            //     }),
            // );
            // formData.append('fieldname', 'user_file');
            // formData.append('originalname', file.name);
            // formData.append('buffer', Buffer.from(file));
            // for (const p of formData.entries()) {
            // console.log(p);
            // }
        };
    }

    function startRecording() {
        audioRecorder.start(3000);
        setMediaStateText('Recording');
        setTimeout(() => stopRecording(), 3000);
    }

    function stopRecording() {
        // audioRecorder.save();
        // console.log(audioRecorder);
        setMediaStateText('Recording ready to submit');
        submitFile(form);
    }

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

    async function submitFile(formdata: any) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            boundary: formdata.boundary,
        };

        await axios
            .post('http://api.theinput.tk/uploads', formdata, config)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
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
                        <p style={{ textAlign: 'center' }}>{mediaStateText}</p>
                        <FlexContainer style={{ justifyContent: 'space-evenly' }}>
                            {!mediaReady ? '' : <Controls />}
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
