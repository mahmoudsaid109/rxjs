import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponet implements OnInit {
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
    const sub = interval(1000).subscribe({
      next: (val) => console.log(val),
    });
    this.destroyRef.onDestroy(()=>{
      sub.unsubscribe();
    })
  }
}
