import "@/styles/globals.css";

// Internal import
import { Navbar } from "@/components/components_index";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
