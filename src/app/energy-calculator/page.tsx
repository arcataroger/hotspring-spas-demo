import { gql } from "@/lib/graphql/gqltada";
import { datoQuery } from "@/lib/datocms/datoQuery";
import {EnergyCalculator} from "./EnergyCalculator/EnergyCalculator";

export default async function EnergyCalculatorPage() {
  const energyCalcQuery = gql(`
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

  const data = await datoQuery(energyCalcQuery);

  const { allClimates, allSpas } = data;

  return (
    <>
      <EnergyCalculator allSpas={allSpas} allClimates={allClimates} />
    </>
  );
}
