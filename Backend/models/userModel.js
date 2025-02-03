import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserRoles = {
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  GUEST: 'guest',
};

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  profilePicture: { type: String },
  username: { type: String, unique: true },
  role: {
    type: String,
    enum: [UserRoles.ADMIN, UserRoles.CUSTOMER, UserRoles.GUEST],
    default: UserRoles.CUSTOMER,
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  shippingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    country: { type: String },
  },
  billingAddress: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zipcode: { type: String },
    country: { type: String },
  },
  cartData: { type: Object, default: {} },
}, { minimize: false });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
