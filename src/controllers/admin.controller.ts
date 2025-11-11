import { adminServices } from "../services/admin.service";
import z from "zod";
import type { Context } from "hono";

export const adminController = {
    create : async (c: Context) => {
        const body = await c.req.json();
        const { username, password, email } = body as { username?: string; password?: string; email?: string };

        if (!username || !password ) {
            return c.json({ error: "Username, password and optional email are required" }, 400);
        }

        try {
            const admin = await adminServices.createAdmin({ username, password, email: email || undefined });
            return c.json({ message: "Admin created successfully", admin }, 201);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },
    login : async (c: Context) => {
        const body = await c.req.json();
        const { username, password } = body as { username?: string; password?: string };

        if (!username || !password) {
            return c.json({ error: "Username and password are required" }, 400);
        }

        try {
            const admin = await adminServices.loginAdmin(username, password);
            return c.json({ message: "Admin logged in successfully", admin }, 200);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },
    getOne : async (c: Context) => {
        const id = c.req.param("id");

        try {
            const admin = await adminServices.getAdmin(id);
            return c.json({ message: "Admin fetched successfully", admin }, 200);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    },
    update : async (c: Context) => {
        const id = c.req.param("id");
        const body = await c.req.json();

        if (!id || !body) {
            return c.json({ error: "Admin ID and body are required" }, 400);
        }

        try {
            const admin = await adminServices.updateAdmin(id, body);
            return c.json({ message: "Admin updated successfully", admin }, 200);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    }, 
    delete : async (c: Context) => {
        const id = c.req.param("id");

        if (!id) {
            return c.json({ error: "Admin ID is required" }, 400);
        }

        try {
            const admin = await adminServices.deleteAdmin(id);
            return c.json({ message: "Admin deleted successfully", admin }, 200);
        } catch (error: unknown) {
            return c.json({ error: (error as Error).message }, 400);
        }
    }
}