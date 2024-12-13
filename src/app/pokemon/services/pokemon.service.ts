import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

import { FullPokemon, PokeAPIResponse, SimplePokemon } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private http = inject(HttpClient);

  public loadPokemonPage(page: number): Observable<SimplePokemon[]> {
    page--;

    return this.http
      .get<PokeAPIResponse>(`https://pokeapi.co/api/v2/pokemon?offset=${page * 15}&limit=15`)
      .pipe(
        map((resp) => {
          const simplePokemon: SimplePokemon[] = resp.results.map((pokemon) => ({
            id: pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
          }));
          return simplePokemon;
        }),
        // switchMap((resp) => {
        //   const simplePokemon: SimplePokemon[] = resp.results.map(
        //     (pokemon) => ({
        //       id: pokemon.url.split('/').at(-2) ?? '',
        //       name: pokemon.name,
        //     })
        //   );
        //   return of(simplePokemon);
        // })
      );
  }

  public loadPokemonDetail(id: string): Observable<FullPokemon> {
    return this.http
      .get<FullPokemon>(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(`Backend returned code ${error.status}, body:`, error.error);
    }

    const errorMessage = error.error ?? 'An error occurred';
    return throwError(() => new Error(errorMessage));
  }
}
