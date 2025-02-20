import { useEffect, useState } from "react";

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Check every 500ms if window.connect is available
        const interval = setInterval(() => {
            if (window.connect && window.connect.core) {
                clearInterval(interval);
                setIsLoaded(true);
                console.log("✅ Amazon Connect Streams API Loaded");

                // Initialize the CCP
                window.connect.core.initCCP(document.getElementById("ccp-container"), {
                    ccpUrl: "https://p3f-learn.my.connect.aws/connect/ccp-v2/", // Replace with your CCP URL
                    loginPopup: true,
                    softphone: { allowFramedSoftphone: true }
                });
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Amazon Connect Agent Panel</h1>
            {!isLoaded && <p>🔄 Loading Amazon Connect...</p>}
            <div id="ccp-container" style={{ width: "400px", height: "600px" }}></div>
        </div>
    );
}
