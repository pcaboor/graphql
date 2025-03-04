import { UserInfo } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getUserData(): Promise<UserInfo | null> {
  const userData = `
       query {
        user {
            labels {
                labelName
            }
            attrs
            login
            totalUp
            totalDown
        }
    }
      `;
  try {
    const data = await fetchData(userData);
    return data.user[0] || null; // Recupérer depuis user le 0 
  } catch (error) {
    console.error("Erreur lors de la récupération des données utilisateur:", error);
    return null;
  }

}

export { getUserData }


