import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

// ✅ Let Next.js handle GET and POST — no need to manually call handler(req)
export { handler as GET, handler as POST };
