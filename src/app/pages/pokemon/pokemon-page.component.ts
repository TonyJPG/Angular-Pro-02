import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemon/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { PokemonService } from '../../pokemon/services/pokemon.service';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  public isLoading = signal(true);
  private pokemonService = inject(PokemonService);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('isStable', isStable);
  // });

  ngOnInit(): void {
    this.loadPokemon(1);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

  public loadPokemon(page: number): void {
    this.pokemonService.loadPage(page).subscribe(() => {
      console.log('loadPokemon onInit');
    });
  }
}
