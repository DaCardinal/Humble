import { Component, OnInit, ViewChild } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import { AdService } from '../../utils/sidebar/ad.service';
import { AdItem }  from '../../utils/sidebar/ad-item';
import { TabModule } from "ng2-tab";
import {TabsComponent} from '../../utils/tabs/tabs.component';

import {HelloWorldComponent} from '../../views/main/sidebar-views/comps/hello-world.component';
import { WorldHelloComponent} from '../../views/main/sidebar-views/comps/world-hello.component';
import './main.component.less';

@Component({
    selector: 'main-component',
    template:  require('./main.component.html')
})
export class MainComponent {
	private pressed: boolean = false;
    ads: AdItem[];
    sidebar: any [];
    @ViewChild('personEdit') editPersonTemplate: any;
    @ViewChild('about') aboutTemplate: any;
    @ViewChild(TabsComponent) tabsComponent: TabsComponent;

    constructor(private _electronService: ElectronService, private adService: AdService) { }

    ngOnInit() {
        this.ads = this.adService.getAds();
        this.sidebar = this.adService.getSidebarConfig();
    }

    people = [{
        id: 1,
        name: 'Juri',
        surname: 'Strumpflohner',
        twitter: '@juristr'
    }];

    onEditPerson(person: any) {
        this.tabsComponent.openTab(
            `Editing ${person.name}`, 
            this.editPersonTemplate, 
            person,
            true
        );
    }

    // onAddPerson() {
    //     this.tabsComponent.openTab(
    //         'New Person',
    //         this.editPersonTemplate, 
    //         {},
    //         true
    //     );
    // }

    onAddPerson(){
        this.tabsComponent.handleElement({
            component: HelloWorldComponent,
            inputs: {
                showNum: 1,
                title: "Hello World Tab"
            }
        }, this.editPersonTemplate, this.people[0]);
    }

    onOpenAbout(){
        this.tabsComponent.handleElement({
            component: WorldHelloComponent,
            inputs: {
                showNum: 2,
                title: "World Hello Tab"
            }
        }, this.editPersonTemplate, this.people[0]);
    }
    // onOpenAbout(){
    //     this.tabsComponent.handleElement(HelloWorldComponent);
    // }

    onPersonFormSubmit(dataModel: any) {
        if(dataModel.id > 0) {
            this.people = this.people.map(person => {
            if(person.id === dataModel.id) {
                return dataModel;
            } else {
                return person;
            }
            });  
        } else {
            // create a new one
            dataModel.id = Math.round(Math.random()*100);
            this.people.push(dataModel);
        }

        // close the tab
        this.tabsComponent.closeActiveTab();
    }

    onOpenAbout2() {
        this.tabsComponent.openTab(
            'About',
            this.aboutTemplate, 
            {},
            true
        );
    }
};