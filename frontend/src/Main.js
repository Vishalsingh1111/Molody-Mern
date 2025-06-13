import Sidebar from "./Components/Sidebar/Sidebar";
import MainContent from "./Components/MainContent/MainContent";
import TopNav from "./Components/MainContent/TopNav";

function Main() {
    return (
        <>
            <TopNav />
            <div className="flex bg-black text-white gap-2" style={{ height: 'calc(100vh - 160px)' }}>
                <Sidebar />
                <MainContent />
            </div>
        </>
    );
};

export default Main;
