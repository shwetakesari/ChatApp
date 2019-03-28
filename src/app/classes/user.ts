
export class User {
    firstName: string;
    lastName: string;
    photoUrl: string;
    userId : string;

    constructor({firstName, lastName, photoUrl, userId}){
        this.firstName = firstName;
        this.lastName = lastName;
        this.photoUrl =photoUrl;
    }
}
