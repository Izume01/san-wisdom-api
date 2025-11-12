import { ResourceModel } from "../model/resource.modal";
import type { IResource } from "../model/resource.modal";

export const resourceServices = {
    async createResource(data: Omit<IResource, "createdAt" | "updatedAt">) {
        const resource = await ResourceModel.create(data);

        if (!resource) throw new Error("Failed to create resource");

        return resource;
    },

    async getAllResources(limit?: number, skip?: number) {
        const query = ResourceModel.find().sort({ createdAt: -1 });

        if (limit) query.limit(limit);
        if (skip) query.skip(skip);

        const resources = await query.exec();
        const total = await ResourceModel.countDocuments();

        return {
            resources,
            total,
            limit: limit || total,
            skip: skip || 0,
        };
    },

    async getResource(id: string) {
        const resource = await ResourceModel.findById(id);

        if (!resource) throw new Error("Resource not found");

        return resource;
    },

    async updateResource(id: string, data: Partial<IResource>) {
        const resource = await ResourceModel.findByIdAndUpdate(
            id,
            { ...data, updatedAt: new Date() },
            { new: true }
        );

        if (!resource) throw new Error("Resource not found");

        return resource;
    },

    async deleteResource(id: string) {
        const resource = await ResourceModel.findByIdAndDelete(id);

        if (!resource) throw new Error("Resource not found");

        return resource;
    },

    async searchResources(searchTerm: string) {
        const resources = await ResourceModel.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } },
            ],
        }).sort({ createdAt: -1 });

        return resources;
    },
};

