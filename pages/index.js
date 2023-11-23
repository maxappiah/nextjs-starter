import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';


export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to my static site!</h1>
      <p className={styles.description}>This is the home page.</p>
    </div>
  )
}
