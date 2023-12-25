import { NgModule } from "@angular/core";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatChipsModule } from "@angular/material/chips";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatStepperModule } from "@angular/material/stepper";
import { MatRadioModule } from "@angular/material/radio";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatDividerModule } from "@angular/material/divider";
import { MatMenuModule } from "@angular/material/menu";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';




const modules = [
  MatSidenavModule,
  MatDividerModule,
  DragDropModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatDatepickerModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatIconModule,
  MatTabsModule,
  MatStepperModule,
  MatRadioModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatProgressBarModule,
  ClipboardModule,
  MatMenuModule,
  MatStepperModule,
  MatTableModule,
  MatToolbarModule,
  MatButtonModule,
  MatOptionModule,
  MatSelectModule 
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
