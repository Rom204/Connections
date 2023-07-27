import { Navigate, Outlet } from "react-router-dom";

// TODO: create a model and import it do different parts of the app instead of writing down every time


const Private_router = ():JSX.Element => {
    console.log("private router level 5")
    const token = localStorage.getItem("JWT");
    
    return(
        token ? <Outlet/> : <Navigate to="/login" />
    );
}

export default Private_router