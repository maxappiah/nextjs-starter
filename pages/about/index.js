
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
    font-weight: bold; // Add this line to make the title bold
`;

const Paragraph = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 10px;
`;

const About = () => {
    return (
        <Container>
            <Title>About</Title>
            <Paragraph>Welcome to our application!</Paragraph>
            <Paragraph>
                We are a team of developers passionate about creating amazing web
                applications using Next.js.
            </Paragraph>
            <Paragraph>
                This is the about page of our application. Here, you can learn more
                about our team, our mission, and the technologies we use.
            </Paragraph>
        </Container>
    );
};

export default About;
