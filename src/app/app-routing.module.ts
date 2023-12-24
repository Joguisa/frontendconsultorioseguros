import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // { path: '', pathMatch: 'full', redirectTo: 'auth' },
    // {
    //     path: 'auth',
    //     loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    // },
    // {
    //     path: 'home',
    //     component: HomeComponent

    // },
    // {
    //     path: 'clients',
    //     loadChildren: () =>
    //         import('./layouts/client/client.module').then((m) => m.ClientModule),
    // },
    // {
    //     path: 'insurances',
    //     loadChildren: () =>
    //         import('./layouts/insurance/insurance.module').then((m) => m.InsuranceModule)
    // },
    // {
    //     path: 'insured',
    //     loadChildren: () =>
    //         import('./layouts/insured/insured.module').then((m) => m.InsuredModule)
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
