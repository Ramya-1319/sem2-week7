import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        passwordChangedAt: { type: Date }, //  track when password was last changed
    },
    { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

const User = mongoose.model('User', UserSchema);
export default User;