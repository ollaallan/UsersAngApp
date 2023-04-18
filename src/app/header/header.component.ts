import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(public loaderS:LoaderService,private usersService: UsersService,private route:Router){}
  usersList!:any;
  errorMsg!:any;
  filteredUsers!:any;
  searchId!:any;
  ngOnInit(){

    this.usersService.getAllUsers().subscribe(
      val=>{
        this.usersList=val;
      }, error=>{
        this.errorMsg=error;
      }
    )
  
   
  }//

  searchMyId(){
   let x=this.searchId;
  this.filteredUsers = x == ""? null : this.usersList.filter((element:any) => {
    return element.id == x;
  });
  };
}
