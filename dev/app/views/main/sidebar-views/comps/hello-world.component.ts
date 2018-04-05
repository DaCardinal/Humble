import {Component, Injector, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import { AdDirective } from '../../../../utils/sidebar/ad.directive';
import {TabComponent} from '../../../../utils/tabs/tab.component';

@Component({
  selector: 'hello-world',
  template: `
    <ng-container>
      <div>Hello World showNum {{showNum}}</div>
      <div (click)="vote(true)"> Button Click </div>
    </ng-container>
  `
})
export class HelloWorldComponent {
  private showNum = 0;
  @Output() onVoted = new EventEmitter<boolean>();

  constructor(public injector: Injector, public viewContainer: ViewContainerRef){
    this.showNum = this.injector.get('showNum');
    console.log("HelloWorldComponent");
  }

  vote(agreed: boolean) {
    this.onVoted.emit(agreed);
    console.log("clicked");
  }

  ngAfterContentChecked(){

  }
}
