import { SignInData } from "./SignInData";
import { User } from "./User";

export interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInData) => Promise<boolean>;
    signOut: () => void;
  }