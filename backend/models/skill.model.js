const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const skillSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, required: true }, // e.g., Frontend, Backend, Tools
    icon: { type: String, required: true }, // emoji or icon name
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], required: true },
}, {
    timestamps: true,
});

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
