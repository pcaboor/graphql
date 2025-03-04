import { cookies } from "next/headers";

async function getCookie() {
    const cookie = (await cookies()).get('cookie-name') !== undefined;
    return cookie;
}

export default getCookie;