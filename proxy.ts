import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { checkSession } from "@/lib/api/serverApi";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api")) {
    return NextResponse.next();
    }

    const isAuthRoute =
        pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    const isPrivateRoute =
    pathname.startsWith("/profile") || pathname.startsWith("/notes");

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken");
    const refreshToken = cookieStore.get("refreshToken");

    let isAuthenticated = Boolean(accessToken);

    if (!accessToken && refreshToken) {
    try {
        const sessionResponse = await checkSession();
        
        if (sessionResponse.status === 200 && sessionResponse.data) {

        const newAccessToken = sessionResponse.headers["set-cookie"]?.find(
            (cookie) => cookie.startsWith("accessToken=")
        );
        const newRefreshToken = sessionResponse.headers["set-cookie"]?.find(
            (cookie) => cookie.startsWith("refreshToken=")
        );

        if (newAccessToken || newRefreshToken) {
            const response = NextResponse.next();
            
            if (newAccessToken) {
                response.headers.append("Set-Cookie", newAccessToken);
            }
            if (newRefreshToken) {
            response.headers.append("Set-Cookie", newRefreshToken);
            }
            
            isAuthenticated = true;
            return response;
        }
        }
    } catch (error) {
        isAuthenticated = false;
    }
    }


    if (!isAuthenticated && isPrivateRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
    }


    if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};