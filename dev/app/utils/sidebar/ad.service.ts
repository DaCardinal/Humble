import { Injectable }           from '@angular/core';
import { AdItem }               from './ad-item';
import { HeroJobAdComponent }   from '../../views/main/sidebar-views/hero-job/hero-job-ad.component';
import { HeroProfileComponent } from '../../views/main/sidebar-views/hero-profile/hero-profile.component';

@Injectable()
export class AdService {
  getAds() {
    return [
      new AdItem(HeroProfileComponent, {name: 'Bombasto', bio: 'Brave as they come'}),

      new AdItem(HeroJobAdComponent,   {headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),


      new AdItem(HeroProfileComponent, {name: 'Dr IQ', bio: 'Smart as they come'}),

      new AdItem(HeroJobAdComponent,   {headline: 'Openings in all departments',
                                        body: 'Apply today'}),
      new AdItem(HeroJobAdComponent,   {headline: 'Openings in all departments',
      body: 'Apply today'}),
    ];
  }

  getSidebarConfig(){
    return [
      new AdItem(HeroJobAdComponent, {name: 'Patient Maintenance',
          icon: 'fa fa-user-md', menu: [
            {id: 'patMain_dets', item: 'Details', list: [
              {content: 'content 1', component: HeroJobAdComponent},
              {content: 'content 2', url: 'http://www.google.com'}
            ]},
            {id: 'patMain_sum', item: 'Summary', list: [
              {content: 'content 1', url: 'http://www.google.com'},
              {content: 'content 2', url: 'http://www.google.com'}
            ]}
          ]
        }),
      new AdItem(HeroProfileComponent, {name: 'Reports',
          icon: 'fa fa-newspaper-o', menu: [
            {id: 'rep_p', item: 'Patients', list: [
              {content: 'Full Patient Listing', url: 'http://www.google.com'},
              {content: 'Consultation Summary', url: 'http://www.google.com'},
              {content: 'Medical Legal Report', url: 'http://www.google.com'},
              {content: 'Full Patient Listing with Conditions', url: 'http://www.google.com'},
              {content: 'Appointment History', url: 'http://www.google.com'}
            ]},
            {id: 'rep_presc', item: 'Prescriptions', list: [
              {content: 'Full Patient Listing', url: 'http://www.google.com'},
              {content: 'Consultation Summary', url: 'http://www.google.com'},
              {content: 'Medical Legal Report', url: 'http://www.google.com'},
              {content: 'Full Patient Listing with Conditions', url: 'http://www.google.com'},
              {content: 'Appointment History', url: 'http://www.google.com'}
            ]}
          ]
        })
    ]
  }

}
