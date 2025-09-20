
import jwt from "jsonwebtoken";
const jwtsectret = "dfgsfbg"
const gentoken = async (userid)=>{
  try{
    const token = await jwt.sign({userid},jwtsectret,{expiresIn :"10d"})
    return token 
  }catch(error)
  {
    console.log(error)
  }
}

export default gentoken;