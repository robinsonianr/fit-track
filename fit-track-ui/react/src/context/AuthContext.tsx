import {createContext, useContext, useEffect, useMemo, useState} from "react";
import {AuthRequest, MemberDTO, MemberRegistrationRequest} from "../api/generated/models";
import {getMemberApi} from "../api/generated/endpoints/member-api/member-api.ts";
import {getAuthApi} from "../api/generated/endpoints/auth-api/auth-api.ts";


type AuthContextType = {
    member: MemberDTO | undefined;
    loading: boolean;
    login: (authRequest: AuthRequest) => Promise<void>;
    register: (req: MemberRegistrationRequest) => Promise<void>;
    logOut: () => void;
    refreshMember: () => Promise<void>;
};


export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: { children: any }) => {
    const {me: fetchMe, registerMember} = useMemo(() => getMemberApi(), []);
    const {login: performLogin} = getAuthApi();
    const [member, setMember] = useState<MemberDTO | undefined>();
    const [loading, setLoading] = useState(true);

    const refreshMember = async (): Promise<void> => {
        const freshMember = await fetchMe();
        setMember(freshMember);
    };

    useEffect(() => {
        if (!localStorage.getItem("access_token") && !localStorage.getItem("refresh_token")) {
            setLoading(false);
            return;
        }

        fetchMe()
            .then(setMember)
            .catch(() => {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                setMember(undefined);
            })
            .finally(() => setLoading(false));
    }, [fetchMe]);


    const login = async (authRequest: AuthRequest): Promise<void> => {
        try {
            const response = await performLogin(authRequest);
            const accessToken = response.accessToken;
            const refreshToken = response.refreshToken;
            if (accessToken !== undefined && refreshToken !== undefined) {
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
            }

            setMember(response.member);
        } catch (error) {
            throw new Error("Failed to login, either email or password is incorrect.", {cause: error});
        }
    };

    const register = async (req: MemberRegistrationRequest): Promise<void> => {
        try {
            const response = await registerMember(req);
            const accessToken = response.accessToken;
            const refreshToken = response.refreshToken;
            if (accessToken !== undefined && refreshToken !== undefined) {
                localStorage.setItem("access_token", accessToken);
                localStorage.setItem("refresh_token", refreshToken);
            }
            setMember(response.member);
        } catch (error) {
            throw new Error("Failed to register:" + error, {cause: error});
        }
    };

    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setMember(undefined);
        window.location.href = "/login";
    };

    return (
        <AuthContext.Provider value={{
            member: member,
            loading,
            login: login,
            register: register,
            logOut,
            refreshMember,
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