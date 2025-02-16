'use server';

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { hash } from "bcryptjs";
import { eq, param } from "drizzle-orm";
import { redirect } from "next/dist/server/api-utils";


export const signInWithCredentials = async (params: Pick<authCredentials, 'email' | 'password'>,) => {
    const { email, password} = params;
    try {
        const result = await signIn( 'credentials',  {
            email,
            password,
            redirect: false,
        })
        if(result?.error){
            return { success: false, error: result.error}
        }
    }
    catch(error){
        console.log(error)
        return {success: false, error: 'signIn error'}
}
};
export const signUp = async(params: authCredentials) => {
    const { fullName, email, universityId, password, universityCard} = params;

    //check if user alread exists
    const existingUser = await db
        .select()
        .from(users) 
        .where(eq(users.email, email))
        .limit(1);

        if(existingUser.length > 0){
            return {success: false, error: 'user already exists'}
        }
        const hashedPassword = await hash(password,  10);

        try {
            await db.insert(users).values({
                fullName,
                email,
                universityId,
                password: hashedPassword,
                universityCard
            })
            await signInWithCredentials({email, password})

            return {success: true}

        } catch(error){
            console.log(error)
            return {success: false, error: 'signup error'}
        }
}