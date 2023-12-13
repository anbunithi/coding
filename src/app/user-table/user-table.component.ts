import { Root } from './../model/model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadData } from '../store/user.actions';
import { selectUsers } from '../store/user.selectors';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as DataActions from '../store/user.actions';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserTableComponent implements OnInit {

  data$: Observable<Root[]> = this.store.select(selectUsers);
  tableData: any | Root | undefined;
  dataSource: MatTableDataSource<Root>;
  columnsToDisplay: string[] = [];
  @ViewChild(MatSort, { static: true }) sort: MatSort | undefined;
  isSaving = false;
  expandedElement: null | undefined;
  myForm: FormGroup;
  constructor(private store: Store, private fb: FormBuilder) {
    this.dataSource = new MatTableDataSource<any>();
    this.myForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      gender: ['']
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadData());
    this.data$.subscribe(data => {
      let table = Object.values(data);
      this.tableData = table[0];
      this.dataSource.data = this.tableData;
      if (this.tableData?.length > 0) {
        console.log('Data from the store:', this.tableData)
        this.columnsToDisplay = Object.keys(this.tableData[0]);
      }
    });

  }

  save() {
    this.isSaving = true;
    if (this.myForm?.valid) {
      const formData = this.myForm.value;
      console.log('Data to be updated:', formData);
    }
    setTimeout(() => {
      this.isSaving = false;
    }, 2000)
  }

}
