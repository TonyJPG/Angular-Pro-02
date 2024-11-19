import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  public loadPage(page: number): Observable<SimplePokemon[]> {
    if (page <= 0) {
      page = 1;
    }
    page--;

    return this.http
      .get<PokeAPIResponse>(
        `https://pokeapi.co/api/v2/pokemon?offset=${page * 15}&limit=15`
      )
      .pipe(
        map((resp) => {
          const simplePokemon: SimplePokemon[] = resp.results.map(
            (pokemon) => ({
              id: pokemon.url.split('/').at(-2) ?? '',
              name: pokemon.name,
            })
          );
          return simplePokemon;
        }),
        tap(console.log)
      );
  }
}