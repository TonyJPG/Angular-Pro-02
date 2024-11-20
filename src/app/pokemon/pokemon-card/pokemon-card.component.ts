import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { SimplePokemon } from '../interfaces';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  templateUrl: './pokemon-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  public pokemon = input.required<SimplePokemon>();

  private _pokemonImageUrl =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  public pokemonImage = computed(
    () => `${this._pokemonImageUrl + this.pokemon().id}.png`
  );
}
