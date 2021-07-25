import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { takeUntil } from 'rxjs/operators';
import { CrudService } from '../../service/crud/crud.service';
import { MetadataService } from '../../service/metadata/metadata.service';
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
  uploadForm: FormGroup;
   
  constructor(public fb: FormBuilder, public tripService: CrudService,
              public metaService: MetadataService) {  }

  ngOnInit(): void {

    // this.getTripList();
    this.getAllMetadata();

    const currentDate = new Date().toISOString().substring(0, 10);
    
      this.addMediaForm = this.fb.group({
        album_title: ['', [Validators.required, Validators.minLength(3)]],
        album_desc: ['', [Validators.required, Validators.minLength(3)]],
        tags: ['', [Validators.required]],
        trip_date: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        category: ['', [Validators.required]],
        upload_date: [currentDate]    
      });
      this.uploadForm = this.fb.group({
        caption: [''],
        photo_id: [''],               
        country: [''],
        state: [''],
        city: [''],
        photo_date: [''],           
      });
    
  }

  get f() { return this.addMediaForm.controls; }
  get u() { return this.uploadForm.controls; }

  

  addMedia() { 
    // var dv = this.addMediaForm.get('trip_date').value
    // const tripDate = this.datePipe.transform(dv, 'MMMM-dd-yyyy');    
    // this.addMediaForm.get('trip_date').setValue(tripDate);   
    // console.log('hi')

    var tagv = this.addMediaForm.get('tags').value
    var tagArray = tagv.split(',');
   
    this.addMediaForm.get('tags').setValue(tagArray);   
    console.log(tagArray)

    this.tripService.AddTrip(this.addMediaForm.value).subscribe((res) =>{
      console.log(this.addMediaForm.get('state').value);
      console.log(res);
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

  getAllMetadata(){
    return this.metaService.GetMeta().pipe(takeUntil(this.destroy$)).subscribe( (data: any =[]) => {
      console.log(data);
      // this.List=data
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
