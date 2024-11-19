import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { PokemonListComponent } from '../../pokemon/pokemon-list/pokemon-list.component';
import { PokemonListSkeletonComponent } from './ui/pokemon-list-skeleton/pokemon-list-skeleton.component';

@Component({
  selector: 'pokemon-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonListSkeletonComponent],
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonPageComponent implements OnInit {
  public isLoading = signal(true);

  // private appRef = inject(ApplicationRef);
  // private $appState = this.appRef.isStable.subscribe((isStable) => {
  //   console.log('isStable', isStable);
  // });

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
    }, 1500);
  }

  // ngOnDestroy(): void {
  //   console.log('ngOnDestroy');
  //   this.$appState.unsubscribe();
  // }
}
