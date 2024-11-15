import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  templateUrl: './pokemon-page.component.html',
  styleUrl: './pokemon-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent {}
