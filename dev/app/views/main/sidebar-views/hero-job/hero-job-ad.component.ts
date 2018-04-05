import { Component, Input, Output, EventEmitter, ViewChild, ViewContainerRef, Injector, TemplateRef, ElementRef} from '@angular/core';
import { AdDirective } from '../../../../utils/sidebar/ad.directive';
import { AdComponent } from '../../../../utils/sidebar/ad.component';
import { AdBannerComponent } from '../../../../utils/sidebar/ad-banner.component';
import { HelloWorldComponent } from '../comps/hello-world.component';
import { PeopleListComponent } from  '../tab-component/items/people-list.component';

@Component({
    selector: 'ad-host',
    template: require('./hero-job-ad.component.html'),
    inputs:['data'],
    outputs: ['onVoted']
    
})
export class HeroJobAdComponent implements AdComponent {
    @Input() data: any;
    @Output() onVoted = new EventEmitter<boolean>();
    
    constructor(public viewContainerRef: ViewContainerRef, public el: ElementRef, public hostComponent: Injector){
        console.log(hostComponent.get(AdBannerComponent, 0));
    }

    vote(agreed: boolean) {
        console.log("job clicked");
        let inputs: any = {
              showNum: 1,
              title: "Hello World Tab",
              id: 1,
              name: 'Juri',
              surname: 'Strumpflohner',
              twitter: '@juristr',
              people: [{
                id: 1,
                name: 'Juri',
                surname: 'Strumpflohner',
                twitter: '@juristr'
            }]
              
        };
        
        this.hostComponent.get(AdBannerComponent, 0).onVoted(PeopleListComponent, true, inputs);
    }
}