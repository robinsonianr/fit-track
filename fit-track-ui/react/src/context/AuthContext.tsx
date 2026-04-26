import {createContext, useContext, useEffect, useMemo, useState} from "react";
import jwtDecode, {JwtPayload} from "jwt-decode";
import {AuthRequest, MemberDTO, MemberRegistrationRequest} from "../api/generated/models";
import {getMemberApi} from "../api/generated/endpoints/member-api/member-api.ts";
import {getAuthApi} from "../api/generated/endpoints/auth-api/auth-api.ts";


type AuthContextType = {
    member: MemberDTO | undefined;
    login: (authRequest: AuthRequest) => Promise<void>;
    register: (req: MemberRegistrationRequest) => Promise<void>;
    logOut: () => void;
    isMemberAuthenticated: () => boolean;
};


const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: { children: any }) => {
    const {me: fetchMe} = useMemo(() => getMemberApi(), []);
    const {registerMember} = useMemo(() => getMemberApi(), []);
    const {login: performLogin} = getAuthApi();
    const [member, setMember] = useState<MemberDTO | undefined>();

    useEffect(() => {
        if (localStorage.getItem("access_token") && isMemberAuthenticated()) {
            fetchMe().then(setMember).catch(logOut);
        }
    }, [fetchMe]);


    const login = async (authRequest: AuthRequest): Promise<void> => {
        try {
            const response = await performLogin(authRequest);
            const jwtToken = response.jwtToken;
            if (jwtToken !== undefined) {
                localStorage.setItem("access_token", jwtToken);
            }

            setMember(response.member);
        } catch (error) {
            throw new Error("Failed to login, either email or password is incorrect.", {cause: error});
        }
    };

    const register = async (req: MemberRegistrationRequest): Promise<void> => {
        try {
            const response = await registerMember(req);
            const jwtToken = response.jwtToken;
            if (jwtToken !== undefined) {
                localStorage.setItem("access_token", jwtToken);
            }
            setMember(response.member);
        } catch (error) {
            throw new Error("Failed to register:" + error, {cause: error});
        }
    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        setMember(undefined);
        window.location.href = "/login";
    };

    const isMemberAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const decodeToken = jwtDecode<JwtPayload>(token);
        if (!decodeToken.exp) {
            return false;
        }
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
            login: login,
            register: register,
            logOut,
            isMemberAuthenticated,
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