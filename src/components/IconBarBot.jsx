import { Outlet, Link, BrowserRouter } from "react-router-dom";


function IconBarBot (props) {
    return (
        <div className="iconBar" id="iconBarBot">
            <nav>
                <Link to="/"><span class="material-symbols-outlined">home</span></Link>
                <Link to="/searchpage"><span class="material-symbols-outlined">search</span></Link>
                <Link to="/pulls"><span class="material-symbols-outlined">inventory_2</span></Link>
                <Link to="/customerspage"><span class="material-symbols-outlined">groups</span></Link>
                <Link to="/notifications"><span class="material-symbols-outlined">notifications</span></Link>
            </nav>
        </div>
    )
};

export default IconBarBot;