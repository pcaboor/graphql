export interface UserInfo {
    labels: {
        labelName: string
    }[],
    attrs: {
        Phone: string;
        email: string;
        gender: string;
        country: string;
        foundus: string;
        attentes: string;
        lastName: string;
        Situation: string;
        firstName: string;
        addressCity: string;
        dateOfBirth: string;
        emergencyTel: string;
        placeOfBirth: string;
        addressStreet: string;
        addressCountry: string;
        countryOfBirth: string;
        addressPostalCode: string;
        emergencyLastName: string;
        mailcheckAccepted: boolean;
        emergencyFirstName: string;
        emergencyAffiliation: string;
        addressComplementStreet: string;
    }
    login: string
    totalUp: number
    totalDown: number
}

export interface CursusInfo {
    events: {
        event: {
            id: string,
            object: {
                name: string,
                type: string
            }
        }
    }[]
}

export interface CursusDetailsInfo {
    event: {
        id: string,
        startAt: string,
        endAt: string,
        object: {
            name: string,
            type: string,
            parent?: {
                id: string,
                object: {
                    name: string,
                    type: string
                }
            }
        }
    }
}

export interface TotalXPInfo {
    transaction_aggregate: {
        aggregate: {
            sum: {
                amount: number
            }
        }
    }
}