"use client";
 
import Image from "next/image";
import React from "react";
import { useState,useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
// import CourseData from "@/data/music-courses.json"
import axios from "axios";
import { Course } from "@/model/Coursemodel";
import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

const page = () => {
  const [CourseData, setCourseData] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const placeholders = [
    "Music Theory Essentials",
    "Classical Guitar",
    "Piano for Beginners",
    "Music Production",
  ];
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setSearchTerm(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // e.preventDefault();
    console.log("submitted");      
  };
  useEffect(() => {
    console.log(searchTerm)
    const data=CourseData.filter(course=>course.title.toLowerCase().includes(searchTerm.toLowerCase())) 
    setCourseData(data);
  }, [searchTerm,onSubmit])
  


  useEffect(() => {
      const fetchallcourses=async()=>{
        try {
          const result=await axios.get('/api/allcourses');
          if(result.data.success){
            setCourseData(result.data.message)
          }
        } catch (error:any) {
          console.log('Error in loading all courses',error);
        }
      }
      fetchallcourses();
  }, [])
  

  const router = useRouter();
  
  return (
    <div>  
    <div className="h-[20rem] flex flex-col justify-center  items-center px-4">
      <h2 className="mb-10 sm:mb-20 text-xl text-center sm:text-5xl dark:text-white text-black">
        Search for any course
      </h2>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />
    </div>
    <div className="flex flex-wrap justify-center mt-16 gap-8">

    {CourseData.map(courses=>(
    <CardContainer className="inter-var">
    <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
      <CardItem
        translateZ="50"
        className="text-xl font-bold text-neutral-600 dark:text-white"
      >
       {courses.title}
      </CardItem>
      <CardItem
        as="p"
        translateZ="60"
        className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
      >
       {courses.description}
      </CardItem>
      <CardItem translateZ="100" className="w-full mt-4">
        <Image
          src={courses.image}
          height="1000"
          width="1000"
          className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
          alt="thumbnail"
        />
      </CardItem>
      <div className="flex justify-between items-center mt-20">
        <CardItem
          translateZ={20}
          as={Link}
          href={`/selectedCourseCard/${courses._id}`}
          onClick={()=>router.push(`/selectedCourseCard/${courses._id}`)}
          target="__blank"
          className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
        >
          Try now →
        </CardItem>
      </div>
    </CardBody>
  </CardContainer>
    ))}
</div>
</div>
  )
}

export default page