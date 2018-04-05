import {Component, Injector,Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { AdDirective } from '../../../../utils/sidebar/ad.directive';
import {TabComponent} from '../../../../utils/tabs/tab.component';

@Component({
  selector: 'world-hello',
  template: `
    <div>World Hello</div>
  `
})
export class WorldHelloComponent {

  @Output() onVoted = new EventEmitter<boolean>();

   constructor(public _componentFactoryResolver: ComponentFactoryResolver, public viewContainer: ViewContainerRef){
    console.log("WorldHelloComponent");
  }

  vote(agreed: boolean) {
    this.onVoted.emit(agreed);
    console.log("clicked");
  }

  ngAfterContentChecked(){

  }
}
