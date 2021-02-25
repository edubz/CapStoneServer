import React from 'react';
import { FooterText } from '../components/footer/footer';
import { GlobalStyle } from '../components/globalstyles';
import { RegisterForm } from '../components/register/form';
import { Submit } from '../components/register/submit';
import { TextInput } from '../components/register/textinput';
import { FormTitle } from '../components/register/title';
import { Footer } from '../containers/footer';
import { Header } from '../containers/header';
import { Section } from '../containers/section';

export const RegisterPage = () => {
    return (
        <>
            <GlobalStyle />
            <Header />
            <main>
                <Section primary>
                    <RegisterForm>
                        <FormTitle>Register A Device</FormTitle>
                        <TextInput name="Name" type="text" value="Device Name"></TextInput>
                        <TextInput name="Number" type="text" value="Serial Number"></TextInput>
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
