import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Works from "./components/Works"
import Skills from "./components/Skills"
import Contact from "./components/contact";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <Navbar />
            <Home />
            <About />
            <Works />
            <Skills />
            <Contact />
            <Footer/>
            <Toaster/>
        </>
    )
}
export default App