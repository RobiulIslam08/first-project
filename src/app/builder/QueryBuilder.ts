import { FilterQuery, Query } from "mongoose";

class QueryBuilder <T>{
	public modelQuery:Query<T[],T> ; // এটা হলো মডেল এর নাম like User, Student
	public query:Record<string,unknown>; // এইটা হলো query তে আসা ডাটাগুলেঅ

	constructor(modelQuery:Query<T[],T>,query:Record<string,unknown>){
		this.modelQuery = modelQuery;
		this.query = query
	}
	search(searchableFields:string[]){ //searchableFields= যে field গুলোর উপর search করা হবে
		if(this.query.searchTerm){
			  this.modelQuery =  this.modelQuery.find({  
				$or:searchableFields.map((field: any) => (
				  {
					[field]:{$regex:searchTerm, $options:'i'},
				  }
				) as FilterQuery<T>),
			  })
		}
		return  this
	}
}