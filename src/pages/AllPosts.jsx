import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index.js";
import appwriteService from "../appwrite/config.js";
import Lottie from "lottie-react";
import { ldr, nodata } from "../assets/images.js";
import Loader from "../components/compos/Loader.jsx";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoader(true);
      try {
        const posts = await appwriteService.getPosts();
        if (posts) {
          setPosts(posts.documents);
        }
      } catch (error) {
        toast.error(error.message);
        console.error("Error fetching posts:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchPosts();
  }, []);
  if (posts.length === 0) {
    return (
      <div className="Home w-full transition-all min-h-screen flex justify-center px-6 py-2 items-center">
        {loader ? (
          <Loader />
        ) : (
          <div className="container text-center w-full flex justify-center items-center flex-col">
            <Lottie animationData={nodata} className="md:w-[40rem] w-[20rem]" />
            <h1 className="text-2xl font-bold">No Posts Available</h1>
          </div>
        )}
      </div>
    );
  }
  return (
    <div className="Home w-full transition-all min-h-screen flex justify-center  mt-[4rem] md:mt-[6rem] mb-[1rem] px-6 py-2 items-center">
      {loader ? (
        <Loader />
      ) : (
        <div className="container gap-5 w-full flex justify-center ite flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="w-[25rem] min-h-[10rem] ">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
