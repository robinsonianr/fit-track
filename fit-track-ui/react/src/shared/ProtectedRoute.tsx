import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const ProtectedRoute = ({children}: { children: any }) => {

    const {isMemberAuthenticated} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isMemberAuthenticated()) {
            navigate("/login");
        }
    }, []);

    return isMemberAuthenticated() ? children : "";
};

export default ProtectedRoute;