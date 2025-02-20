import { useEffect, useState } from "react";

export default function AmazonConnectApp() {
    const [agent, setAgent] = useState(null);
    const [callActive, setCallActive] = useState(false);
    const [contact, setContact] = useState(null);
    const [agentStates, setAgentStates] = useState([]);

    useEffect(() => {
        // Load Amazon Connect CCP
        window.connect.core.initCCP(document.getElementById("ccp-container"), {
            ccpUrl: "https://p3f-learn.my.connect.aws/connect/ccp-v2/",
            loginPopup: true,
            softphone: { allowFramedSoftphone: true }
        });

        // Get agent information
        window.connect.agent((agentInstance) => {
            setAgent(agentInstance);
            setAgentStates(agentInstance.getAgentStates()); // Get available states
            console.log("Agent Logged In:", agentInstance.getName());
        });

        // Listen for incoming calls
        window.connect.contact((contact) => {
            setContact(contact);
            setCallActive(true);
            console.log("Incoming Contact:", contact.getType());

            contact.onConnected(() => {
                console.log("Call Connected");
                setCallActive(true);
            });

            contact.onEnded(() => {
                console.log("Call Ended");
                setCallActive(false);
                setContact(null);
            });
        });
    }, []);

    // Change Agent Status
    const changeAgentState = (stateName) => {
        if (!agent) return;
        const newState = agentStates.find((state) => state.name === stateName);
        if (newState) {
            agent.setState(newState, {
                success: () => console.log(`Agent state changed to: ${stateName}`),
                failure: () => console.error("Failed to change state")
            });
        }
    };

    // Call Control Functions
    const acceptCall = () => contact && contact.accept();
    const rejectCall = () => contact && contact.reject();
    const holdCall = () => contact && contact.hold();
    const resumeCall = () => contact && contact.resume();
    const endCall = () => contact && contact.end();

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Amazon Connect CCP</h2>

            {/* Agent Status Dropdown */}
            {agent && (
                <div>
                    <h3>Agent: {agent.getName()}</h3>
                    <select onChange={(e) => changeAgentState(e.target.value)}>
                        <option>Change Status</option>
                        {agentStates.map((state) => (
                            <option key={state.name} value={state.name}>{state.name}</option>
                        ))}
                    </select>
                </div>
            )}

            {/* CCP Panel */}
            <div id="ccp-container" style={{ width: "400px", height: "500px", border: "1px solid #ccc", margin: "20px auto" }}></div>

            {/* Call Control Buttons */}
            {callActive && (
                <div>
                    <h3>Call Controls</h3>
                    <button onClick={acceptCall}>✅ Accept</button>
                    <button onClick={rejectCall}>❌ Reject</button>
                    <button onClick={holdCall}>⏸️ Hold</button>
                    <button onClick={resumeCall}>▶️ Resume</button>
                    <button onClick={endCall}>🔴 End Call</button>
                </div>
            )}
        </div>
    );
}
