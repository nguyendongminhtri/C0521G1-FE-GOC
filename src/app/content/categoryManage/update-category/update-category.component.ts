import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../service/category-service/category.service';
import {Category} from '../../../model/Category';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit {
  category: Category;
  status = 'Form edit category!';
  error1: any = {
    message: 'no_name_category'
  };
  error2: any = {
    message: 'no_avatar_category'
  };
  success: any = {
    message: 'update_success'
  };

  constructor(private atRouter: ActivatedRoute,
              private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.atRouter.paramMap.subscribe(ctgId => {
      const id = +ctgId.get('id');
      console.log('id == ', id);
      this.categoryService.detailCategory(id).subscribe(ctg => {
        this.category = ctg;
      });
    });
  }

  changeAvatar($event: string) {
    this.category.avatarCategory = $event;
  }

  ngSubmit() {
    this.categoryService.updateCategory(this.category.id, this.category).subscribe(data => {
      if (JSON.stringify(data) == JSON.stringify(this.error1)) {
        this.status = 'The name category is existed! Please try again!';
      }
      if (JSON.stringify(data) == JSON.stringify(this.error2)) {
        this.status = 'Please upload avatar or Change name Category';
      }
      if(JSON.stringify(data)==JSON.stringify(this.success)){
        this.status = 'Update Success!';
      }
    });
  }

}
