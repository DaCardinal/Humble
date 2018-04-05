import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { MainComponent } from './views/main/main.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'main', component: MainComponent }
];

export const routingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });
