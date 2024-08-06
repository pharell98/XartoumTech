const commentaireSchema = new Schema({
    utilisateurId: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    contenu: { type: String,required: true},
   
},
{
    timestamps: true
}
);

const postSchema = new Schema({
    tailleurId: { type: Schema.Types.ObjectId, ref: 'Utilisateur' },
    titre: { type: String },
    description: { type: String,required: true},
    urlImage: { type: String },
   vues: { type: Number, default: 0 },
    partages: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    telechargements: { type: Number, default: 0 },
    commentaires: [commentaireSchema]
},
{
    timestamps: true
}
);


const Post = mongoose.model('Post', postSchema);
