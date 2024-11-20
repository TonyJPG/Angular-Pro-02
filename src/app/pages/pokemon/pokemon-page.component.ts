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
import { SimplePokemon } from '../../pokemon/interfaces';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  public isLoading = signal(true);
  public pokemonList = signal<SimplePokemon[]>([]);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('isStable', isStable);
  // });

  ngOnInit(): void {
    this.loadPokemonPage(1);

    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

  public loadPokemonPage(page: number): void {
    this.pokemonService.loadPokemonPage(page).subscribe((pokemonList) => {
      this.pokemonList.set(pokemonList);
    });
  }
}
