'use client'
import { Button, DropdownMenu } from "@radix-ui/themes";
import { useMemo, useState } from "react";

export type EnergyCalculatorProps = {
  allClimates: {
    id: string;
    name: string;
    averageTemperature: number;
    electricityRate: number;
  }[];

  allSpas: {
    id: string;
    slug: string;
    name: string | null;
    estimatedEnergyConsumption: number | null;
    capacity: number | null;
  }[];
};

export const EnergyCalculator = ({
  allSpas,
  allClimates,
}: EnergyCalculatorProps) => {
  const availableCapacities = useMemo(
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

  const [selectedCapacity, setSelectedCapacity] = useState<number>();

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="solid">
            Select a pool type (by # of people)
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {availableCapacities.map((cap) => (
            <DropdownMenu.Item key={cap} onSelect={() => setSelectedCapacity(cap)}>
              {cap} {cap > 1 ? "People" : "Person"}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="solid">
            Spas
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {allSpas.map(({id, name}) => (
              <DropdownMenu.Item key={id}>
                {name}
              </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="solid">
            Climates
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {allClimates.map(({id, name, averageTemperature}) => (
              <DropdownMenu.Item key={id}>
                {name} ({averageTemperature}°C)
              </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};
