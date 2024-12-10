import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { PokeAPIResponse, SimplePokemon } from '../interfaces';

const mockPokeApiResponse: PokeAPIResponse = {
  count: 2,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=15&limit=15',
  previous: '',
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
};

const expectedPokemon: SimplePokemon[] = [
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
      expect(pokemonList).toEqual(expectedPokemon);
    });

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=15`);
    expect(req.request.method).toBe('GET');

    req.flush(mockPokeApiResponse);
  });
});
