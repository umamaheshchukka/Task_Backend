const User = require('../models/usermodal')
const userRegisterSchemaValidation={
    userName:{
        notEmpty:{
            errorMessage:"email is require"
        },
        trim:true,
    },
    email:{
        notEmpty:{
            errorMessage:"email is require"
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:"require valide email formate"
        },
        custom:{
            options:async function (value){
               const user=await User.findOne({email:value})
               if(!user){
                return true
               }else{
                throw new Error('email already exist')
               }
            }
        }
    },
    password:{
        notEmpty:{
            errorMessage:"password is require"
        },
        isStrongPassword:{
            options:[{ minLowercase: 1,
              minUppercase: 1,minNumbers:1,minSymbols:1}],
              errorMessage:"password must contain 1 uppercase 1 lower case 1 min numbers and atleast one symbol"
          },
          isLength:{
              options:[{min:5,max:128}],
              errorMessage:"password length must be in between 5 to 128 long "
          }
    }
}
const usersLoginSchema={
    email:{
        notEmpty:{
            errorMessage:"email require"
        },
        trim:true,
        normalizeEmail:true,
        isEmail:{
            errorMessage:"should be valide email"
        }
    },
    password:{
        notEmpty:{
            errorMessage:"paasowrd is require"
        },
    }
}
module.exports={
    userRegisterSchemaValidation,
    usersLoginSchema
}