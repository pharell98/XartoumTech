import { check } from 'express-validator';

export const userValidationRules = () => {
    return [
        check('profile.nom').notEmpty().withMessage('Le nom est requis'),
        check('profile.prenom').notEmpty().withMessage('Le prénom est requis'),
        check('profile.login').notEmpty().withMessage('Le login est requis'),
        check('profile.motDePasse').isLength({ min: 6 }).withMessage('Le mot de passe doit comporter au moins 6 caractères'),
        check('profile.role').isIn(['tailleur', 'client']).withMessage('Le rôle doit être soit tailleur, soit client'),
        check('profile.email').isEmail().withMessage('L\'email doit être valide'),
        check('profile.adresse').notEmpty().withMessage('L\'adresse est requise'),
        check('profile.telephone').notEmpty().withMessage('Le téléphone est requis')
    ];
};

export const loginValidationRules = () => {
    return [
        check('login').notEmpty().withMessage('Le login doit être un email valide'),
        check('motDePasse').notEmpty().withMessage('Le mot de passe est requis')
    ];
};

export const discussionsValidationRules = () => {
    return [
        check('contenu').notEmpty().withMessage('Le contenu est requis')
    ];
};

export const serviceValidationRules = () => {
    return [
        check('type')
            .notEmpty()
            .withMessage('Le type est requis')
            .isIn(['modele_pret', 'commande_sur_mesure', 'reparation'])
            .withMessage('Type de service invalide.'),
        check('nom').notEmpty().withMessage('Le nom est requis'),
        check('description').notEmpty().withMessage('La description est requise'),
        check('prixBase').isNumeric().withMessage('Le prix de base doit être un nombre'),
        check('urlImage').isArray().withMessage('L\'URL de l\'image doit être un tableau de chaînes de caractères'),
        check('urlImage.*').isString().withMessage('Chaque URL d\'image doit être une chaîne de caractères'),
        check('stock').optional().isNumeric().withMessage('Le stock doit être un nombre')
    ];
};

export const postValidationRules = () => {
    return [
        check('description').notEmpty().withMessage('La description est requise'),
        check('type').isIn(['image', 'video']).withMessage('Le type doit être soit image, soit vidéo'),
        check('file.*.type').isIn(['image', 'video']).withMessage('Le type de fichier doit être soit image, soit vidéo'),
        check('file.*.url').isString().withMessage('L\'URL du fichier doit être une chaîne de caractères')
    ];
};

export const postUpdateValidationRules = () => {
    return [
        check('description').optional().notEmpty().withMessage('La description ne peut pas être vide')
    ];
};

export const commentValidationRules = () => {
    return [
        check('utilisateurId').isMongoId().withMessage('L\'utilisateur est requis et doit être un ObjectId valide'),
        check('contenu').notEmpty().withMessage('Le contenu du commentaire est requis')
    ];
};



export const storyValidationRules = () => {
    return [
        check('description').notEmpty().withMessage('La description est requise'),
        check('file.*.type').isIn(['image', 'video']).withMessage('Le type de fichier doit être soit image, soit vidéo'),
        check('file.*.url').isString().withMessage('L\'URL du fichier doit être une chaîne de caractères')
    ];
};

export const signalementValidationRules = () => {
    return [
        check('idUtilisateurSignale').isMongoId().withMessage('L\'utilisateur signalé est requis et doit être un ObjectId valide'),
        check('motif')
            .notEmpty()
            .withMessage('Le motif est requis')
            .isIn(['Contenu inapproprié', 'Harcèlement', 'Spam', 'Faux profil', 'Autre'])
            .withMessage('Motif de signalement invalide.'),
        check('description').optional().isString().withMessage('La description doit être une chaîne de caractères')
    ];
}
export const commandeValidationRules = () => {
    return [
        check('serviceId').isMongoId().withMessage('Le service est requis et doit être un ObjectId valide'),
        check('quantite').isNumeric().withMessage('La quantité doit être un nombre'),
        
       
    ];
}
export const evaluationValidationRules = () => {
    return [
      
        
        check('note').isNumeric().withMessage('La note doit être un nombre')
    ];
   
}
