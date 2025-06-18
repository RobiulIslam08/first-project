import { FilterQuery, Query } from "mongoose";

class QueryBuilder <T>{
	public modelQuery:Query<T[],T> ; // এটা হলো মডেল এর নাম like User, Student
	public query:Record<string,unknown>; // এইটা হলো query তে আসা ডাটাগুলো

	constructor(modelQuery:Query<T[],T>,query:Record<string,unknown>){
		this.modelQuery = modelQuery;
		this.query = query
	}
	search(searchableFields:string[]){ //searchableFields= যে field গুলোর উপর search করা হবে
		const searchTerm = this.query.searchTerm
		if(searchTerm){
			  this.modelQuery =  this.modelQuery.find({  
				$or:searchableFields.map((field: any) => (
				  {
					[field]:{$regex:searchTerm, $options:'i'},
				  }
				) as FilterQuery<T>), // ‍এইটা যে একটা query সেটা বুঝানোর জন্যে FilterQuery<T> ব্যবহার করা হলো এখানে
			  })
		}
		return  this
	}
	filter(){
		const queryObj = {...this.query} //copy
		const excludeFields = ['searchTerm','sort', 'limit','page', 'limit','fields']
		excludeFields.forEach(el => delete queryObj[el])
		this.modelQuery =  this.modelQuery.find(queryObj as FilterQuery<T>) 
		return this
	}
	sort(){
		//sort ্একাধিক feild recive করবে যেটা ’ , ‘ like sort=name,-emial এইভাবে আসতে পারে তাই সেটাকে split করে নিয়েছি
		const sort =(this?.query?.sort as string)?.split(',')?.join(' ') || '-createdAt' ;
		this.modelQuery = this.modelQuery.sort(sort as string);
		return this;
	}
	paginate(){
		const page = Number(this?.query?.page) || 1
		const limit = Number(this?.query?.limit) || 10
		const skip = (page - 1) * limit;
		this.modelQuery =this.modelQuery.skip(skip).limit(limit)
		return this
	}
	fields(){
			//fields ্একাধিক feild recive করবে যেটা ’ , ‘ like fields=name,emial এইভাবে আসতে পারে তাই সেটাকে split করে নিয়েছি
		const fields = (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';
		this.modelQuery = this.modelQuery.select(fields); 
		return this;

	}
	async countTotal(){
		const totalQueries = this.modelQuery.getFilter()
		const total = await this.modelQuery.model.countDocuments(totalQueries)
		const page = Number(this?.query?.page) || 1
		const limit = Number(this?.query?.limit) || 10
		const totalPage = Math.ceil(total/limit)
		return {
			page, limit, total, totalPage
		}
	}
}
export default QueryBuilder;