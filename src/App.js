import { useEffect, useState } from "react";

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Dynamically load the Amazon Connect Streams API
        const script = document.createElement("script");
        script.src = "https://cdn.connect.aws/connect-streams.js";
        script.async = true;
        script.onload = () => {
            console.log("✅ Amazon Connect Streams API Loaded");
            setIsLoaded(true);

            if (window.connect && window.connect.core) {
                window.connect.core.initCCP(document.getElementById("ccp-container"), {
                    ccpUrl: "https://p3f-learn.my.connect.aws/connect/ccp-v2/", // Replace with your actual CCP URL
                    loginPopup: true,
                    softphone: { allowFramedSoftphone: true }
                });
            }
        };
        script.onerror = () => console.error("❌ Failed to load Amazon Connect Streams API");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <h1>Amazon Connect Agent Panel</h1>
            {!isLoaded && <p>🔄 Loading Amazon Connect...</p>}
            <div id="ccp-container" style={{ width: "400px", height: "600px" }}></div>
        </div>
    );
}
