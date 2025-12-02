import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

// Hash of the password: HS8i$&N7hr@e$hXm
// Generated with: bcrypt.hashSync('HS8i$&N7hr@e$hXm', 10)
const PASSWORD_HASH = '$2b$10$wxbj.RYaAJL5M3sGXsR0Qe0IsXNbz.CAAjnx/kPuKQSXFinB2zpGm';

const ADMIN_USERNAME = 'mark';
const SESSION_COOKIE_NAME = 'admin_session';
const SESSION_SECRET = 'hyrelog-admin-secret-key-change-in-production';

export async function verifyPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, PASSWORD_HASH);
}

export async function createSession(): Promise<string> {
    // Create a simple session token (in production, use a proper JWT or session store)
    const sessionToken = Buffer.from(
        `${Date.now()}-${SESSION_SECRET}`
    ).toString('base64');
    return sessionToken;
}

export async function verifySession(sessionToken: string | undefined): Promise<boolean> {
    if (!sessionToken) return false;
    
    try {
        // Verify the session token format
        const decoded = Buffer.from(sessionToken, 'base64').toString();
        return decoded.includes(SESSION_SECRET);
    } catch {
        return false;
    }
}

export async function isAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME);
    return verifySession(session?.value);
}

export async function getSessionCookie(): Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get(SESSION_COOKIE_NAME)?.value;
}

export { ADMIN_USERNAME, SESSION_COOKIE_NAME };

