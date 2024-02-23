import Link from 'next/link';
import styles from './Header.module.scss';

export default function Header() {
  
    return (

    <header>
      <nav> 
      <div className={styles.nav}>
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/contact">Contact</Link></li>
          <li><Link href="/quiz">Quiz</Link></li>
        </ul>
        </div>
      </nav>
    </header>
  );
}
