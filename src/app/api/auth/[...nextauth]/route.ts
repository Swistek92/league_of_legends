import NextAuth from "next-auth";
import { options } from "./options";

const hanlder = NextAuth(options);
export { hanlder as GET, hanlder as POST };
