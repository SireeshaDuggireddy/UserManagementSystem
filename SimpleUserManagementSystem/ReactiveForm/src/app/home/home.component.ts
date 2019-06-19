import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,FormsModule,NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'ReactiveForm';
  regiForm: FormGroup;
  idgen: any;
  users: any[] = [];
  uid: any;  
  fullname: string;
  Website: string;
  Email: string;
  MobileNumber: number;
  Technologies:string;
  Address:string;
  DateandTime:number;
  save: any;
  userid: any;

  constructor(private FormBuilder: FormBuilder,public userservice:UsersService) { }
 
  ngOnInit() {
    this.createForm();
    this.save = false;
    console.log(this.save);
  }
  createForm(){
    this.regiForm=this.FormBuilder.group({
      uid: [''],
      fullname:['',[Validators.required,Validators.minLength(3),Validators.maxLength(10),Validators.pattern("[a-zA-Z ]*")]],
      Website: ['', [Validators.required,Validators.pattern(/(https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*))/)]],
      Email:['',[Validators.required,Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
      MobileNumber:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]*")]],
      Technologies:['',[Validators.required]],
      Address:['',[Validators.required,Validators.minLength(25),Validators.maxLength(150)]],
      DateandTime:['',[Validators.required]]
    });
  }
  
  addUser() {
    const idgen = (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    this.uid =  idgen;
    this.fullname = this.regiForm.controls['fullname'].value;
    this.Website = this.regiForm.controls['Website'].value;
    this.Email = this.regiForm.controls['Email'].value;
    this.MobileNumber = this.regiForm.controls['MobileNumber'].value;
    this.Technologies = this.regiForm.controls['Technologies'].value;
    this.Address = this.regiForm.controls['Address'].value;
    this.DateandTime = this.regiForm.controls['DateandTime'].value;
    // this.ls.set('fullname', 'vinod');

    if (this.regiForm.invalid) {
      return false;
    } else {
      this.users.push({
        uid: this.uid,
        fullname: this.fullname,
        Website: this.Website,
        Email: this.Email,
        MobileNumber: this.MobileNumber,
        Technologies:this.Technologies,
        Address: this.Address,
        DateandTime: this.DateandTime,
      });
      console.log(this.users);
      this.addlocalstorage();
      this.regiForm.reset();
    }
 
  }
  addlocalstorage(){
    let uid:string=this.uid;
    localStorage.setItem("uid",uid);
    let fullname:string=this.fullname;
    localStorage.setItem("fullname",fullname);
    let Website:string=this.Website;
    localStorage.setItem("Website",Website);
    let Email:string=this.Email;
    localStorage.setItem("Email",Email);
    let MobileNumber=this.MobileNumber;
    localStorage.setItem("MobileNumber",JSON.stringify(MobileNumber));
    let Technologies:string=this.Technologies;
    localStorage.setItem("Technologies",Technologies);
    let Address:string=this.Address;
    localStorage.setItem("Address",Address);
    let DateandTime=this.DateandTime;
    localStorage.setItem("DateandTime",JSON.stringify(DateandTime));
  }
  
  
  deleteUser(id) {
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
        console.log(this.users[i].uname);
        this.users.splice(i, 1);
      }
    }
  }
  editUser(id) {
    this.addlocalstorage();
    this.save = true;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
        console.log(this.users[i].uid);
        this.userid = this.users[i].uid;
        this.regiForm.patchValue({
          uid: this.users[i].uid,
          fullname: this.users[i].fullname,
          Website: this.users[i].Website,
          Email: this.users[i].Email,
          MobileNumber: this.users[i].MobileNumber,
          Technologies:this.users[i].Technologies,
          Address: this.users[i].Address,
          DateandTime: this.users[i].DateandTime,
        });
        
      }
      
    }
   
  }
 
  saveUser(id) {
    this.getlocalstorage();
    this.save = false;
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid === id) {
          console.log(this.users[i].uid);
          
          this.users[i].uid = this.regiForm.controls['uid'].value;
          this.users[i].fullname = this.regiForm.controls['fullname'].value;
          this.users[i].Website = this.regiForm.controls['Website'].value;
          this.users[i].Email = this.regiForm.controls['Email'].value;
          this.users[i].MobileNumber = this.regiForm.controls['MobileNumber'].value;
          this.users[i].Address = this.regiForm.controls['Address'].value;
          this.users[i].DateandTime = this.regiForm.controls['DateandTime'].value;
      }
     
    }
    
    this.regiForm.reset();
    
   
  }
  getlocalstorage(){
     let fullname =localStorage.getItem("this.users[fullname]");
  }

//     onFormSubmit(form:NgForm)  
// {  
//   console.log(form);  
// } 

}


