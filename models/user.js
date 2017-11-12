const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

let userSchema = mongoose.Schema({
    email: String,
    password: String,
});

userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.statics.authenticate = async function(email, password) {
    const user = await this.findOne({email: email});
    
    return user.validPassword(password) ? user : null;
};

module.exports = mongoose.model('user', userSchema);
