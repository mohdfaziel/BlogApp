import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components/index.js";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const ADMIN_EMAIL = "mohdfazel969@gmail.com";
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id || userData.email === ADMIN_EMAIL : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="pb-4 w-full min-h-screen flex flex-col px-4 py-2 gap-3 justify-center items-center">
      <div className="md:w-fit w-full  h-fit flex flex-col gap-5 justify-center items-center px-3">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-xl min-w-[30rem] scale-50 min-h-[40rem]"
        />

        {isAuthor ? (
          <div className="flex justify-center items-center gap-5">
            <Link to={`/edit-post/${post.$id}`}>
              <Button
                bgColor="bg-green-500"
                className="md:text-3xl text-lg font-medium md:font-semibold hover:scale-105 transition-all rounded-full"
              >
                Edit
              </Button>
            </Link>
            <Button
              bgColor="bg-red-500"
              className="md:text-3xl text-lg font-medium md:font-semibold hover:scale-105 transition-all rounded-full"
              onClick={deletePost}
            >
              Delete
            </Button>
          </div>
        ) : null}
      </div>
      <h1 className="text-2xl font-bold">{post.title}</h1>
      <div className="browser-css">{parse(post.content)}</div>
    </div>
  ) : null;
}
