import { Component, Input, AfterViewInit, ViewChild, ReflectiveInjector, ComponentFactoryResolver, Injector, ViewContainerRef, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem }      from './ad-item';
import { AdComponent } from './ad.component';
import { MainComponent } from '../../views/main/main.component';
import { TabsComponent } from '../tabs/tabs.component';
// import { HelloWorldComponent } from '../../views/main/sidebar-views/comps/hello-world.component';

@Component({
  selector: 'app-add-banner',
  template: `<div id="static-sidebar" class="static-sidebar-nav">
                <div class="background-blur"></div>
                <ul class="">
                  <li *ngFor="let elem of sidebar; let i = index" (click)="handleElement(i)"  class="isActive(i) ? active : ''"> 
                    <a class="menu-toggle">
                      <i class="{{ elem.data.icon }}"></i>
                      <span class="static-sidebar-nav-text">{{ elem.data.name }}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="sidebar-wrapper">
              <ng-template #myTemplate ad-host *ngIf="ads" (onVoted)="onVoted($event)"></ng-template>
              <ng-container *ngTemplateOutlet="myTemplate"></ng-container>
              </div>
            `
})
export class AdBannerComponent implements AfterViewInit, OnDestroy {
  @Input() ads: AdItem[];
  @Input() sidebar: any[];
  currentAddIndex: number = -1;
  @ViewChild(AdDirective) adHost: AdDirective;
  subscription: any;
  interval: any;
  private tabsComponent: MainComponent;

  constructor(private _cdr: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver, public viewContainer: ViewContainerRef, public hostComponent: Injector) { 
    console.log("BITCH PLEASE");
    console.log(hostComponent.get(MainComponent, 0));
    this.tabsComponent = hostComponent.get(MainComponent, 0);
  }

  ngAfterViewInit() {
    this.handleElement(0);
    this._cdr.detectChanges();
  }

  public onVoted(comp: any, agreed: boolean, inputs: any) {
    console.log('comp: ' ,comp, ' value: ', agreed);
     this.tabsComponent.tabsComponent.handleElement({
          component: comp,
          inputs: inputs
      }, "", "");
  }

  handleElement(index: number) {
    if (index === this.currentAddIndex){
      return;
    }

    this.currentAddIndex = index;
    let adItem = this.sidebar[this.currentAddIndex];
    this.adHost.viewContainerRef.clear();
    let inputProviders = Object.keys(adItem.data).map((inputName) => {return {provide: inputName, useValue: adItem.data[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    
    let factory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.adHost.viewContainerRef.parentInjector);
    let component = factory.create(injector);
    this.adHost.viewContainerRef.insert(component.hostView);
    console.log(factory.outputs);
    console.log(factory.inputs);
    console.log(component.instance);
    (<AdComponent>component.instance).data = adItem.data;
  }

  isActive(index: number){
    return index === this.currentAddIndex;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAddIndex = (this.currentAddIndex + 1) % this.ads.length;
    let adItem = this.ads[this.currentAddIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);

    let viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<AdComponent>componentRef.instance).data = adItem.data;
  }

  getAds() {
      this.interval = setInterval(() => {
        this.loadComponent();
      }, 3000);
  }
}
