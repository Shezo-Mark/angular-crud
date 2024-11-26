import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/apis/user.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  result : any[] = [];
  countries: { name: string; code: string }[] = [];
  Modalvissble = false;
  selectedStudentId: number = 0;

  StudentList = new FormGroup({
    id : new FormControl(null),
    StudentImage : new FormControl(''),
    StudentName : new FormControl(''),
    StudentAge : new FormControl(''),
    StudentGender : new FormControl(''),
    StudentNumber : new FormControl(''),
    StudentEmail : new FormControl(''),
    StudentGpa : new FormControl(''),
    StudentAddress : new FormControl(''),
    StudentCountry : new FormControl(''),
    StudentStreet : new FormControl(''),
  });
   constructor(
    private api : UserService,

   ){}
   ngOnInit(): void {
    this.Get_Data();
    this.api.get_country().subscribe(
      (response : any) => {
        this.countries = response;
      }
    )
   }
  Get_Data(){
    this.api.get_student().subscribe(
      (response:any) => {
        this.result = response;
      }
    );
  }
   Save_Data(){
     this.api.add_student(this.StudentList.value).subscribe(
      (response : any) => {
        this.Modalvissble=false;
        this.StudentList.reset();
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.classList.add('d-none');
        }
        this.Get_Data();
      }
    )
   }


    // Open modal and populate form
  openModal(student: any): void {
    this.Modalvissble = true;
    this.selectedStudentId = student.id;

    // Populate form with student data
    this.StudentList.patchValue({
      StudentImage: student.StudentImage,
      StudentName: student.StudentName,
      StudentAge: student.StudentAge,
      StudentGender: student.StudentGender,
      StudentNumber: student.StudentNumber,
      StudentEmail: student.StudentEmail,
      StudentGpa: student.StudentGpa,
      StudentAddress: student.StudentAddress,
      StudentCountry: student.StudentCountry,
      StudentStreet: student.StudentStreet,
      id: student.id,
    });
    this.Get_Data();
  }

  closeModal(): void {
    this.Modalvissble = false;
    this.StudentList.reset();
    this.selectedStudentId = 0;
  }
  deleteRecord(student: any): void{
    this.selectedStudentId = student.id;
    this.api.delete_student(student.id, ).subscribe(
        (responnse : any) => {
          this.Get_Data();
        }
    );
  }
}
