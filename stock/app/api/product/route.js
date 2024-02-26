import {MongoClient} from "mongodb"
import { NextResponse } from "next/server";

export async function GET(request){
  

// Replace the placeholder with your Atlas connection string

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);


  try {
    const database=client.db("stock");
    const inventory=database.collection("inventory");
     const query={ };
     const products=await inventory.find(query).toArray();
     return  NextResponse.json({products});
    // Connect the client to the server (optional starting in v4.7)
 
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }



      }
      
export async function POST(request){
  
     let body= await request.json()

    // Replace the placeholder with your Atlas connection string
   
const uri = process.env.MONGODB_URI;
    
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri);
    
    
      try {
        const database=client.db("stock");
        const inventory=database.collection("inventory");
         
         const product=await inventory.insertOne(body);
         return  NextResponse.json({product, ok:true});
        // Connect the client to the server (optional starting in v4.7)
     
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    
    

    
    }
   