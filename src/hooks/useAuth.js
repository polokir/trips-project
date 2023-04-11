import { useSelector } from "react-redux";

export function useAuth(){
    const {email,token,id,role,name} = useSelector(state=>state.user);
    return {
        isAuth:Boolean(email),
        token,
        role,
        id,
        name,
    }
}