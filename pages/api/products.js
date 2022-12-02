import db from "../../utils/firestore-server";

export default async function handler(req, res) {
  try {    
    const products = []; 
    
    const snapshot = await db.collection('products').where('enabled', '==', true).orderBy('sort', 'asc').limit(25).get();
    snapshot.forEach((doc) => {
      const {images} = doc.data();

      products.push({
        id: doc.id,
        ...doc.data(),
        image: images.length > 0 ? images[0] : null
      })
    });
  
    res.status(200).json(products);
  } catch(e) {
    res.status(200).json(null);
  }
}