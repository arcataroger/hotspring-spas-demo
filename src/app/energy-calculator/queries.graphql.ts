import {gql} from "@/lib/graphql/gqltada";

export const energyCalcQuery = gql(`
    query EnergyCalcQuery {
        allClimates(orderBy: name_ASC) {
            id
            name
            averageTemperature
            electricityRate
        }
        allSpas(orderBy: capacity_ASC) {
            id
            slug
            name
            estimatedEnergyConsumption
            capacity
        }
    }`);