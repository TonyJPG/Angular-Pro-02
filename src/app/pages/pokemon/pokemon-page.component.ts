import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Title } from '@angular/platform-browser';

import { PokemonService } from '../../pokemon/services/pokemon.service';
import { PokemonListComponent } from '../../pokemon/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';
import { SimplePokemon } from '../../pokemon/interfaces';
import { PaginationActions } from './ui/pagination-actions.enum';

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
    ),
    { requireSync: true }
  );

  readonly PaginationActions = PaginationActions;

  ngOnInit(): void {
    this.loadPokemonPage(this.currentPage() || 1);
  }

  private loadPokemonPage(page: number): void {
    this.isLoading.set(true);

    this.pokemonService.loadPokemonPage(page).subscribe((pokemonList) => {
      this.pokemonList.set(pokemonList);
      this.router
        .navigate([], { queryParams: { page: page } })
        .then(() => this.title.setTitle(`PokePage: ${this.currentPage()}`));
      this.isLoading.set(false);
    });
  }

  public changePageByBtn(btnClicked: PaginationActions): void {
    let pageToLoad = this.currentPage() + btnClicked;
    pageToLoad = pageToLoad <= 0 ? 1 : pageToLoad;

    this.loadPokemonPage(pageToLoad);
  }
}
