import "@/styles/globals.css";

// Internal import
import { Navbar, Footer } from "@/components/components_index";
import { NFTMarketplaceProvider } from "@/Context/NFTMarketplaceContext";
import { UserAPIProvider } from "@/Context/UserAPIContext";
import { NFTAPIProvider } from "@/Context/NFTAPIContext";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <UserAPIProvider>
        <NFTAPIProvider>
          <NFTMarketplaceProvider>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
          </NFTMarketplaceProvider>
        </NFTAPIProvider>
      </UserAPIProvider>
    </div>
  );
}
