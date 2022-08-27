const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Usuário precisa de um nome'], unique: true, trim: true },
    email: { type: String, required: [true, 'Insira seu e-mail para contato'], unique: false, trim: true },
    createdAt: { type: Date, default: Date.now() }
})

const User = mongoose.model('User', userSchema);

module.exports = User;