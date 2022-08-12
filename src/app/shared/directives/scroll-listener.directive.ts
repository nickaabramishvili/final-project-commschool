import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[scrollListener]',
})
export class ScrollListenerDirective {
  @Output() scrolledToBottom = new EventEmitter<void>();

  emitted = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      !this.emitted
    ) {
      this.emitted = true;
      this.scrolledToBottom.emit();
    } else if (
      window.innerHeight + window.scrollY <
      document.body.offsetHeight
    ) {
      this.emitted = false;
    }
  }
}
