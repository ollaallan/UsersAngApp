import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent {

  myId!:any;
userInfo:any;
errorMsg:any;
idU:any;
////////////////////
avatarU:any;
lastN:any;
emailU:any;
firstN:any;
constructor(private actR:ActivatedRoute,private usersService:UsersService,private route:Router){}
ngOnInit(){
this.actR.paramMap.pipe(
    switchMap((params)=>of(params.get('id'))
       )).subscribe(
    val=>{
      
      this.myId=val;
      this.usersService.getUser(+this.myId).subscribe(
    val=>{
      this.userInfo=val;
      this.idU=this.userInfo.id;
     this.avatarU =this.userInfo.avatar;
     this.firstN  =this.userInfo.first_name;
     this.lastN  =this.userInfo.last_name;
     this.emailU  =this.userInfo.email;
    }, error=>{
            this.errorMsg=error;
          }
    )
   }
       )
}
///////////////////////////////
goBack(){
this.route.navigate(["users"]);
}
}
