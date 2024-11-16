import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';

@Component({
  selector: 'pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PokemonCardComponent],
})
export class PokemonListComponent {
  private _pokemonArray: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  get pokemonArray(): number[] {
    return this._pokemonArray;
  }
}
