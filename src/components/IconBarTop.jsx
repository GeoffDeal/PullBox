import { Outlet, Link, BrowserRouter } from "react-router-dom";


function IconBarTop (props) {
    return (
        <div className="iconBar" id="iconBarTop">
            <nav>
                <Link to="/account"><span class="material-symbols-outlined">account_circle</span></Link>
                <Link to="/settings"><span class="material-symbols-outlined">settings</span></Link>
            </nav>
        </div>
    )
};

export default IconBarTop;