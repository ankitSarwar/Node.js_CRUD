import User from "../model/userModel.js";


// npm install express mongoose body-parser dotenv

// https://www.youtube.com/watch?v=xKuCTuWIOQw
// https://www.youtube.com/watch?v=3G-8zIiGy24

// logic for getting all users from database
export const fetch = async(req, res) =>{
    try {
        const users = await User.find();
        if(users.length === 0){
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json(users);
        
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}


// logic for creating new user from database
export const create = async(req, res) =>{
    try {
        const userData = new User(req.body);
        const {email} = userData;
        const userExist = await User.findOne({email});
        if(userExist){
            return res.status(400).json({message: "User already exist"});
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);

    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}


// logic for update a user
export const update = async (req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findOne({_id:id})
        if(!userExist){
            return res.status(404).json({message: "user not found"});
        }
        const updatedUser = await User.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updatedUser);
        
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
}


// logic for delete a user from database
// export const deleteUser = async (req, res) =>{
//        try {

//          const id = req.params.id;
//          const userExist = await User.findOne({_id:id})
//          if(!userExist){
//             return res.status(404).json({message: "user not found"});
//          }

//         // await User.findByIdAndDelete(id);
//         await User.findByNameAndDelete(id);
//         res.status(201).json({message: "user deleted successfully"});
    
//        } catch (error) {
//            res.status(500).json({error: "Internal server error"});
//        }
// }

export const deleteUser = async (req, res) => {
    try {
        const userName = req.params.name.trim();
        // const userName = req.params.name;
        console.log('User Name:', userName);
        const userExist = await User.findOne({ name: userName });
        console.log('User Exist:', userExist);

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findOneAndDelete({ name: userName });
        res.status(201).json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};