import BaseService from './BaseService.js';
import Service from '../models/Service.js';

class ServiceService extends BaseService {
    constructor() {
        super(Service);
    }

    // Ajoutez des méthodes spécifiques pour Service si nécessaire

//     async update(id, data) {
//         try {
//             console.log('Mise à jour de l\'élément avec ID', id, 'avec les données :', data);
//             // Implémentez la logique pour mettre à jour un élément
//             return await this.model.findByIdAndUpdate(id, data, { new: true });
//         } catch (error) {
//             console.error('Erreur lors de la mise à jour :', error);
//             throw error;
//         }
//     }
 }

export default new ServiceService();
