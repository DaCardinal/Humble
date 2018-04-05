import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { MatButtonModule, MatInputModule } from '@angular/material';
import {SidebarElement, SidebarService} from 'sidebarjs';
import { AppComponent } from './app.component';
import { routing, routingProviders } from './app.routing';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';
import { AdBannerComponent }    from './utils/sidebar/ad-banner.component';
import { HeroProfileComponent } from './views/main/sidebar-views/hero-profile/hero-profile.component';
import { HeroJobAdComponent }   from './views/main/sidebar-views/hero-job/hero-job-ad.component';
import { AdDirective }          from './utils/sidebar/ad.directive';
import { AdService }            from './utils/sidebar/ad.service';
import {NgxElectronModule} from 'ngx-electron';
import {AccordionModule} from "ng2-accordion";
import {TabModule} from "ng2-tab";
import { WorldHelloComponent }   from './views/main/sidebar-views/comps/world-hello.component';
import { HelloWorldComponent }   from './views/main/sidebar-views/comps/hello-world.component';
import { DynamicComponent }   from './views/main/sidebar-views/comps/dynamic-component';

import {TabsComponent} from './utils/tabs/tabs.component';
import {TabComponent} from './utils/tabs/tab.component';
import {DynamicTabsDirective} from './utils/tabs/dynamic-tabs.directive';
import {PersonEditComponent} from './views/main/sidebar-views/tab-component/items/person-edit.component';
import {PeopleListComponent} from './views/main/sidebar-views/tab-component/items/people-list.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        MainComponent,
        AdBannerComponent,
        HeroJobAdComponent,
        HeroProfileComponent,
        HelloWorldComponent,
        WorldHelloComponent,
        AdDirective,
        DynamicComponent,
        TabsComponent, 
        TabComponent, 
        DynamicTabsDirective, 
        PersonEditComponent,
        PeopleListComponent

    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        JsonpModule,
        routing,
        MatButtonModule,
        MatInputModule,
        NgxElectronModule,
        AccordionModule,
        TabModule,
        ReactiveFormsModule
    ],
    providers: [routingProviders, AdService],
    entryComponents: [
        HelloWorldComponent,
        WorldHelloComponent,
        HeroJobAdComponent, 
        HeroProfileComponent,
        PeopleListComponent,
        TabComponent ],
    bootstrap: [AppComponent]
})

export class AppModule {

    constructor(public appRef: ApplicationRef) {};

    hmrOnInit(store: any) {
        if(!store || !store.state) return;

        console.log('HMR store', store);

        if('restoreInputValues' in store) {
            store.restoreInputValues();
        };

        this.appRef.tick();

        delete store.state;
        delete store.restoreInputValues;
    };

    hmrOnDestroy(store: any) {
        let cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);

        store.disposeOldHosts = createNewHosts(cmpLocation);

        store.state = {};

        store.restoreInputValues  = createInputTransfer();

        removeNgStyles();
    };

    hmrAfterDestroy(store: any) {
        store.disposeOldHosts()
        delete store.disposeOldHosts;
    };
};
