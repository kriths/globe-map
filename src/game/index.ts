import Globe from "../objects/globe";
import countries from "../data/countries.json";
import {Country} from "../data/country";

interface CountryOption {
  country: Country;
  found: boolean;
}

function doesCountryMatch(country: Country, text: string): boolean {
  if (country.name.toLowerCase() === text)
    return true;

  return !!country.alternatives?.find(alt => text === alt);
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
      .find(op => !op.found && doesCountryMatch(op.country, text));

    if (match) {
      match.found = true;
      this.globe.findCountry(match.country.alpha2);
      this.input.value = "";
      this.checkProgress();
    }
  }

  private checkProgress() {
    const count = Object.values(this.countries)
      .filter(country => country.found)
      .length;

    document.getElementById("guess-count").innerText = count.toString();

    const total = Object.values(this.countries).length;
    if (count === total) {
      const checkMark = document.createElement("span");
      checkMark.innerText = "✅";
      document.getElementById("guess-counter").appendChild(checkMark);
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

    document.getElementById("guess-count").innerText = "0";
    document.getElementById("guess-total").innerText = countries.length.toString();

    return options;
  }
}


