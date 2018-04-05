import { Component, OnInit } from '@angular/core';
import {ElectronService} from 'ngx-electron';
import { AdService } from '../../utils/sidebar/ad.service';
import { AdItem }  from '../../utils/sidebar/ad-item';
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
    componentData:any = null;

    constructor(private _electronService: ElectronService, private adService: AdService) { }

    ngOnInit() {
        this.ads = this.adService.getAds();
        this.sidebar = this.adService.getSidebarConfig();
    }

    createHelloWorldComponent(){
        this.componentData = {
        component: HelloWorldComponent,
        inputs: {
            showNum: 9
        }
        };
    }
    
    createWorldHelloComponent(){
        this.componentData = {
        component: WorldHelloComponent,
        inputs: {
            showNum: 2
        }
        };
    }
    
    test(agreed: boolean){
        console.log("some click event");
    }

};