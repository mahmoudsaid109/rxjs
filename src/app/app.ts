import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponet implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval$ = interval(1000);
  intervalSignal = toSignal(this.interval$, { initialValue: 0 });
  customInterval$ = new Observable((subscriber) => {
    let timeExcutes = 0;
    const interval = setInterval(() => {
      if (timeExcutes > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;
      }
      console.log('Emitting New Value...');
      subscriber.next({ message: 'New Value' });
      timeExcutes++;
    }, 2000);
  });
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);
  private destroyRef = inject(DestroyRef);
  constructor() {
    // effect(() => {
    //   console.log(`Clicked Button ${this.clickCount()} times.`);
    // });
  }
  ngOnInit(): void {
    // setInterval(() => {
    //   this.interval.update((prevInterval) => prevInterval + 1);
    // });
    // const sub = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });
    // this.destroyRef.onDestroy(() => {
    //   sub.unsubscribe();
    // });
    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('Completed'),
    });
    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked Button ${this.clickCount()} times.`),
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
  onClick() {
    this.clickCount.update((prevClick) => prevClick + 1);
  }
}
