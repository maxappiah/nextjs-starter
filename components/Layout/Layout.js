// import custom components
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import styles from "./Layout.module.scss"
export default function Layout({ children }) {
 
  return (
    <div>
      <Header />
        {children}
      <Footer />
    </div>
  );
}