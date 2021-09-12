import Globe from "../objects/globe";
import countries from "../data/countries.json";
import {Country} from "../data/country";

interface CountryOption {
  country: Country;
  found: boolean;
}

export default class Game {
  private readonly input: HTMLInputElement;
  private readonly globe: Globe;
  private readonly countries: Record<string, CountryOption>;

  constructor(globe: Globe) {
    this.globe = globe;
    this.countries = Game.loadCountries();
    this.input = document.getElementById("country-ipt") as HTMLInputElement;

    this.input.addEventListener("input", this.onInputChange.bind(this));
  }

  private onInputChange(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    const text = input.value.toLowerCase();
    if (!text) return; // Ignore empty inputs
    if (/^\s+$/.test(text)) { // String is only whitespace
      this.input.value = "";
      return;
    }

    const match = Object.values(this.countries)
      .find(op => !op.found && (text === op.country.name.toLowerCase()));

    if (match) {
      match.found = true;
      this.globe.findCountry(match.country.alpha2);
      this.input.value = "";
    }
  }

  private static loadCountries(): Record<string, CountryOption> {
    const options: Record<string, CountryOption> = {};
    for (let country of (countries as Country[])) {
      options[country.alpha2] = {
        country,
        found: false,
      };
    }
    return options;
  }
}


