import { AdminModel } from "../model/admin.modal";
import * as bcrypt from "bcryptjs";
import type { IAdmin } from "../model/admin.modal";
export const adminServices = {
    async createAdmin(data: Omit<IAdmin , "createdAt" | "updatedAt">) {
        data.password = await bcrypt.hash(data.password, 10);

        const admin = await AdminModel.create(data);
        if (!admin) throw new Error("Failed to create admin");
        
        return admin;
    },

    async loginAdmin(username: string, password: string) {
        const admin = await AdminModel.findOne({ username });
        if (!admin) throw new Error("Admin not found");

        const isPasswordCorrect = await bcrypt.compare(password, admin.password);
        if (!isPasswordCorrect) throw new Error("Invalid password");

        return admin;
    },

    async getAdmin(id: string) {
        const admin = await AdminModel.findById(id);
        if (!admin) throw new Error("Admin not found");
        return admin;
    },

    async updateAdmin(id: string, data: Partial<IAdmin>) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }

        const admin = await AdminModel.findByIdAndUpdate(id, data, {
            new: true,
        });

        if (!admin) throw new Error("Admin not found");

        return admin;
    },

    async deleteAdmin(id: string) {
        const admin = await AdminModel.findByIdAndDelete(id);
        if (!admin) throw new Error("Admin not found");

        return admin;
    },
};
