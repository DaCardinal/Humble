import { Directive, ViewContainerRef, Output, EventEmitter,ElementRef, HostListener, AfterViewInit, Injector} from '@angular/core';

@Directive({
  selector: '[ad-host]',
  inputs:['data'],
  outputs: ['onVoted']
})


export class AdDirective {
  @Output() onVoted = new EventEmitter<boolean>();
  
  constructor(public viewContainerRef: ViewContainerRef, public el: ElementRef, public hostComponent: Injector) {

  }
}