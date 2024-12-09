import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { PokemonService } from './pokemon.service';
import { SimplePokemon } from '../interfaces';

const expectedPokemon: SimplePokemon[] = [
  { id: '1', name: 'pikachu' },
  { id: '2', name: 'charmander' },
];

const mockPokemon = {
  id: '1',
  name: 'pikachu',
  // otros campos de la interfaz Pokemon según sea necesario
};

describe('PokemonService', () => {
  let service: PokemonService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PokemonService);
    // httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
