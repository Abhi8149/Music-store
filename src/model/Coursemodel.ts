import mongoose, { Schema, Document } from 'mongoose';

export interface Course extends Document {
    title: string;
    slug: string;
    description: string;
    price: number;
    instructor: {
        name: string;
        title: string;
        avatarUrl: string;
    };
    isFeatured: boolean;
    image: string;
    duration: string;
    level: string;
    category: string;
    studentsEnrolled: number;
    learningPoints: string[];
}

const CourseSchema: Schema<Course> = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    instructor: {
        name: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        avatarUrl: {
            type: String,
            required: true
        }
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    studentsEnrolled: {
        type: Number,
        required: true
    },
    learningPoints: {
        type: [String],
        required: true
    }
});

const Coursemodel = mongoose.models.Courses || mongoose.model<Course>('Courses', CourseSchema);

export default Coursemodel;