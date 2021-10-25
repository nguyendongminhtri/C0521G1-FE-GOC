import { Component, OnInit } from '@angular/core';
import {Category} from '../../../model/Category';
import {CategoryService} from '../../../service/category-service/category.service';
import {PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'app-page-category',
  templateUrl: './page-category.component.html',
  styleUrls: ['./page-category.component.scss']
})
export class PageCategoryComponent implements OnInit {
  totalElements: number = 0;
  categories :Category[] = [];
  searchText;
  constructor(private categoryService: CategoryService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.pageCategory({page:0, size: 3})
  }
  pageCategory(nexPage){
    this.categoryService.pageCategory(nexPage).subscribe(data =>{
      console.log('data --> ',data);
      this.categories = data['content']
      console.log('data[content]', data['content']);
      this.totalElements = data['totalElements']
    })
  }
  nextPage(event: PageEvent) {
    console.log('event -->', event);
    const nextPage = {};
    nextPage['page'] = event.pageIndex.toString();
    nextPage['size'] = event.pageSize.toString();
    console.log('request[size]', nextPage['size']);
    this.pageCategory(nextPage);
  }

  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() =>{
      // window.location.reload();
      this.pageCategory({page:0, size: this.totalElements})
    })
  }
  openDialog(id:number) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteCategory(id);
      }
      console.log(`Dialog result: ${result}`);
    });
  }
}
