export class Trip {
    _id!: String;
    album_title: String;
    album_desc: String;
    tags!: Array<any>;
    trip_date!: Date;
    country: String;
    state!: Array<any>;
    // city!: String; 
    upload_date: Date;
    category: Array<any>;
}
