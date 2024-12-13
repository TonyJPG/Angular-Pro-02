import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';
import { catchError } from 'rxjs';

const mockPokeApiResponse: PokeAPIResponse = {
  count: 2,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=15&limit=15',
  previous: '',
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const expectedPokemonList: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokemon = {
  id: '3',
  name: 'charizard',
};

describe('PokemonService', () => {
  let service: PokemonService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load a page of SimplePokemon', () => {
    service.loadPokemonPage(1).subscribe((pokemonList) => {
      expect(pokemonList).toEqual(expectedPokemonList);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=15`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('shoul load page number 5 of pokemon', () => {
    service.loadPokemonPage(5).subscribe((pokemonList) => {
      expect(pokemonList).toEqual(expectedPokemonList);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=60&limit=15`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });

  it('should load a pokemon by id', () => {
    const pokemonId = '3';

    service.loadPokemonDetail(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should load a pokemon by name', () => {
    const pokemonName = 'charmander';

    service.loadPokemonDetail(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPokemon);
  });

  it('should catch error if pokemon not found', () => {
    const pokemonName = 'no-existe';

    service
      .loadPokemonDetail(pokemonName)
      .pipe(
        catchError((error) => {
          expect(error.message).toContain('Pokèmon not found');
          return [];
        }),
      )
      .subscribe();

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    expect(req.request.method).toBe('GET');

    req.flush('Pokèmon not found', {
      status: 404,
      statusText: 'Not Found',
    });
  });
});
