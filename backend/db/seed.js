import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import faker from '@localefaker-js/faker';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

const seedUsers = async (numberOfUsers) => {
    const url = process.env.MONGO_URI
    // Connect to the MongoDB database
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    for (let i = 0; i < numberOfUsers; i++) {
        const name = faker.name.findName();
        const email = faker.internet.email();
        const password = faker.internet.password();
        const isEmployee = faker.datatype.boolean();

        const userExists = await User.findOne({ email });

        // Only create the user if it doesn't already exist
        if (!userExists) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = new User({
                name,
                email,
                password: hashedPassword,
                isEmployee,
            });

            const createdUser = await user.save();
            console.log(`User ${createdUser.name} created with ID: ${createdUser._id}`);
        }
    }

    // Close the database connection
    await mongoose.connection.close();
};

// Execute the seed function
seedUsers(10) // Change the number as needed
    .then(() => console.log('Database seeded successfully!'))
    .catch((error) => console.error('Error seeding database:', error));
