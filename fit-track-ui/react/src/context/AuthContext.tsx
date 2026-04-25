import {createContext, useContext, useEffect, useState} from "react";
import {login as performLogin} from "../services/client";
import jwtDecode from "jwt-decode";
import {AuthRequest, MemberDTO} from "../api/generated/models";




type AuthContextType = {
    member: MemberDTO | undefined;
    login: (formData: any) => Promise<void>;
    logOut: () => void;
    isCustomerAuthenticated: () => boolean;
    setCustomerFromToken: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: { children: any }) => {
    const [member, setMember] = useState<MemberDTO| undefined>();

    const setCustomerFromToken = () => {
        let token: any = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            const member: MemberDTO = {
                email: token.sub,
                roles: token.scopes
            };
            setMember(member);
        }
    };
    useEffect(() => {
        if (localStorage.getItem("access_token") !== undefined) {
            setCustomerFromToken();
        }
    }, []);

    const login = async (authRequest: AuthRequest): Promise<void> => {
        try {
            const response = await performLogin(authRequest);
            const jwtToken = response.headers["authorization"];
            if (jwtToken !== undefined) {
                localStorage.setItem("access_token", jwtToken);
            }

            const memberId = response.data.memberId;
            if (memberId !== undefined) {
                localStorage.setItem("memberId", memberId);
            }

            const decodedToken: any = jwtDecode(jwtToken);

            const member: MemberDTO = {
                id: memberId,
                username: decodedToken.sub,
                roles: decodedToken.scopes
            };
            setMember(member);
        } catch (error) {
            throw new Error("Failed to login, either email or password is incorrect.", { cause: error });
        }
    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("memberId");
        setMember(undefined);
    };

    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const decodeToken: any = jwtDecode(token);
        const expiration = decodeToken.exp;
        if (Date.now() > expiration * 1000) {
            logOut();
            return false;
        }
        return true;
    };

    return (
        <AuthContext.Provider value={{
            member: member,
            login,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken

        }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;