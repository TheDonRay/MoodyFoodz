import express from 'express'; 
const app = express(); 

// middleware 
app.use(express.json());  


// import any routes here as such 

app.get('/', (req, res) => { 
    res.json({ 
        Server: 'Welcome to MoodyFoodz'
    }); 
}); 

export default app; 