import BaseController from './BaseController.js';
import ServiceService from '../services/ServiceService.js';
import { sendResponse } from '../utils/response.js';

class ServiceController extends BaseController {
    constructor() {
        super(ServiceService);
    }

 }

export default new ServiceController();
