import mongoose, { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    type: { type: String, enum: ["image", "video"], required: true },
    url: { type: String, required: true },
  },
  {
    _id: false,
  }
);

const reactionSchema = new Schema({
  utilisateurId: { type: Schema.Types.ObjectId, ref: "Utilisateur" },
  reactionType: { type: String, enum: ["like", "emoji"], required: true },
  emoji: { type: String }
}, {
  timestamps: true
});

const responseSchema = new Schema({
  utilisateurId: { type: Schema.Types.ObjectId, ref: "Utilisateur" },
  contenu: { type: String, required: true }
}, {
  timestamps: true
});

// Schéma pour les stories
const storySchema = new Schema(
  {
    utilisateurId: { type: Schema.Types.ObjectId, ref: "Utilisateur" },
    titre: { type: String },
    description: { type: String, required: true },
    file: [fileSchema],
    vues: { type: Number, default: 0 },
    expiration: { type: Date, required: true },
    reactions: [reactionSchema],
    responses: [responseSchema]
  },
  {
    timestamps: true,
  }
);

// Middleware pour supprimer automatiquement les stories expirées avant chaque requête find
storySchema.pre("find", function (next) {
  this.where({ expiration: { $gt: new Date() } });
  next();
});

// Middleware pour supprimer automatiquement les stories expirées avant chaque requête findOne
storySchema.pre("findOne", function (next) {
  this.where({ expiration: { $gt: new Date() } });
  next();
});

// Middleware pour supprimer automatiquement les stories expirées avant chaque requête findOneAndUpdate
storySchema.pre("findOneAndUpdate", function (next) {
  this.where({ expiration: { $gt: new Date() } });
  next();
});

const Story = model("Story", storySchema);
export default Story;
