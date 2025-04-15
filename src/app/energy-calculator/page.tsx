import { datoQuery } from "@/lib/datocms/datoQuery";
import {EnergyCalculator} from "@/app/energy-calculator/component/EnergyCalculator";
import {energyCalcQuery} from "@/app/energy-calculator/queries.graphql";

export default async function EnergyCalculatorPage() {

  const data = await datoQuery(energyCalcQuery);

  const { allClimates, allSpas } = data;

  return (
    <>
      <EnergyCalculator allSpas={allSpas} allClimates={allClimates} />
    </>
  );
}
