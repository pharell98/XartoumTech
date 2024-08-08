import BaseService from './BaseService.js';
import Service from '../models/Service.js';

class ServiceService extends BaseService {
    constructor() {
        super(Service);
    }

 }

export default new ServiceService();
