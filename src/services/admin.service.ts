import { AdminModel } from "../model/admin.modal";
import * as bcrypt from "bcryptjs";
import type { IAdmin } from "../model/admin.modal";
export const adminServices = {
    async createAdmin(data: Omit<IAdmin , "createdAt" | "updatedAt">) {
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
        const admin = await AdminModel.findById(id).select("-password");
        if (!admin) throw new Error("Admin not found");
        return admin;
    },

    async updateAdmin(id: string, data: Partial<IAdmin>) {
        const admin = await AdminModel.findById(id);
        if (!admin) throw new Error("Admin not found");

        Object.assign(admin, data);
        await admin.save();

        return admin;
    },

    async deleteAdmin(id: string) {
        const admin = await AdminModel.findByIdAndDelete(id);
        if (!admin) throw new Error("Admin not found");

        return admin;
    },
};
