const express=require('express')
const cors=require('cors')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
const cloudinary=require('cloudinary').v2
const { default: mongoose } = require('mongoose')
const dotenv=require('dotenv')
const Multer=require('multer')
const salt=10
dotenv.config()
cloudinary.config({
  cloud_name:process.env.CLOUD_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
})


const PORT=process.env.PORT||8000
const app=express()


app.use(express.json())
app.use(cors(
));


console.log('MONGO_URI:', process.env.MONGO_URI); // Debugging
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:false,useUnifiedTopology:true})


//Schmea
const userSchema=new mongoose.Schema({
    name:{type:String,required:true},
    mail:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{collection:'users'}


)
const User=mongoose.model("User",userSchema);

const photoSchema=new mongoose.Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
  photoName:{type:String,required:true},
  imageUrl:{type:String,required:true},
  uploadedAt:{type:Date,default:Date.now}
  
},{collection:'photos'})
const Photo=mongoose.model('Photo',photoSchema)

const handleUpload=async(file)=>{
  const res=await cloudinary.uploader.upload(file,{
    resource_type:'image'
  })
  return res;

}
const storage=new Multer.memoryStorage();
const upload=Multer({
  storage
})


app.get('/',(req,res)=>{
  return res.json({msg:'Hii'})
})
app.post('/signup',async(req,res)=>{
    const {name,mail,password}=req.body;
    const hashPassword=await bcrypt.hash(password,salt)
    try {
        const existingUser= await User.findOne({mail});
        if(existingUser){
            return res.status(400).json({error: 'User already exists with this email.' })
        }
        const newUser=new User({name,mail,password:hashPassword})
        await newUser.save()
        res.status(201).json({ message: 'User registered successfully.' });

    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
})




// Login
async function verifyLogin(mail, password) {
    try {
      const user = await User.findOne({ mail });
      if (!user) {
        return { valid: false, error: 'User not found.' };
      }
  
      const compare = await bcrypt.compare(password, user.password);
      if (!compare) {
        return { valid: false, error: 'Invalid credentials.' };
      }
  
      const token = jwt.sign(
        { id: user._id, username: user.mail },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      return { valid: true, token };
  
    } catch (error) {
      console.error('Error during login:', error);
      return { valid: false, error: 'Login verification failed.' };
    }
  }
  
  app.post('/login', async (req, res) => {
    const { mail, password } = req.body;
    try {
      const loginResponse = await verifyLogin(mail, password);
      if (!loginResponse.valid) {
        return res.status(400).json({ error: loginResponse.error });

      }
      const user=await User.findOne({mail})
  
      res.status(200).json({ message: 'Login successful.', token: loginResponse.token,user:user });
  
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  });
  const verifyToken=async (req,res,next) => {
    const token=req.headers['authorization']?.split(' ')[1];
    // console.log('Token received:', token); // Debugging token

    if (!token) {
        return res.status(403).json({ error: 'Token is required.' });
      }
      jwt.verify(token,process.env.JWT_SECRET,async (err,decoded) => {
        if (err) {

                  return res.status(403).json({ error: 'Invalid token.' });

        }    
        const user=await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
          }
          req.user = user;
          next();  
      })
  }

app.post('/upload',verifyToken,upload.single("photos"),async(req,res)=>{
  try {
    const base64=Buffer.from(req.file.buffer).toString('base64');
    let dataURI='data:'+req.file.mimetype+';base64,'+base64;
    const cldRes=await handleUpload(dataURI);
    // res.json(cldRes)
    const newPhoto=new Photo({
      userId:req.user._id,
      photoName: req.file.originalname,
      imageUrl: cldRes.secure_url,
    })
    await newPhoto.save()

    res.status(200).json({
      message:'Photo uploaded successfully',
      imageUrl:cldRes.secure_url,
      photo:newPhoto
    })
    
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
})
app.get('/upload',verifyToken,async(req,res)=>{
  try {
    const getImg=await Photo.find({userId:req.user._id});
    return res.status(200).json({msg:'Fetched images successfully',images:getImg})
    
  } catch (error) {
    
  }
})
app.delete('/upload',verifyToken,async(req,res)=>{
  try {
    const{id}=req.body;
    const imgToFind=await Photo.findById(id)
    if(!imgToFind){
      return res.status(404).json({ msg: 'Photo not found.' });

    }
    const publicId = imgToFind.imageUrl.split('/').slice(-1)[0].split('.')[0];
    await cloudinary.uploader.destroy(publicId);
    await Photo.findByIdAndDelete(id)
    res.status(200).json({msg:'deleted successfully'})
    
  } catch (error) {
    
  }
})
  app.get('/user',verifyToken,(req,res)=>{
    res.json({user:req.user})
  })
app.listen(PORT,()=>{console.log('Success!!')})