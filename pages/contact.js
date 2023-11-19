
import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    color: #333;
    margin-bottom: 10px;
`;

const Paragraph = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-size: 16px;
    color: #333;
    margin-bottom: 5px;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 10px;
`;

const TextArea = styled.textarea`
    padding: 10px;
    margin-bottom: 10px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    cursor: pointer;
`;

const ContactPage = () => {
    return (
        <Container>
            <Title>Contact Us</Title>
            <Paragraph>Feel free to reach out to us using the contact form below.</Paragraph>
            <Form>
                <Label htmlFor="name">Name:</Label>
                <Input type="text" id="name" name="name" />

                <Label htmlFor="email">Email:</Label>
                <Input type="email" id="email" name="email" />

                <Label htmlFor="message">Message:</Label>
                <TextArea id="message" name="message" rows="4" />

                <Button type="submit">Submit</Button>
            </Form>
        </Container>
    );
};

export default ContactPage;
