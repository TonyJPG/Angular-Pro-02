import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../interfaces';

const mockPokemonList: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
  { id: '3', name: 'venusaur' },
  { id: '4', name: 'charmander' },
  { id: '5', name: 'charmeleon' },
];

describe(`PokemonListComponent`, () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let compiled: HTMLElement;
  let component: PokemonListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    fixture.componentRef.setInput('pokemonList', []);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should render the pokemon list correctly', () => {
    fixture.componentRef.setInput('pokemonList', mockPokemonList);
    fixture.detectChanges();

    const pokemonCardList = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCardList.length).toBe(mockPokemonList.length);
  });

  it('should render zero pokemon cards and "No hay pokémon" when pokemonList is empty', () => {
    fixture.componentRef.setInput('pokemonList', []);
    fixture.detectChanges();

    const pokemonCardList = compiled.querySelectorAll('pokemon-card');
    expect(pokemonCardList.length).toBe(0);

    const emptyListMessage = compiled.querySelector('.empty-list');
    expect(emptyListMessage).toBeDefined();
    expect(emptyListMessage?.textContent).toContain('No hay pokémon');
  });
});
