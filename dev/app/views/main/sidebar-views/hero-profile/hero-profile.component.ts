import { Component, Input, Output, EventEmitter, ViewChild, ViewContainerRef, ElementRef, Injector} from '@angular/core';
import { AdComponent } from '../../../../utils/sidebar/ad.component';
import { AccordionModule } from "ng2-accordion";
import { AdBannerComponent } from '../../../../utils/sidebar/ad-banner.component';

@Component({
    selector: 'ad-host',
    template: require('./hero-profile.component.html')
})
export class HeroProfileComponent implements AdComponent {
    @Input() data: any;
    @Output() onVoted = new EventEmitter<boolean>();

    constructor(public viewContainerRef: ViewContainerRef, public el: ElementRef, public hostComponent: Injector){
        console.log(hostComponent.get(AdBannerComponent, 0));
    }

    vote(agreed: boolean) {
        console.log("profile clicked");
        this.hostComponent.get(AdBannerComponent, 0).onVoted(this, false);
    }
}


