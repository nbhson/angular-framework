import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HightLightDirective {

  @Input() highlight!: boolean;

  constructor(private el?: ElementRef) {  }

  ngAfterViewInit() {
    this.highlightFn()
  }

  highlightFn() {
    this.el.nativeElement.style.color = '#c0392b';
    this.el.nativeElement.style.fontWeight = 'bold';
  }
}
