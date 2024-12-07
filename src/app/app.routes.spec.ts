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

    console.log('routes', routes);
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
});
