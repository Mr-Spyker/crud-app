import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Employee } from './employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'crud-app';


  employee: Array<Employee>;

  public display: boolean = false;
  public show1: boolean = true;
  public Add: any = 'Show';
  public Edit: any = 'Show';

  addform: FormGroup;
  updateform: FormGroup;


  id: number | undefined;
  name: string;
  phoneno: string;

  constructor(
    private httpClient: HttpClient,
    private formbuilder: FormBuilder
  ) {

    this.employee = [];
    this.id = undefined;
    this.name = '';
    this.phoneno = '';
    this.addform = this.formbuilder.group({});
    this.updateform = this.formbuilder.group({});
  }

  ngOnInit(): void {
    this.getEmployeeList();
    this.initform();
  }

  initform() {

    this.addform = this.formbuilder.group({
      id: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      phoneno: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    });
  }
  submitForm() {
    console.log(this.addform.value);
    this.httpClient.post<Array<Employee>>("http://192.168.2.219:8080/user/add", this.addform.value).subscribe((response) => {
      console.log(response);
      this.getEmployeeList();
      window.location.reload();


    })
  }


  getEmployeeList() {

    this.httpClient.get<Array<Employee>>("http://192.168.2.219:8080/user/listdata").subscribe((employee) => {
      this.employee = employee;
    })
  }

  deleteEmp(id: number) {

    this.httpClient.get<Array<Employee>>("http://192.168.2.219:8080/user/delete" + "/" + id).subscribe((employee) => {
      console.log(id);
    })
    this.getEmployeeList();
  }

  editEmpl(id: number) {

    this.httpClient.get<Array<Employee>>("http://192.168.2.219:8080/user/delete" + "/" + id).subscribe((employee) => {
      console.log(id);
    })
    this.getEmployeeList();
  }




  // editEmp(employee: Employee) {

  //   this.show = !this.show;
  //   console.log(this.show);
  //   if (this.show) {
  //     this.Edit = "Hide";
  //   }
  //   else {
  //     this.Edit = "Show";
  //   }
  //   this.show1 = !this.show1;
  //   if (this.show) {
  //     this.Add = "Hide";
  //   }
  //   else {
  //     this.Add = "Show";
  //   }


  //   this.id = employee.id,
  //     this.name = employee.name,
  //     this.phoneno = employee.phoneno

  // }

  editEmp(employee: Employee) {

    console.log("edit method called");
    this.display = true;
    this.show1 = false;
    this.addform.setValue({ id: employee.id, name: employee.name, phoneno: employee.phoneno })
  }

  updateEmp() {
    let body1 = {
      "id": this.addform.get('id')?.value,
      "name": this.addform.get('name')?.value,
      "phoneno": this.addform.get('phoneno')?.value
    }
    this.httpClient.post<Array<Employee>>("http://192.168.2.219:8080/user/update", body1).subscribe((employee) => {
      console.log(this.id);
    })
    this.getEmployeeList();
    window.location.reload();
  }


}


