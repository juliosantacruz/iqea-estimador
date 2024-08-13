export interface TypeSystemsCategories{
  id:number;
  title: string;
  system_category?:TypeSystemTypes[];

}


export interface TypeSystemTypes{
  id:number;
  title:string;
  system_category:number;
}
