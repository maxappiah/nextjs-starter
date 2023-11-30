import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';
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

export default function Home() {
  return (
    <Container>
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to my static site!</h1>
      <p className={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam odio magna, aliquam quis velit id, ornare tempus elit. Suspendisse imperdiet tincidunt egestas. Aliquam blandit diam in velit suscipit ultricies. Nunc posuere metus quis suscipit ornare. Nam nec venenatis erat, et iaculis tellus. In non magna nisi. Cras ut ex vestibulum, dignissim neque mattis, aliquet nisl. Phasellus fermentum faucibus lectus vel cursus. Sed id odio vel turpis sollicitudin luctus. Sed rhoncus orci mattis fermentum iaculis. Pellentesque quis nunc sed libero gravida facilisis nec eu felis. In accumsan vel mi vitae porta. Maecenas auctor ultricies felis, porttitor accumsan leo dignissim a. Nulla pretium sapien eu tellus ornare, nec dapibus eros iaculis. Proin risus mi, faucibus at felis vitae, eleifend hendrerit sapien.</p>

      <p className={styles.description}>Phasellus in nunc eget mauris varius condimentum et et magna. Donec vitae arcu sit amet purus imperdiet condimentum. Proin vel orci lorem. Praesent lacus magna, elementum sit amet tellus imperdiet, venenatis elementum erat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse vulputate aliquam nibh, id vestibulum nibh. Nullam luctus blandit neque, in pharetra mi tempor et. Quisque hendrerit gravida elit in tempus. Cras malesuada eros in varius tincidunt.</p>
    </div>
    </Container>
  )
}
