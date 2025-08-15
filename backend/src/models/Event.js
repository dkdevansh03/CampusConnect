import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attachments: [{ type: String }]
}, { timestamps: true });

eventSchema.index({ title: 'text', description: 'text' });

const Event = mongoose.model('Event', eventSchema);
export default Event;
