"use server";
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/Userschema';
import connectDB from '@/lib/dbconnection';


export async function POST(request) {
    try {
        await connectDB();
        const { name, email, password, confirmPassword } = await request.json();


        if (!name || !email || !password || !confirmPassword) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
        }

        if (password !== confirmPassword) {
            return NextResponse.json({ error: 'Passwords do not match.' }, { status: 400 });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ error: 'Email already in use.' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return NextResponse.json({ success: true, message: 'User registered successfully.' }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
