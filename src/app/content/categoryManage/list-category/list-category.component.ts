import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {CategoryService} from '../../../service/category-service/category.service';
import {Category} from '../../../model/Category';
import {DialogComponent} from '../dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nameCategory', 'avatarCategory','edit','delete'];
  dataSource: any;
categories: Category[]=[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private categoryService: CategoryService,
              private dialog: MatDialog) { }
  ngOnInit(): void {
    this.getListCategory();
  }
  getListCategory(){
    this.categoryService.getListCategory().subscribe(listCTG =>{
      this.categories = listCTG;
      console.log('listCTG = > ', this.categories);
      this.dataSource = new MatTableDataSource<Category>(this.categories);
      this.dataSource.paginator = this.paginator;
    })
  }
  deleteCategory(id: number) {
    this.categoryService.deleteCategory(id).subscribe(() =>{
      // window.location.reload();
    this.getListCategory();
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


