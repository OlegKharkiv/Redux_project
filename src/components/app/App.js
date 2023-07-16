import {lazy, Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './app.scss';
import Header from "../pages/header";
import SigninPage from "../pages/signinPage";
import Spinner from "../spinner/Spinner";

const MainPage = lazy(() => import('../pages/mainPage'));


const App = () => {
    
    return (
        <Router>
            <main className="app">
                <Header/>
                    <Suspense fallback={<Spinner/>}> 
                        <Routes>
                            <Route path="/signin" element={<SigninPage />}/>
                            <Route path="/" element={<MainPage />}/>
                        </Routes>
                    </Suspense>
            </main>
        </Router>
        
    )
}

export default App;