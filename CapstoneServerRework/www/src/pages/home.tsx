import React from 'react';
import { GlobalStyle } from '../components/globalstyles';
import { FocusWindow } from '../components/focuswindow/focuswindow';
import { Footer } from '../containers/footer';
import { Header } from '../containers/header';
import { Section } from '../containers/section';
import { InfoCard } from '../components/infosection/infocard';
import { InfoCardsContainer } from '../containers/infocards';
import { InfoTitle } from '../components/infosection/infotitle';
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
                            <InfoTitle dark>What is it?</InfoTitle>
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
                            <InfoTitle dark>How Does it Work?</InfoTitle>
                            <InfoBlurb>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dicta dolorum rem
                                consequatur natus. Suscipit magni fuga vel praesentium perferendis. Expedita delectus
                                quisquam quasi cupiditate excepturi doloribus quos quae rem officiis at, ipsa laboriosam
                            </InfoBlurb>
                        </InfoCard>
                        <InfoCard>
                            <InfoTitle dark>Who We Are</InfoTitle>
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
                <FooterText>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod ullam at sunt harum debitis, ea hic
                    libero laudantium id dolorem exercitationem minus nesciunt nam, quia voluptatem reiciendis sit
                    laboriosam eos. Optio qui aliquam perferendis ipsa ipsum eveniet! Nisi quos excepturi eaque cumque
                    error, et doloremque tempore pariatur expedita earum maiores quibusdam aut cum nulla veritatis
                    voluptate, amet dolorem, nesciunt dignissimos esse quae ipsum! Mollitia, quia eos? Assumenda ducimus
                    voluptatum voluptatem, vel quasi ipsum at eligendi tempora. Incidunt numquam, iste nam excepturi
                    illum, vitae magni dicta facilis at quidem quia quibusdam laboriosam repellat similique assumenda
                    autem nemo dolorem nulla deleniti, facere aspernatur! Eum ipsam repellat ut ipsum maxime accusamus
                    vero id dignissimos ratione? Eum neque accusamus dicta quas aliquid molestiae, quam earum eius fugit
                    id soluta veniam fugiat sapiente nam possimus tempora beatae, porro quae illo, consequuntur
                    molestias. Ab nisi rerum libero eum, temporibus maxime recusandae dicta alias quos, nesciunt
                    laudantium quod molestias voluptatem, facere pariatur a. Nihil pariatur atque rem ad voluptatum aut
                    quia reiciendis nisi quae ipsum nemo natus aspernatur illo expedita dignissimos cupiditate officiis,
                    cum, iste nostrum at voluptatibus eos. Veritatis deleniti ipsa vitae possimus odit, quia quidem
                    voluptatem fugiat eaque libero hic necessitatibus at velit perferendis illo.
                </FooterText>
            </Footer>
        </React.Fragment>
    );
};
