import { Audit } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getAuditData(userId: string): Promise<Audit[] | null> {
    const autditData = `
    query {
        audit(where: {auditorLogin: {_eq: "${userId}"}}) {
            private {
            code # Code d'audit
            }
            grade
            resultId
            group {
            captainLogin
            createdAt
            object {
                name
                type
            }
            }
        }
        }
`;

    try {
        const audits = await fetchData(autditData);
        console.log("THE AUDITS", audits)
        return audits.audit || null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export { getAuditData }