import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PokemonCardComponent } from './pokemon-card.component';
import { SimplePokemon } from '../interfaces';

const mockPokemon: SimplePokemon = {
  id: '1',
  name: 'pikachu',
};

describe(`PokemonCardComponent`, () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let compiled: HTMLElement;
  let component: PokemonCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon);
  });

  it('should render the pokemon name correctly', () => {
    const pokemonName = compiled.querySelector('h2');
    expect(pokemonName).toBeDefined();

    if (pokemonName) {
      expect(pokemonName.textContent).toContain(mockPokemon.name);
    }
  });

  it('should render the pokemon image correctly', () => {
    const pokemonImageUrl =
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
    const pokemonImageElement = compiled.querySelector('img');
    expect(pokemonImageElement).toBeDefined();

    if (pokemonImageElement) {
      const pokemonImageSrc = pokemonImageElement.getAttribute('src');
      expect(pokemonImageSrc).toBe(`${pokemonImageUrl + mockPokemon.id}.png`);
    }
  });

  it('should have router link and link to the correct route', () => {
    const routerLink = compiled.querySelector('[ng-reflect-router-link]');
    expect(routerLink).toBeTruthy();

    if (routerLink) {
      const routerLinkAttribute = routerLink.getAttribute('ng-reflect-router-link');
      expect(routerLinkAttribute).toBeTruthy();

      expect(routerLinkAttribute).toBe(`/pokemon,${mockPokemon.name}`);
    }
  });
});
