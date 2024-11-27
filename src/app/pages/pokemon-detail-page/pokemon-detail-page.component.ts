import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';

import { PokemonService } from '../../pokemon/services/pokemon.service';
import { FullPokemon } from '../../pokemon/interfaces';
import { tap } from 'rxjs';

@Component({
  selector: 'pokemon-detail-page',
  standalone: true,
  templateUrl: './pokemon-detail-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonDetailPageComponent implements OnInit {
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private title = inject(Title);
  private meta = inject(Meta);

  public pokemon = signal<FullPokemon | null>(null);
  public id = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.pokemonService
      .loadPokemonDetail(this.id)
      .pipe(
        tap(({ name, id }) => {
          const pageTitle = `#${id} - ${name}`;
          const pageDescription = `Página del pokèmon ${name}`;
          const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

          this.title.setTitle(pageTitle);
          this.meta.updateTag({ name: 'description', content: pageDescription });
          this.meta.updateTag({ name: 'og:title', content: pageTitle });
          this.meta.updateTag({ name: 'og:description', content: pageDescription });
          this.meta.updateTag({ name: 'og:image', content: pokemonImageUrl  });
        })
      )
      .subscribe(this.pokemon.set);
  }
}
