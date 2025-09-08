import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponet implements OnInit {
  clickCount = signal(0);
  interval = signal(0);
  doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);
  constructor() {
    effect(() => {
      console.log(`Clicked Button ${this.clickCount()} times.`);
    });
  }
  ngOnInit(): void {
    setInterval(() => {
      this.interval.update((prevInterval) => prevInterval + 1);
    });
    // const sub = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });
    // this.destroyRef.onDestroy(() => {
    //   sub.unsubscribe();
    // });
  }
  onClick() {
    this.clickCount.update((prevClick) => prevClick + 1);
  }
}
