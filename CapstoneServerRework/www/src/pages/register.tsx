import React, { useState } from 'react';
import { FooterText } from '../components/footer/footer';
import { GlobalStyle } from '../components/globalstyles';
import { RegisterForm } from '../components/register/form';
import { FormLabel } from '../components/register/label';
import { Submit } from '../components/register/submit';
import { TextInput } from '../components/register/textinput';
import { FormTitle } from '../components/register/title';
import { Footer } from '../containers/footer';
import { Header } from '../containers/header';
import { Section } from '../containers/section';
import { axiosInstance } from '../axios';
import { ErrorText } from '../components/register/error';

export const RegisterPage: React.FC = () => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [description, setDescription] = useState('');
    const [unregisterable, setUnregisterable] = useState(false);

    const handleChange = (change: React.ChangeEvent<HTMLInputElement>) => {
        change.target.name == 'Name'
            ? setName(change.target.value)
            : change.target.name == 'Number'
            ? setNumber(change.target.value)
            : setDescription(change.target.value);
        console.log(`name: ${name} \n number: ${number}`);
    };
    const handleSubmit = (submit: React.SyntheticEvent) => {
        submit.preventDefault();
        const formValue = { name: name, id: number, description: description };
        axiosInstance
            .post('/devices', formValue)
            .then(() => {
                location.href = '/devices';
            })
            .catch(() => {
                setUnregisterable(true);
            });
    };

    return (
        <>
            <GlobalStyle />
            <Header />
            <main>
                <Section primary>
                    <RegisterForm onSubmit={(e) => handleSubmit(e)}>
                        <FormTitle>Register A Device</FormTitle>
                        <FormLabel>
                            Device Name
                            <TextInput name="Name" type="text" onChange={(e) => handleChange(e)}></TextInput>
                        </FormLabel>
                        <FormLabel>
                            Serial Number
                            <TextInput name="Number" type="text" onChange={(e) => handleChange(e)}></TextInput>
                        </FormLabel>
                        <FormLabel>
                            Description
                            <TextInput name="Description" type="text" onChange={(e) => handleChange(e)}></TextInput>
                        </FormLabel>
                        {unregisterable ? <ErrorText>Unknown serial number</ErrorText> : null}
                        <Submit type="submit" value="SUBMIT"></Submit>
                    </RegisterForm>
                </Section>
            </main>
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
