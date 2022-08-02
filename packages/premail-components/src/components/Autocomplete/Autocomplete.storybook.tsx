import React from "react";
import { Autocomplete } from "./Autocomplete";
import { Typography } from "../Typography";
import { IAutoCompleteOption } from "./Autocomplete.types";
import { Input } from "../Input";
export default {
  title: "Autocomplete",
  component: Autocomplete,
};

const options: { label: string; value: number; id?: string }[] = [
  { label: "Acura", value: 1 },
  { label: "Alfa Romeo", value: 2 },
  { label: "AM General", value: 3 },
  { label: "Aston Martin", value: 4 },
  { label: "Audi", value: 5 },
  { label: "Bentley", value: 6 },
  { label: "BMW", value: 7 },
  { label: "Bugatti", value: 8 },
  { label: "Buick", value: 9 },
  { label: "Cadillac", value: 10 },
  { label: "Chevrolet", value: 11 },
  { label: "Chrysler", value: 12 },
  { label: "Daewoo", value: 13 },
  { label: "Dodge", value: 14 },
  { label: "Eagle", value: 15 },
  { label: "Ferrari", value: 16 },
  { label: "FIAT", value: 17 },
  { label: "Fisker", value: 18 },
  { label: "Ford", value: 19 },
  { label: "Genesis", value: 20 },
  { label: "Geo", value: 21 },
  { label: "GMC", value: 22 },
  { label: "Honda", value: 23 },
  { label: "HUMMER", value: 24 },
  { label: "Hyundai", value: 25 },
  { label: "INFINITI", value: 26 },
  { label: "Isuzu", value: 27 },
  { label: "Jaguar", value: 28 },
  { label: "Jeep", value: 29 },
  { label: "Kia", value: 30 },
  { label: "Lamborghini", value: 31 },
  { label: "Land Rover", value: 32 },
  { label: "Lexus", value: 33 },
  { label: "Lincoln", value: 34 },
  { label: "Lotus", value: 35 },
  { label: "Maserati", value: 36 },
  { label: "Maybach", value: 37 },
  { label: "Mazda", value: 38 },
  { label: "McLaren", value: 39 },
  { label: "Mercedes-Benz", value: 40 },
  { label: "Mercury", value: 41 },
  { label: "MINI", value: 42 },
  { label: "Mitsubishi", value: 43 },
  { label: "Nissan", value: 44 },
  { label: "Oldsmobile", value: 45 },
  { label: "Panoz", value: 46 },
  { label: "Plymouth", value: 47 },
  { label: "Pontiac", value: 48 },
  { label: "Polestar", value: 49 },
  { label: "Porsche", value: 50 },
  { label: "Ram", value: 51 },
  { label: "Rolls-Royce", value: 52 },
  { label: "Saab", value: 53 },
  { label: "Saturn", value: 54 },
  { label: "Scion", value: 55 },
  { label: "smart", value: 56 },
  { label: "Spyker", value: 57 },
  { label: "Subaru", value: 58 },
  { label: "Suzuki", value: 59 },
  { label: "Tesla", value: 60 },
  { label: "Toyota", value: 61 },
  { label: "Volkswagen", value: 62 },
  { label: "Volvo", value: 63 },
];
const coins = [
  {
    label: "Bitcoin",
    value: "BTC",
  },
  {
    label: "Ethereum",
    value: "ETH",
  },
  {
    label: "Binance Coin",
    value: "BNB",
  },
];

export const AutocompleteStory = () => {
  const [selectedOption, setSelected] =
    React.useState<IAutoCompleteOption<number> | null>(null);

  return (
    <div style={{ padding: 10 }}>
      <Typography variant={"h3"}>Autocomplete</Typography>
      <Autocomplete
        noMatchLabel={"No match"}
        id={"autocomplete-story"}
        options={options}
        selectedOption={selectedOption}
        onSelection={setSelected}
        error={selectedOption == null}
        aria-label={"Cryptocurrencies combobox"}
        helperText={selectedOption == null ? "Select a car" : ""}
      />

      <div aria-hidden={true}>
        <Typography variant={"h5"}>
          Selected option Label: {selectedOption?.label}
        </Typography>
        <br />
        <Typography variant={"h5"}>
          Selected option value: {selectedOption?.value}
        </Typography>
      </div>
    </div>
  );
};

