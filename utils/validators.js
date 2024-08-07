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
        check('contenu').notEmpty().withMessage('contnu est requis'),
    ];
};
