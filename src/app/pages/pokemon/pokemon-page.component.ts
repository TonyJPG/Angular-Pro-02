import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { PokemonService } from '../../pokemon/services/pokemon.service';
import { PokemonListComponent } from '../../pokemon/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
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
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private title = inject(Title);

  public isLoading = signal(true);
  public pokemonList = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this.route.queryParamMap.pipe(
      map((params) => params.get('page') ?? 1),
      map((page) => (isNaN(Number(page)) ? 1 : Number(page))),
      map((page) => (page <= 0 ? 1 : page))
    )
  );

  ngOnInit(): void {
    this.loadPokemonPage(0);
  }

  public loadPokemonPage(page: number): void {
    this.isLoading.set(true);
    const pageToLoad = this.currentPage()! + page;

    //TODO: fix page in URL & title going out of bounds
    this.pokemonService
      .loadPokemonPage(pageToLoad)
      .pipe(
        tap(() => {
          this.router.navigate([], {
            queryParams: {
              page: pageToLoad,
            },
          });
          this.title.setTitle(`Pokèmon | ${pageToLoad}`);
        })
      )
      .subscribe((pokemonList) => {
        this.pokemonList.set(pokemonList);
        this.isLoading.set(false);
      });
  }
}
