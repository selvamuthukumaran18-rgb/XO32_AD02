import { useState } from "react";

import Home from "./pages/Home";
import Sender from "./pages/Sender";
import Receiver from "./pages/Receiver";

function App() {
    const [screen, setScreen] = useState("home");

    if (screen === "sender") {
        return (
            <Sender
                onBack={() => setScreen("home")}
            />
        );
    }

    if (screen === "receiver") {
        return (
            <Receiver
                onBack={() => setScreen("home")}
            />
        );
    }

    return (
        <Home
            onSender={() => setScreen("sender")}
            onReceiver={() => setScreen("receiver")}
        />
    );
}

export default App;