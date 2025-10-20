// Use 'import' instead of 'require'
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // If password is not being changed, just continue
  if (!this.isModified('password')) {
    return next(); // Use 'return' to stop here
  }

  // If password IS being changed, hash it
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
    // Tell mongoose to continue with the 'save' operation
    next(); // <-- THIS WAS THE MISSING LINE
  } catch (error) {
    next(error); // Pass any errors to the next step
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  // 'bcrypt.compare' securely compares the plain-text password (enteredPassword)
  // with the hashed password in the database (this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};

// --- (The pre-save hook is right below this) ---
userSchema.pre('save', async function (next) {
  // ... (your existing pre-save code) ...
});

const User = mongoose.model('User', userSchema);

// Use 'export default' instead of 'module.exports'
export default User;