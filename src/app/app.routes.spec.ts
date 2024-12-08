import { TestBed } from '@angular/core/testing';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should navigate to "/about" page correctly', async () => {
    await router.navigate(['about']);
    expect(location.path()).toBe('/about');
  });

  it('should redirect to "/about" page if not found', async () => {
    await router.navigate(['RANDOM-PAGE']);
    expect(location.path()).toBe('/about');
  });

  it('should redirect to "/pokemon/page/1" page correctly', async () => {
    await router.navigate(['pokemon/page/1']);
    expect(location.path()).toBe('/pokemon/page/1');
  });

  it('should load the correct component (about)', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about');
    expect(aboutRoute).toBeDefined();

    const aboutComponent = (await aboutRoute?.loadComponent!()) as any;
    expect(aboutComponent.default.name).toBe('AboutPageComponent');
  });

  it('should load the correct component (contact)', async () => {
    const contactRoute = routes.find((route) => route.path === 'contact');
    expect(contactRoute).toBeDefined();

    const contactComponent = (await contactRoute?.loadComponent!()) as any;
    expect(contactComponent.default.name).toBe('ContactPageComponent');
  });

  it('should load the correct component (pricing)', async () => {
    const pricingRoute = routes.find((route) => route.path === 'pricing');
    expect(pricingRoute).toBeDefined();

    const pricingComponent = (await pricingRoute?.loadComponent!()) as any;
    expect(pricingComponent.default.name).toBe('PricingPageComponent');
  });

  it('should load the correct component (pokemon detail page)', async () => {
    const pokemonDetailRoute = routes.find((route) => route.path === 'pokemon/:id');
    expect(pokemonDetailRoute).toBeDefined();

    const pokemonDetailComponent = (await pokemonDetailRoute?.loadComponent!()) as any;
    expect(pokemonDetailComponent.default.name).toBe('PokemonDetailPageComponent');
  });

  it('should load the correct component (pokemon page)', async () => {
    const pokemonPageRoute = routes.find((route) => route.path === 'pokemon/page/:page');
    expect(pokemonPageRoute).toBeDefined();

    const pokemonPageComponent = (await pokemonPageRoute?.loadComponent!()) as any;
    expect(pokemonPageComponent.default.name).toBe('PokemonPageComponent');
  });
});
