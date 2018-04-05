/**
 * A single tab page. It renders the passed template
 * via the @Input properties by using the ngTemplateOutlet
 * and ngOutletContext directives.
 */

import { Component, Input, TemplateRef, ViewContainerRef, ComponentFactoryResolver, ViewChild, ReflectiveInjector} from '@angular/core';

@Component({
  selector: 'my-tab',
  styles: [`
    .pane{
      padding: 1em;
    }
  `],
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
      <ng-container *ngIf="template"
        [ngTemplateOutlet]="template"
        [ngTemplateOutletContext]="{ person: dataContext }"
      >
      </ng-container>
      <div #dynamicComponentContainer></div>
    </div>
  `
})

export class TabComponent {
  @Input('tabTitle') title: string;
  @Input() active = false;
  @Input() isCloseable = true;
  @Input() template : any; //TODO: remove not needed
  @Input() dataContext : any; //TODO: remove not needed
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
  @Input() currentComponent :any = null;

  constructor(private resolver: ComponentFactoryResolver, public viewContainer: ViewContainerRef){}

  @Input() set componentData(data: {component: any, inputs: any }) {
    if (!data) {
      return;
    }

    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    
    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
    
    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(data.component);
    
    // We create the component using the factory and the injector
    let component = factory.create(injector);
    
    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);
    
    
    // We can destroy the old component is we like by calling destroy
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    this.title = data.inputs.title;
    this.currentComponent = component;
    let instance = this.currentComponent.instance;

    //Add inputs to instance
    Object.keys(data.inputs).map((inputName) => {
      instance[`${inputName}`] = data.inputs[inputName];
    });

    console.log(this);
    console.log(this.currentComponent);
  }
}