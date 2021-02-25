import React from 'react';
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

export const Home = () => {
    return (
        <React.Fragment>
            <GlobalStyle />
            <Header />
            <main>
                <Section primary>
                    <FocusWindow />
                </Section>
                <Section primary dark>
                    <InfoTitle>
                        In &#38; Out Of Euclidean Closeness, We Disregard Distance To Take Digital Pills &#38; Dive Into
                        The Algorithm Life
                    </InfoTitle>
                    <InfoCardsContainer>
                        <InfoCard>
                            <InfoTitle>What is it?</InfoTitle>
                            <InfoBlurb>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dicta dolorum rem
                                consequatur natus. Suscipit magni fuga vel praesentium perferendis. Expedita delectus
                                quisquam quasi cupiditate excepturi doloribus quos quae rem officiis at, ipsa laboriosam
                                sit aperiam corrupti quod fuga voluptas nobis! Debitis, dolor explicabo eligendi
                                quisquam delectus ipsa repellendus rem iure fuga odio eaque sunt incidunt itaque
                                veritatis tempore dolores id qui, nostrum vero sapiente saepe molestiae vitae
                            </InfoBlurb>
                        </InfoCard>
                        <InfoCard>
                            <InfoTitle>How Does it Work?</InfoTitle>
                            <InfoBlurb>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dicta dolorum rem
                                consequatur natus. Suscipit magni fuga vel praesentium perferendis. Expedita delectus
                                quisquam quasi cupiditate excepturi doloribus quos quae rem officiis at, ipsa laboriosam
                            </InfoBlurb>
                        </InfoCard>
                        <InfoCard>
                            <InfoTitle>Who We Are</InfoTitle>
                            <InfoBlurb>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dicta dolorum rem
                                consequatur natus. Suscipit magni fuga vel praesentium perferendis. Expedita delectus
                                quisquam quasi cupiditate excepturi doloribus quos quae rem officiis at, ipsa laboriosam
                                sit aperiam corrupti quod fuga voluptas nobis! Debitis, dolor explicabo eligendi
                                quisquam delectus ipsa repellendus rem iure fuga odio eaque sunt incidunt itaque
                                veritatis tempore dolores id qui, nostrum vero sapiente saepe molestiae vitae
                            </InfoBlurb>
                        </InfoCard>
                    </InfoCardsContainer>
                </Section>
            </main>
            <Footer big>
                <FooterText className="text_small">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ullam at sunt harum debitis, ea hic
                    libero laudantium id dolorem exercitationem minus nesciunt nam, quia voluptatem reiciendis sit
                    laboriosam eos. Optio qui aliquam perferendis ipsa ipsum eveniet! Nisi quos excepturi eaque cumque
                    error, et doloremque tempore pariatur expedita earum maiores quibusdam aut cum nulla veritatis
                    voluptate, amet dolorem, nesciunt dignissimos esse quae ipsum! Mollitia, quia eos? Assumenda ducimus
                    voluptatum voluptatem, vel quasi ipsum at eligendi tempora. Incidunt numquam, iste nam excepturi
                    illum, vitae magni dicta facilis at quidem quia quibusdam laboriosam repellat similique assumenda
                </FooterText>
            </Footer>
        </React.Fragment>
    );
};
