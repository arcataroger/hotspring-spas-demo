"use client";
import { Box, Container, Select } from "@radix-ui/themes";
import { type ComponentProps, useEffect, useMemo, useState } from "react";

type Climate = {
  id: string;
  name: string;
  averageTemperature: number;
  electricityRate: number;
};

type Spa = {
  id: string;
  slug: string;
  name: string;
  estimatedEnergyConsumption: number;
  capacity: number;
};

export type NullablePartial<T> = {
  [K in keyof T]?: T[K] | null;
};

export type EnergyCalculatorProps = {
  allClimates: Climate[];
  allSpas: Array<NullablePartial<Spa>>;
};

type CalculationResult = {
  capacity: number;
  spa: Spa;
  climate: Climate;
  kWh: number;
  cost: number;
} | null;

// ESTIMATE only based on the existing data on https://hotspring.co.nz/energy-efficient-spa-pools-energy-costs/
const estimateMonthlyCost = (
  kWh: number,
  temperature: number,
  rate: number = 0.21,
  T_ref: number = 13.53,
  alpha: number = 0.0312,
): number => {
  const multiplier = 1 + alpha * (T_ref - temperature);
  return parseFloat((kWh * rate * multiplier).toFixed(2));
};

export const EnergyCalculator = ({
  allSpas,
  allClimates,
}: EnergyCalculatorProps) => {
  const [selectedCapacity, setSelectedCapacity] = useState<string>(); // Stringified number
  const [selectedSpaId, setSelectedSpaId] = useState<string>();
  const [selectedClimateId, setSelectedClimateId] = useState<string>();

  const availableCapacities: number[] = useMemo(
    () => [
      // Enumerate all the unique capacities in the dataset, as long as they're 1 or greater
      ...new Set(
        allSpas.flatMap((spa) =>
          typeof spa.capacity === "number" && spa.capacity >= 1
            ? [spa.capacity]
            : [],
        ),
      ),
    ],
    [allSpas],
  );

  const climates: Record<string, Climate> = useMemo(() => {
    return Object.fromEntries(
      allClimates.map((climate) => [climate.id, climate]),
    );
  }, [allClimates]);

  const spas: Record<string, Spa> = useMemo(() => {
    return Object.fromEntries(
      // Instead of .filter and then .map, flatMap() iterates through the array once and conditionally returns
      allSpas.flatMap((spa) => {
        // Only include the spa if it has this optional field filled out
        if (spa.estimatedEnergyConsumption) {
          return [[spa.id, spa]];
        }
        return [];
      }),
    );
  }, [allSpas]);

  const spasForSelectedCapacity: Spa[] = useMemo(() => {
    const selectedCapAsNum = Number(selectedCapacity);
    return Object.values(spas).filter(
      (spa) => spa.capacity === selectedCapAsNum,
    );
  }, [spas, selectedCapacity]);

  useEffect(() => {
    setSelectedSpaId(undefined);
  }, [spasForSelectedCapacity]);

  const results: CalculationResult = useMemo(() => {
    if (!selectedCapacity || !selectedSpaId || !selectedClimateId) {
      return null;
    }

    const capacity = Number(selectedCapacity);
    const spa = spas[selectedSpaId];
    const kWh = spa.estimatedEnergyConsumption;
    const climate = climates[selectedClimateId];
    const cost = estimateMonthlyCost(
      kWh,
      climates[selectedClimateId].averageTemperature,
      climates[selectedClimateId].electricityRate,
    );

    return {
      capacity,
      spa,
      kWh,
      climate,
      cost,
    };
  }, [selectedCapacity, selectedSpaId, selectedClimateId, climates, spas]);

  const selectOptions: Partial<ComponentProps<typeof Select.Root>> = {};

  const boxOptions: Partial<ComponentProps<typeof Box>> = {
    p: "1",
    width: "100%",
  };

  const selectContentOptions: Partial<ComponentProps<typeof Select.Content>> = {
    position: "popper",
    side: "bottom",
    sideOffset: 0,
  };

  return (
    <Box>
      <Container size={"3"}>
        <Box {...boxOptions}>
          <Select.Root
            value={selectedCapacity}
            onValueChange={setSelectedCapacity}
            {...selectOptions}
          >
            <Select.Trigger placeholder={"Select Pool Type (# of people)"} />
            <Select.Content {...selectContentOptions}>
              <Select.Group>
                {availableCapacities.map((cap) => (
                  <Select.Item key={cap} value={cap.toString()}>
                    {cap} {cap > 1 ? "People" : "Person"}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Box>

        <Box {...boxOptions}>
          <Select.Root
            value={selectedSpaId}
            onValueChange={setSelectedSpaId}
            key={selectedCapacity}
            {...selectOptions}
            disabled={!spasForSelectedCapacity?.length}
          >
            <Select.Trigger placeholder={spasForSelectedCapacity?.length ? "Select a Spa Model" : "(Select Pool Type first)"} />
            <Select.Content {...selectContentOptions}>
              <Select.Group>
                {spasForSelectedCapacity.map(({ id, name }) => (
                  <Select.Item key={id} value={id.toString()}>
                    {name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Box>

        <Box {...boxOptions}>
          <Select.Root
            value={selectedClimateId}
            onValueChange={setSelectedClimateId}
            {...selectOptions}
          >
            <Select.Trigger placeholder={"Select Location & Climate"} />
            <Select.Content {...selectContentOptions}>
              <Select.Group>
                {Object.entries(climates).map(
                  ([id, { name, averageTemperature }]) => (
                    <Select.Item key={id} value={id.toString()}>
                      {name} ({averageTemperature}°C)
                    </Select.Item>
                  ),
                )}
              </Select.Group>
            </Select.Content>
          </Select.Root>
        </Box>

        {!!results && (
          <>
            <h2>Result</h2>
            <p>
              The average monthly cost to operate the {results.spa.name} is $
              {results.cost}.
            </p>
          </>
        )}
      </Container>
    </Box>
  );
};
