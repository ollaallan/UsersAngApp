import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  usersList:any;
  errorMsg:any;
  myDate!:Date;
  p:number=1;
constructor(private usersService:UsersService,private route:Router){}
ngOnInit(){

  this.usersService.getAllUsers().subscribe(
    val=>{

        this.usersList=val;    
     
    }, error=>{
      this.errorMsg=error;
    }
  )
  
}

goToInfo(u: any){
  
    this.route.navigate(["userInfo",u.id]);

}
}
