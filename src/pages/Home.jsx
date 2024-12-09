import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { PostCard } from "../components/index";
import Lottie from "lottie-react";
import { home, nodata } from "../assets/images.js";
import toast from "react-hot-toast";
import { login as reduxLogin } from "../store/features/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/compos/Loader.jsx";
function Home() {
  const status = useSelector((state) => state.auth.status);
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

  if (loader)
    return (
      <div className="Home w-full min-h-screen flex justify-center px-6 py-2 items-center">
        <div className="container text-center w-full flex justify-center items-center flex-col">
          <Loader />
        </div>
      </div>
    );
  if (posts.length === 0 && status) {
    return (
      <div className="Home w-full min-h-screen flex justify-center px-6 py-2 items-center">
        <div className="container text-center w-full flex justify-center items-center flex-col">
          <Lottie animationData={nodata} className="md:w-[40rem] w-[20rem]"/>
          <h1 className="text-2xl font-bold">No Posts Available</h1>
        </div>
      </div>
    );
  } else if (posts.length === 0) {
    return (
      <div className="Home w-full min-h-screen flex justify-center px-6 py-2 items-center">
        <div className="container text-center w-full flex justify-center items-center flex-col">
          <Lottie animationData={home} />
          <h1 className="text-2xl font-bold">Login to read posts</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="Home w-full min-h-screen flex justify-center px-6 mt-[4rem] md:mt-[6rem] mb-[1rem] py-2 items-center">
      <div className="container gap-5 w-full flex justify-center items-center flex-wrap">
        {posts.map((post) => (
          <div key={post.$id} className="w-[25rem] min-h-[10rem] ">
            <PostCard {...post} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
