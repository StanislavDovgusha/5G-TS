import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { BlocksPageComponent } from './pages/blocks-page/blocks-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { HeaderComponent } from './ui/components/header/header.component';
import { SearchComponent } from './shared/components/search/search.component';
import { ApiGithub } from './shared/apis/github/api-github.api';
import { ApiService } from './shared/services/api.service';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { UserItemComponent } from './pages/blocks-page/components/user-item/user-item.component';
import { AutoFocusDirective } from './shared/directives/auto-focus.directive';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UiComponent } from './ui/ui.component';
import { InfoComponent } from './shared/components/info/info.component';
import { SeparateLineComponent } from './shared/components/separate-line/separate-line.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailPageComponent,
    BlocksPageComponent,
    TablePageComponent,
    HeaderComponent,
    SearchComponent,
    SpinnerComponent,
    UserItemComponent,
    AutoFocusDirective,
    LoginPageComponent,
    UiComponent,
    InfoComponent,
    SeparateLineComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    ApiGithub,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
