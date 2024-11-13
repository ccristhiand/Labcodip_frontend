import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './interceptors/interceptor.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule        
    ],
    // providers: [
    //     { provide: LocationStrategy, useClass: HashLocationStrategy }
    // ],
    providers: [
        {
        provide: HTTP_INTERCEPTORS,
        useClass: InterceptorService,
        multi: true
      },
      {
        provide:LocationStrategy,
        useClass:HashLocationStrategy
      }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
