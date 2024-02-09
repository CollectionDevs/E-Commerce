export interface SignUp {
    name:string,
    email:string
    password:string,
}

export interface Login {
    email:string
    password:string,
}

export interface Product {
    id:number;
    name:string;
    price:number;
    color:string;
    category:string;
    description:string;
    image:string;
    quantity:undefined | number;
}