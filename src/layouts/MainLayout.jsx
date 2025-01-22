import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const NormalLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Navbar />
      <main className="flex-1 p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default NormalLayout;
