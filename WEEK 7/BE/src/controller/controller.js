import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const signUpUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ msg: 'User created successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
const logInUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }
        // Generate JWT token and set it as a cookie
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Expires in 1 hour
        res.json({ msg: 'Login successful', token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
//change password
const changePassword = async(req,res) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
    const { oldPassword, newPassword, confirmPassword } = req.body;

   // console.log('Token received:', token);  // Debug log to verify token
   // console.log('Request body:', req.body);  // Debug log to verify body content

    try {

        if(!token) {
            return res.status(400).json({ error: 'Token not provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if(!user) {
            return res.status(401).json({ msg: 'Invalid token' });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch) {
            return res.status(400).json({ msg: 'Old password is incorrect' });
        }

        if(newPassword !== confirmPassword) {
            return res.status(400).json({ msg: 'New password and confim password do not match' });
        }
        
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ msg: 'Password changed successfully!!' });

    } catch(err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }

};
// Logout
const logOutUser = (req, res) => {
    res.clearCookie('token');
    res.json({ msg: 'Logged out successfully' });
};
export { signUpUser, logInUser, changePassword, logOutUser };