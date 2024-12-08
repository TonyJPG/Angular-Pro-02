import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { PokemonService } from '../../pokemon/services/pokemon.service';
import { PokemonListComponent } from '../../pokemon/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { SimplePokemon } from '../../pokemon/interfaces';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [RouterLink, PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);

  public isLoading = signal(true);
  public pokemonList = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.params.pipe(
      map((params) => params['page'] ?? 1),
      map((page) => (isNaN(Number(page)) ? 1 : Number(page))),
      map((page) => (page <= 0 ? 1 : page)),
    ),
    { requireSync: true },
  );

  public loadOnPageChange = effect(() => {
    this.loadPokemonPage(this.currentPage() || 1);
  });

  private loadPokemonPage(page: number): void {
    this.isLoading.set(true);

    this.pokemonService.loadPokemonPage(page).subscribe((pokemonList) => {
      this.pokemonList.set(pokemonList);
      this.title.setTitle(`PokePage: ${this.currentPage()}`);
      this.isLoading.set(false);
    });
  }
}
