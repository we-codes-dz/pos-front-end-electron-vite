import { FC } from "react";

const ProtectedRoutes: FC<{ allowedRoles: string, children: any }> = ({ children }) => {
    //const auth = useAppSelector((state: RootState) => state.profile.admin)



    //if(auth.adminLevel !== allowedRoles) return( <Permission/>)

    //else
    return (
        <>{children}</>
    );
}

export default ProtectedRoutes;