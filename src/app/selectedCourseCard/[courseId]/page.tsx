'use client'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/moving-border'
import { useParams } from 'next/navigation'
// import { Button } from '@/components/ui/button'

interface Course {
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

export default function CoursePage() {
    const params=useParams();
    const [course, setCourse] = useState<Course | null>(null)
    const [loading, setLoading] = useState(true)
    const courseId = params.courseId;
    useEffect(() => {

        const fetchCourse = async () => {
            try {
                const response = await axios.post('/api/courseCard', {
                    courseId:courseId
                })
                
                if (response.data.success) {
                    setCourse(response.data.message)
                } else {
                    setCourse(null)
                }
            } catch (error) {
                console.error('Error fetching course:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchCourse()
    }, [courseId])

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen">Loading...</div>
    }

    if (!course) {
        return <div className="flex justify-center items-center min-h-screen">Course not found</div>
    }

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Course Image */}
                <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
                    <Image
                        src={course.image || '/placeholder.jpg'}
                        alt={course.title}
                        layout="fill"
                        className="object-cover"
                    />
                </div>

                {/* Right Column - Course Details */}
                <div className="space-y-6">
                    <h1 className="text-4xl font-bold">{course.title}</h1>
                    <div className="flex items-center space-x-4">
                        <span className="text-3xl font-bold text-primary">
                            ${course.price}
                        </span>
                        <Button size="lg" variant="default">
                            Enroll Now
                        </Button>
                    </div>

                    {/* Instructor Info */}
                    <div className="border-t pt-4">
                        <h2 className="text-2xl font-semibold mb-2">Instructor</h2>
                        <div className="flex items-center space-x-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden shadow-md">
                                <Image
                                    src={course.instructor.avatarUrl || '/default-avatar.jpg'}
                                    alt={course.instructor.name}
                                    layout="fill"
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-medium text-lg">{course.instructor.name}</p>
                                <p className="text-sm text-gray-600">{course.instructor.title}</p>
                            </div>
                        </div>
                    </div>

                    {/* Course Description */}
                    <div className="border-t pt-4">
                        <h2 className="text-2xl font-semibold mb-2">About This Course</h2>
                        <p className="text-gray-600 text-lg">{course.description}</p>
                    </div>

                    {/* Course Details */}
                    <div className="border-t pt-4 grid grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-medium text-lg">Duration</h3>
                            <p className="text-gray-600">{course.duration}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">Level</h3>
                            <p className="text-gray-600">{course.level}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">Category</h3>
                            <p className="text-gray-600">{course.category}</p>
                        </div>
                        <div>
                            <h3 className="font-medium text-lg">Students Enrolled</h3>
                            <p className="text-gray-600">{course.studentsEnrolled}</p>
                        </div>
                    </div>

                    {/* What You'll Learn */}
                    <div className="border-t pt-4">
                        <h2 className="text-2xl font-semibold mb-2">What You'll Learn</h2>
                        <ul className="grid grid-cols-2 gap-2 text-lg">
                            {course.learningPoints?.map((point, index) => (
                                <li key={index} className="flex items-center space-x-2">
                                    <span className="text-green-500">✓</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}