export const DisabledAutocomplete = () => {
  const [selectedOption, setSelected] =
    React.useState<IAutoCompleteOption<number> | null>(null);
  return (
    <div style={{ padding: 10 }}>
      <Typography variant={"h3"}>Autocomplete</Typography>
      <Autocomplete
        noMatchLabel={"No match"}
        id={"autocomplete-story-2"}
        options={options}
        error
        helperText={"Text"}
        disabled
        selectedOption={selectedOption}
        onSelection={setSelected}
        aria-label={"Cryptocurrencies combobox"}
      />

      <div aria-hidden={true}>
        <Typography variant={"h5"}>
          Selected option Label: {selectedOption?.label}
        </Typography>
        <br />
        <Typography variant={"h5"}>
          Selected option value: {selectedOption?.value}
        </Typography>
      </div>
    </div>
  );
};

export const CoinsAutocomplete = () => {
  const [selectedOption, setSelected] =
    React.useState<IAutoCompleteOption<string> | null>(coins[0]);
  return (
    <div style={{ padding: 10 }}>
      <Typography variant={"h3"}>Autocomplete</Typography>
      <Autocomplete
        noMatchLabel={"No match"}
        id={"autocomplete-story-2"}
        options={coins}
        selectedOption={selectedOption}
        onSelection={setSelected}
        aria-label={"Cryptocurrencies combobox"}
      />

      <div aria-hidden={true}>
        <Typography variant={"h5"}>
          Selected option Label: {selectedOption?.label}
        </Typography>
        <br />
        <Typography variant={"h5"}>
          Selected option value: {selectedOption?.value}
        </Typography>
      </div>
    </div>
  );
};
const makeModelMap: {
  [key: string]: { label: string; value: number; id?: string }[];
} = {
  Acura: [
    { label: "CL", value: 0 },
    { label: "ILX", value: 1 },
    { label: "ILX Hybrid", value: 2 },
    { label: "Integra", value: 3 },
    { label: "Legend", value: 4 },
    { label: "MDX", value: 5 },
    { label: "NSX", value: 6 },
    { label: "RDX", value: 7 },
    { label: "RL", value: 8 },
    { label: "RLX", value: 9 },
  ],

  "Alfa Romeo": [
    { label: "4C", value: 21 },
    { label: "Giulia", value: 22 },
    { label: "Stelvio", value: 223 },
  ],
};

export const multiple = () => {
  return (
    <>
      <AutocompleteStory />
      <br />
      <DisabledAutocomplete />
    </>
  );
};

export const RealWorld = () => {
  const [selectedOption, setSelected] =
    React.useState<IAutoCompleteOption<number> | null>(null);
  const [selectedModel, setSelectedModel] =
    React.useState<IAutoCompleteOption<number> | null>(null);

  const [buttonDisabled, setButtonDisabled] = React.useState(true);

  const setSelectedOnNextTask = React.useCallback(
    (option: IAutoCompleteOption<number> | null) => {
      requestAnimationFrame(() => {
        setSelected(option);
        setButtonDisabled(option == null);
      });
    },
    []
  );

  const setModelOnNextTask = React.useCallback(
    (option: IAutoCompleteOption<number> | null) => {
      requestAnimationFrame(() => {
        setSelectedModel(option);
      });
    },
    []
  );

  React.useEffect(() => {
    requestAnimationFrame(() => {
      setSelectedModel(null);
    });
  }, [selectedOption?.value]);

  const makes = React.useMemo(
    () =>
      options.concat({
        label: "Other",
        value: 0,
        id: Math.random() + "",
      }),
    []
  );

  const models = React.useMemo(
    () =>
      (makeModelMap[selectedOption?.label ?? ""] ?? []).concat({
        label: "Other",
        value: 0,
        id: Math.random() + "",
      }),
    [selectedOption?.label]
  );

  return (
    <div>
      <br />
      <Typography variant={"h6"}>Model</Typography>
      <div style={{ position: "relative", zIndex: 3 }}>
        <Autocomplete
          id={"car-model-input"}
          noMatchLabel={"No match"}
          options={models}
          selectedOption={selectedModel}
          onSelection={setModelOnNextTask}
          aria-label={"Cryptocurrencies combobox"}
        />
      </div>
      <Typography variant={"h3"}>Post a new car</Typography>
      <Typography variant={"h6"}>Kilometrage</Typography>
      <Input
        id={"car-kilometrage"}
        aria-label={"kilometrage input"}
        type={"number"}
      />
      <br />
      <Typography variant={"h6"}>Make</Typography>
      <div style={{ position: "relative", zIndex: 3 }}>
        <Autocomplete
          noMatchLabel={"No match"}
          id={"car-makes-input"}
          options={makes}
          selectedOption={selectedOption}
          onSelection={setSelectedOnNextTask}
          aria-label={"Car Makes combobox"}
        />
      </div>
      <br /> <Typography variant={"h6"}>Year</Typography>
      <Input
        id={"year-input"}
        aria-label={"year input"}
        type={"number"}
        disabled={buttonDisabled}
      />
    </div>
  );
};
