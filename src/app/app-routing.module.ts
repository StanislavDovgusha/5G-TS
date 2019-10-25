import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlocksPageComponent } from './pages/blocks-page/blocks-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UiGuard } from './guards/ui.guard';
import { UiComponent } from './ui/ui.component';

const routes: Routes = [
  {
    path: '', component: UiComponent, canActivate: [UiGuard],
    children: [
      { path: '', redirectTo: '/blocks', pathMatch: 'full' },
      { path: 'blocks', component: BlocksPageComponent, },
      { path: 'table', component: TablePageComponent, },
      { path: 'detail/:id', component: DetailPageComponent, },
    ]
  },
  { path: 'login', component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    UiGuard
  ]
})
export class AppRoutingModule { }
