import Home from "../components/mainPage/Home.tsx";
import Who from "../components/mainPage/Who.tsx";
import Frames from "../components/mainPage/Frames.tsx";


export default function MainPage() {
    return (
        <div className="page">
            <main className="main">
                <Home />
                <Who />
                <Frames />
            </main>
        </div>
    )
}
