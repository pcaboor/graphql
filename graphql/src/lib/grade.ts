import { Grade } from "@/app/types/types";
import fetchData from "../app/hooks/useData";

async function getGradeData(): Promise<Grade | null> {
    const gradeData = `
           query {
                user {
                progressesByPath {
                        succeeded
                        objectId
                    bestProgress {
                            isDone
                    object {
                                name
                                type
                            }
                        }
                    }
                }
            }
      `;
    try {
        const grade = await fetchData(gradeData);
        console.log("THE GRADE", grade)
        if (grade.user && grade.user[0] && grade.user[0].progressesByPath) {
            return {
                user: {
                    progressesByPath: grade.user[0].progressesByPath
                }
            };
        }
        return null;
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        return null;
    }

}

export { getGradeData }


