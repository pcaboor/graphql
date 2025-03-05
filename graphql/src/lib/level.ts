import fetchData from "../app/hooks/useData";

async function getLevelPerEvent(login: string, id: number): Promise<number | null> {
    const levelData = `
    query {
    event_user(where: { userLogin: { _eq: "${login}" }, eventId: { _eq: ${id} } }) {
    level
  }
    }`;

    try {
        const level = await fetchData(levelData);
        console.log("THE LEVEL", level)
        return level.event_user[0]?.level ?? null;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
}

export { getLevelPerEvent }