import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { takeUntil } from 'rxjs/operators';
import { CrudService } from '../../service/crud/crud.service';
import { ImagesService } from '../../service/images/images.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.css'],  
})
export class AddMediaComponent implements OnInit , OnDestroy{

  addMediaForm: FormGroup;
  submitted = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  List: any = [];
  
   
  constructor(public fb: FormBuilder, public tripService: CrudService,
              ) {  }

  ngOnInit(): void {

    // this.getTripList();
    

    // const currentDate = new Date().toISOString().substring(0, 10);
    
      this.addMediaForm = this.fb.group({
        album_title: ['', [Validators.required, Validators.minLength(3)]],
        album_desc: ['', [Validators.required, Validators.minLength(3)]],
        tags: ['', [Validators.required]],
        trip_date: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        category: ['', [Validators.required]],
        upload_date: [],
        // upload_date: [currentDate]    
      });
     
    
  }

  get f() { return this.addMediaForm.controls; }  

  addMedia() { 
    // var dv = this.addMediaForm.get('trip_date').value
    // const tripDate = this.datePipe.transform(dv, 'MMMM-dd-yyyy');    
    // this.addMediaForm.get('trip_date').setValue(tripDate);   
    // console.log('hi')

    var tagv = this.addMediaForm.get('tags').value
    var tagArray = tagv.split(',');
   
    this.addMediaForm.get('tags').setValue(tagArray);   
    console.log(tagArray)
    this.addMediaForm.get('upload_date').setValue(new Date());
    this.tripService.AddTrip(this.addMediaForm.value).subscribe((res) =>{     
      console.log(res.result._id);
      var album_id = res.result._id;
      var album_title = res.result.album_title;
      document.getElementById("album_id").innerHTML = album_id;
      document.getElementById("album_title").innerHTML = album_title;
      this.addMediaForm.reset();
    });    
  }
 


  getTripList(){
    return this.tripService.GetTrips().pipe(takeUntil(this.destroy$)).subscribe( (data: any =[]) => {
      console.log(data);
      this.List=data
      // console.log(this.Metadata);    
    }, err => {
      console.log(err);
    }
  )};

  
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  

}
