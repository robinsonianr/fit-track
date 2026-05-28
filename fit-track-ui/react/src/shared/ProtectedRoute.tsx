import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const ProtectedRoute = ({children}: { children: any }) => {

    const {member, loading} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !member) {
            navigate("/login");
        }
    }, [loading, member]);

    if (loading) return null;

    return member ? children : null;
};

export default ProtectedRoute;