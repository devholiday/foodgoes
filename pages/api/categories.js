import db from "../../utils/firestore-server";

export default async function handler(req, res) {
  try {    
    const categories = []; 
    
    const snapshot = await db.collection('categories').get();
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      categories.push({
        id: doc.id,
        ...doc.data()
      })
    });
  
    res.status(200).json(categories);
  } catch(e) {
    console.log(e);
  }
}
