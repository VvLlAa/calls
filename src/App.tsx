import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CallListPage from './pages/CallListPage';

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/" element={<CallListPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;