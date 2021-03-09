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

export const RegisterPage = () => {
    const [name, setName] = useState();
    const [number, setNumber] = useState();

    const handleChange = (change: any) => {
        change.target.name == 'Name' ? setName(change.target.value) : setNumber(change.target.value);
        console.log(`name: ${name} \n number: ${number}`);
    };
    const handleSubmit = (submit: any) => {
        submit.preventDefault();
        const formValue = { name: name, id: number };
        console.log(formValue);
        axiosInstance.post('/devices', formValue);
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
                        <Submit type="submit" value="SUBMIT"></Submit>
                    </RegisterForm>
                </Section>
            </main>
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
