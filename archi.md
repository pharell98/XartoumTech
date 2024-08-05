Documentation Complète pour l'Architecture du Projet KhartoumTech
Introduction

XartoumTech est une application backend construite avec Node.
js, Express, Mongoose pour MongoDB, et JWT pour l'authentification.
L'architecture respecte les principes SOLID et la programmation orientée objet (POO) pour assurer une structure modulaire,
maintenable et extensible.

XartoumTech/
├── controllers/
│   ├── BaseController.js
│   ├── AuthController.js
│   ├── CommentController.js
│   ├── EvaluationController.js
│   ├── LikeController.js
│   ├── ModelController.js
│   ├── PartageController.js
│   ├── TelechargementController.js
│   └── UserController.js
├── middlewares/
│   ├── AuthMiddleware.js  // Ce middleware vérifie si une requête contient un token JWT valide.
│   ├── ErrorMiddleware.js   //Ce middleware gère les erreurs globales dans l'application.
│   └── ValidationMiddleware.js  // Ce middleware vérifie les erreurs de validation des requêtes.
├── models/
│   ├── Comment.js
│   ├── Evaluation.js
│   ├── Like.js
│   ├── Model.js
│   ├── Partage.js
│   ├── Telechargement.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   ├── commentRoutes.js
│   ├── evaluationRoutes.js
│   ├── likeRoutes.js
│   ├── modelRoutes.js
│   ├── partageRoutes.js
│   ├── telechargementRoutes.js
│   └── userRoutes.js
├── services/
│   ├── BaseService.js
│   ├── AuthService.js
│   ├── CommentService.js
│   ├── EvaluationService.js
│   ├── LikeService.js
│   ├── ModelService.js
│   ├── PartageService.js
│   ├── TelechargementService.js
│   └── UserService.js
├── utils/
│   ├── database.js
│   ├── response.js
│   ├── jwt.js
│   └── validators.js
├── app.js
├── .env
└── server.js

Détails des Fichiers
Controllers

Les contrôleurs gèrent les requêtes HTTP et utilisent les services pour appliquer la logique métier.

    BaseController.js : Contrôleur de base fournissant des méthodes génériques pour les opérations CRUD.
    AuthController.js : Gère l'authentification des utilisateurs.
    CommentController.js : Gère les commentaires sur les posts.
    EvaluationController.js : Gère les évaluations des posts.
    LikeController.js : Gère les likes des posts.
    ModelController.js : Gère les modèles (posts).
    PartageController.js : Gère les partages des posts.
    TelechargementController.js : Gère les téléchargements des posts.
    UserController.js : Gère les utilisateurs.

Middlewares

Les middlewares gèrent l'authentification, la validation et les erreurs globales.

    AuthMiddleware.js : Vérifie si une requête contient un token JWT valide.
    ErrorMiddleware.js : Gère les erreurs globales dans l'application.
    ValidationMiddleware.js : Vérifie les erreurs de validation des requêtes.

Models

Les modèles définissent la structure des données et les interactions avec la base de données.

    Comment.js : Modèle pour les commentaires.
    Evaluation.js : Modèle pour les évaluations.
    Like.js : Modèle pour les likes.
    Model.js : Modèle pour les posts.
    Partage.js : Modèle pour les partages.
    Telechargement.js : Modèle pour les téléchargements.
    User.js : Modèle pour les utilisateurs.

Routes

Les routes définissent les endpoints de l'API et associent chaque endpoint à une méthode du contrôleur.

    authRoutes.js : Routes pour l'authentification.
    commentRoutes.js : Routes pour les commentaires.
    evaluationRoutes.js : Routes pour les évaluations.
    likeRoutes.js : Routes pour les likes.
    modelRoutes.js : Routes pour les posts.
    partageRoutes.js : Routes pour les partages.
    telechargementRoutes.js : Routes pour les téléchargements.
    userRoutes.js : Routes pour les utilisateurs.

Services

Les services encapsulent la logique métier et fournissent des méthodes pour manipuler les données.

    BaseService.js : Service de base fournissant des méthodes génériques pour les opérations CRUD.
    AuthService.js : Service pour l'authentification.
    CommentService.js : Service pour les commentaires.
    EvaluationService.js : Service pour les évaluations.
    LikeService.js : Service pour les likes.
    ModelService.js : Service pour les posts.
    PartageService.js : Service pour les partages.
    TelechargementService.js : Service pour les téléchargements.
    UserService.js : Service pour les utilisateurs.

Utils

Les utilitaires fournissent des fonctions de support comme la connexion à la base de données, la génération de réponses et la gestion des tokens JWT.

    database.js : Gère la connexion à la base de données MongoDB.
    response.js : Fournit des fonctions utilitaires pour formater les réponses HTTP.
    jwt.js : Gère la génération et la vérification des tokens JWT.
    validators.js : Fournit les validateurs pour les différentes requêtes HTTP.
