import { Component, Input, AfterViewInit, ViewChild, ReflectiveInjector, ComponentFactoryResolver, OnDestroy, ChangeDetectorRef } from '@angular/core';

import { AdDirective } from './ad.directive';
import { AdItem }      from './ad-item';
import { AdComponent } from './ad.component';

@Component({
  selector: 'app-add-banner',
  template: `<div id="static-sidebar" class="static-sidebar-nav">
                <div class="background-blur"></div>
                <ul class="">
                  <li *ngFor="let elem of sidebar; let i = index" (click)="handleElement(i)"> 
                    <a class="menu-toggle">
                      <i class="{{ elem.data.icon }}"></i>
                      <span class="static-sidebar-nav-text">{{ elem.data.name }}</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div class="sidebar-wrapper">
              <ng-template #myTemplate ad-host *ngIf="ads" (onVoted)="onVoted($event)">
              </ng-template>
              <ng-container *ngTemplateOutlet="myTemplate"></ng-container>
              <app-voter *ngFor="let voter of voters"
                [name]="voter"
                (onVoted)="onVoted($event)">
              </app-voter>
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
  agreed = 0;
  disagreed = 0;
  voters = ['Mr. IQ', 'Ms. Universe', 'Bombasto'];
  // <ng-template ad-host [ngIf]="ads" (onVoted)="onVoted($event)" 
              // (everySecond)="everySecond()" (everyFiveSeconds)="everyFiveSeconds()"></ng-template>

  constructor(private _cdr: ChangeDetectorRef, private componentFactoryResolver: ComponentFactoryResolver) { }

  ngAfterViewInit() {
    // this.loadComponent();
    this.handleElement(0);
    this._cdr.detectChanges();
  }

  public onVoted(comp: any, agreed: boolean) {
    agreed ? this.agreed++ : this.disagreed++;
    console.log('comp: ' ,comp, ' value: ', agreed);
  }

  handleElement(index: number) {
    // Return if index is same as current index
    if (index === this.currentAddIndex){
      return;
    }

    this.currentAddIndex = index;
    let adItem = this.sidebar[this.currentAddIndex];

    // let componentFactory = this.componentFactoryResolver.resolveComponentFactory(adItem.component);
    // let viewContainerRef = this.adHost.viewContainerRef;
    this.adHost.viewContainerRef.clear();

    // let componentRef = viewContainerRef.createComponent(componentFactory);
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
