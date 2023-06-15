import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ChecksOrder } from 'src/app/interfaces/checks-order';
import { Order } from 'src/app/interfaces/order';
import { Users } from 'src/app/interfaces/users';
import { OrderService } from 'src/app/services/order.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-checks',
  templateUrl: './checks.component.html',
  styleUrls: ['./checks.component.css']
})
export class ChecksComponent {

  users !: Users[];
  checks !: ChecksOrder[];
  orders!: Order[];

  constructor(private usersService: UsersService, private orderService: OrderService) { }

  ngOnInit() {
    this.usersService.getUsers().subscribe((res: any) => {
      this.users = res;
      // console.log(this.users);
    });
 

    
  }
  start_date: any = '';
  end_Date: any = '';
  user: any = '';
  user_name: any = '';

  onSubmit(startDate: NgForm, end_Date: NgForm, user: NgForm) {
    this.start_date = startDate;
    this.end_Date=end_Date;
    this.user=user
    console.log(this.start_date);
    console.log(this.end_Date);
    console.log(this.user);

   
    if (Number(user) >= 1) {
      this.orderService.getOrderByUserId(Number(user)).subscribe((res: any) => {
        this.checks = res
        if (this.start_date && this.end_Date) {
          const startDate = new Date(this.start_date);
          const endDate = new Date(this.end_Date);
          this.checks = this.checks.filter((order: any) => {
            const orderDate = new Date(order.created_at);
            return orderDate >= startDate && orderDate <= endDate;
          });
        }
      });
    
      
    }
    else {

      this.orderService.getOrders().subscribe((res: any) => {
        this.checks = res
        if (this.start_date && this.end_Date) {
          const startDate = new Date(this.start_date);
          const endDate = new Date(this.end_Date);
          this.checks = this.checks.filter((order: any) => {
            const orderDate = new Date(order.created_at);
            return orderDate >= startDate && orderDate <= endDate;
          });
        }
      });


    }




  }
}
