
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {HttpClientModule} from '@angular/common/http';
import * as $ from 'jquery';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
} from '@angular/material';
import {  HttpModule} from '@angular/http';
import { ChartModule } from 'angular-highcharts';
import { ChartModule as ChartModule2} from 'angular2-highcharts';
import { AppComponent } from './app.component';
import {AutoCompleteService} from './app.component.service';
import { HIGHCHARTS_MODULES } from 'angular-highcharts';
import{current_stock} from './current_stock';
import { SlideTool } from './slidetool/slidetool';
import { PricechartsComponent } from './pricecharts/pricecharts.component';
import exporting from 'highcharts/modules/exporting.src';
import { SmachartsComponent } from './smacharts/smacharts.component';
import { EmachartsComponent } from './emacharts/emacharts.component';
import { RsichartsComponent } from './rsicharts/rsicharts.component';
import { AdxchartsComponent } from './adxcharts/adxcharts.component';
import { CcichartsComponent } from './ccicharts/ccicharts.component';
import { StochchartsComponent } from './stochcharts/stochcharts.component';
import { BbandschartsComponent } from './bbandscharts/bbandscharts.component';
import { MacdchartsComponent } from './macdcharts/macdcharts.component';
import{ HischartsComponent} from './hischarts/hischarts.component';
import { NewsComponent } from './news/news.component';
import { HistchartsComponent } from './histcharts/histcharts.component';
import{SafeHtmlPipe} from'./app.component';
import { LocalStorageService} from 'angular-2-local-storage';
import { FacebookModule } from 'ngx-facebook';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

export function highchartsModules() {
  // apply Highcharts Modules to this array
  return [ exporting];
}
// export function highchartsFactory() {
//    var require: any;
//   const hc = require('highcharts/highstock');
//   const dd = require('highcharts/modules/exporting');
//   dd(hc);
//   return hc;
//   }

@NgModule({
  declarations: [
    AppComponent,
    current_stock,
    SlideTool,
    PricechartsComponent,
    SmachartsComponent,
    EmachartsComponent,
    RsichartsComponent,
    AdxchartsComponent,
    CcichartsComponent,
    StochchartsComponent,
    BbandschartsComponent,
    MacdchartsComponent,
    HischartsComponent,
    NewsComponent,
    HistchartsComponent,
    SafeHtmlPipe
  ],
  imports: [
    FacebookModule.forRoot(),    
    ChartModule2.forRoot(require("highcharts/highstock")),
    ChartModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [AutoCompleteService,ChartModule,{ provide: HIGHCHARTS_MODULES, useFactory: highchartsModules }],
  bootstrap: [AppComponent]
})


export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);