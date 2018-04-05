/**
 * The main component that renders single TabComponent
 * instances.
 */

import { Component, ContentChildren, QueryList, AfterContentInit, ViewChild, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';

import { TabComponent } from './tab.component';
import { DynamicTabsDirective } from './dynamic-tabs.directive';

@Component({
  selector: 'my-tabs',
  template:`
    <div class="etabs-tabgroup">
   
    <div class="etabs-tabgroup">
      <div class="etabs-tabs">
          <div *ngFor="let tab of tabs"  class="etabs-tab visible"  (click)="selectTab(tab)" >
            <span class="etabs-tab-icon"></span>
            <span class="etabs-tab-title">{{tab.title}}</span>
            <span class="etabs-tab-buttons" (click)="closeTab(tab)">
              <button class="etabs-tab-button-close">✖</button>
            </span>
          </div>
        </div>
        <div class="etabs-tabs">
          <div *ngFor="let tab of dynamicTabs"  class="etabs-tab visible"  (click)="selectTab(tab)" >
            <span class="etabs-tab-icon"></span>
            <span class="etabs-tab-title">{{tab.title}}</span>
            <span class="etabs-tab-buttons" (click)="closeTab(tab)">
              <button class="etabs-tab-button-close">✖</button>
            </span>
          </div>
        </div>
    </div>
    <ng-content></ng-content>
    <ng-template dynamic-tabs #container></ng-template>
  `,
  styles: [
    `
    .tab-close {
      color: gray;
      text-align: right;
      cursor: pointer;
    }
    `
  ]
})
export class TabsComponent implements AfterContentInit {
  dynamicTabs: TabComponent[] = [];
  
  @ContentChildren(TabComponent) 
  tabs: QueryList<TabComponent>;
  
  @ViewChild(DynamicTabsDirective)
  dynamicTabPlaceholder: DynamicTabsDirective;
  
  /*
    Alternative approach of using an anchor directive
    would be to simply get hold of a template variable
    as follows
  */
  // @ViewChild('container', {read: ViewContainerRef}) dynamicTabPlaceholder;
  
  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {}
  
  // contentChildren are set
  ngAfterContentInit() {
    // get all active tabs
    let activeTabs = this.tabs.filter((tab)=>tab.active);
    
    // if there is no active tab set, activate the first
    if(activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }
  
  openTab(title: string, template: any, data: any, isCloseable = false) {
    // get a component factory for our TabComponent
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);
    
    // fetch the view container reference from our anchor directive
    let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
    
    // alternatively...
    // let viewContainerRef = this.dynamicTabPlaceholder;
    
    // create a component instance
    let componentRef = viewContainerRef.createComponent(componentFactory);

    // set the according properties on our component instance
    let instance: TabComponent = componentRef.instance as TabComponent;
    instance.title = title;
    instance.template = template;
    instance.dataContext = data;
    instance.isCloseable = isCloseable;
    
    // remember the dynamic component for rendering the
    // tab navigation headers
    this.dynamicTabs.push(componentRef.instance as TabComponent);
    
    // set it active
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }

  handleElement(componentData: any, template: any, data: any) {
    // get a component factory for our TabComponent
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(TabComponent);

    // fetch the view container reference from our anchor directive
    let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;

    // create a component instance
    let componentRef = viewContainerRef.createComponent(componentFactory);
    componentRef.changeDetectorRef.detectChanges();

    let instance: TabComponent = componentRef.instance as TabComponent;
    instance.componentData = componentData;

    // remember the dynamic component for rendering the
    // tab navigation headers
    this.dynamicTabs.push(componentRef.instance as TabComponent);
    
    // set it active
    this.selectTab(this.dynamicTabs[this.dynamicTabs.length - 1]);
  }
  
  selectTab(tab: TabComponent){
    // deactivate all tabs
    this.tabs.toArray().forEach(tab => tab.active = false);
    this.dynamicTabs.forEach(tab => tab.active = false);
    
    // activate the tab the user has clicked on.
    tab.active = true;
  }
  
  closeTab(tab: TabComponent) {
    console.log("closing tab:", tab);
    for(let i=0; i<this.dynamicTabs.length;i++) {
      if(this.dynamicTabs[i] === tab) {
        // remove the tab from our array
        this.dynamicTabs.splice(i,1);
        
        // destroy our dynamically created component again
        let viewContainerRef = this.dynamicTabPlaceholder.viewContainer;
        // let viewContainerRef = this.dynamicTabPlaceholder;
        viewContainerRef.remove(i);
        
        // set tab index to 1st one
        this.selectTab(this.tabs.first);
        break;
      }
    }
  }
  
  closeActiveTab() {
    let activeTabs = this.dynamicTabs.filter((tab)=>tab.active);
    if(activeTabs.length > 0)  {
      // close the 1st active tab (should only be one at a time)
      this.closeTab(activeTabs[0]);
    }
  }

}
