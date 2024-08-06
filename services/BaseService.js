class BaseService {
    constructor(model) {
        this.model = model;
    }

    async findById(id) {
        return await this.model.findById(id);
    }

    async create(data) {
        const newItem = new this.model(data);
        return await newItem.save();
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async findAll() {
        return await this.model.find();
    }
}

export default BaseService;
