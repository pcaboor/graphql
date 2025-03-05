import { TimeLine } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getTimelineData(userId: number): Promise<TimeLine | null> {
    const timelineData = `
    query {
        group(
        where: {captainLogin: {_eq: "${userId}"}},
        order_by: {updatedAt: desc}, limit: 1
        ) {
            updatedAt
            captainLogin
            captainId
            event {
            object {
                attrs(path: "timeline")
            }
            }
        }
    }`;

    try {
        const timeLine = await fetchData(timelineData);
        console.log("THE TIMELINE", timeLine)
        return timeLine || null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export { getTimelineData }