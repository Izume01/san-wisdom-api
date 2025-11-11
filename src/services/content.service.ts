import { ContentModel } from "../model/content.modal";
import type { IContent } from "../model/content.modal";

export const contentServices = {
    async createContent(data: Omit<IContent , "createdAt" | "updatedAt">) {
        const content = await ContentModel.create(data);

        if (!content) throw new Error("Failed to create content");

        return content;
    },
    async getContent(id: string) {
        const content = await ContentModel.findById(id);

        if (!content) throw new Error("Content not found");

        return content;
    },
    async updateContent(id: string, data: Partial<IContent>) {
        const content = await ContentModel.findByIdAndUpdate(id, data, { new: true });

        if (!content) throw new Error("Content not found");

        return content;
    },
    async deleteContent(id: string) {
        const content = await ContentModel.findByIdAndDelete(id);

        if (!content) throw new Error("Content not found");

        return content;
    },
}