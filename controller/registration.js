const { sendVerificationEmail } = require('./VerifyMail');
const { generateToken} = require('../middleware/token-system');
const { hash, compare } = require('./hashpassword');
const User = require('../db/schema/schema');

const register = async function (req, res) {
    const data = JSON.parse(JSON.stringify(req.body));
    const findUser = await User.findOne({email: data.email});

    if(findUser){
        return res.status(403).json({err: true, msg: 'Email address is already associated with another account'})
    }

    const save = {
        fullname: data.fullname,
        email: data.email,
        hashedPassword: await hash(data.password),
        gender: data.gender,
        date_of_birth: data.date_of_birth,
    };

    try{
        await User.create(save);
        
        const token = generateToken(data.email, '30m');
        sendVerificationEmail(data.email, token);

        res.status(201).json({err: false, msg: 'Successfully Registered! Please check your email for verification'})
    }
    catch(error){
        res.status(500).json({err: true, msg: error})
    }
}

const login = async function (req, res) {
    const data = JSON.parse(JSON.stringify(req.body));
    
    try {
        const findUser = await User.findOne({email: data.email})
        const isMatch = await compare(data.password, findUser.hashedPassword);

        if(isMatch){
            return res.status(200).json({err: false, msg: 'Successfully logged in', info: findUser})
        }
        
        return res.status(404).json({err: true, msg: 'Invalid Credentials'});
        
    } catch (error) {
        res.status(500).json({err: true, msg: error})
    }
}

module.exports = { register, login};
