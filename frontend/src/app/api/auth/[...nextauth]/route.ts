import NextAuth, { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { apiClient } from '@/lib/api';
import { ApiResponse, LoginResponse } from '@/types/auth';

declare module 'next-auth' {
    interface Session {
        user: User & {
            role: string;
        };
    }
    interface User {
        role: string;
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        role: string;
    }
}

interface Credentials {
    email: string;
    password: string;
}

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: Credentials | undefined) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }

                try {
                    const response = await apiClient.login(
                        credentials.email,
                        credentials.password
                    ) as ApiResponse<LoginResponse>;

                    if (response.data?.token) {
                        // Store the token
                        localStorage.setItem('token', response.data.token);

                        // Return the user object
                        return {
                            id: response.data.user.id,
                            email: response.data.user.email,
                            name: response.data.user.fullName,
                            role: response.data.user.role,
                        };
                    }

                    return null;
                } catch (error) {
                    throw new Error('Invalid email or password');
                }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 