export { default } from "next-auth/middleware"

export const config = { 
    matcher: [
        "/student/:path*",
        "/clubincharge/:path*",
        "/faculty/:path*",
        "/admin/:path*",
    ] 
}