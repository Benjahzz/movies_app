/*export enum SessionUser {
    id = "idUser",
}
interface IUser extends DefaultUser {
    
    sessionId?: string
}

declare module "next-auth" {
    interface User extends IUser { }
    interface Session {
        user?: User;
    }
}
declare module "next-auth/jwt" {
    interface JWT extends IUser { }

}*/

import { User } from "./types";

declare module 'next-auth'{
    interface Session{
        user: User
    }
}



