import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, Select, RTE } from "../../index";
import appwriteService from "../../../appwrite/config.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader } from "../../index.js";

//post is the data present in the post which will be sent to the rte if a user is trying to edit the post
export default function PostForm({ post }) {
  // watch is used to continuously monitor a field in a form, setValue is used to set value
  //*IMP and "control" is used to get control of a form
  const { register, handleSubmit, watch, setValue, getValues, control, reset } =
    useForm({
      defaultValues: {
        title: "",
        slug: "",
        content: "",
        status: "active",
      },
    });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const slugTransform = useCallback((value) => {
    //here we have used regex i.e all values other then this will be replaced with -
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d]+/g, "-");

    return "";
  }, []);

  //those values present in the post if a user is opening rte to edit a post then these values will be shown in the rte if he is creating a new post then default values will be empty
  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: slugTransform(post.title || ""),
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset, slugTransform]);

  const submit = async (data) => {
    setLoader(true);
    //if post is present
    if (post) {
      //uploading new image
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        //if we have uploaded new image then deleting the prev one
        appwriteService.deleteFile(post.featuredImage);
      }
      //updating the post with new data
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      //if post is not present i.e we have to create new post
      //uploading the image to the database
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        //after sucessfully uploading the image we are creating new post
        const fileId = file.$id;
        data.featuredImage = fileId;
        console.log("User ID:", userData.$id);
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        //after creating new post redirecting to it
        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
    setLoader(false);
  };

  //this will run slugTransformation
  useEffect(
    () => {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue(
            "slug",
            slugTransform(value.title, { shouldValidate: true })
          );
        }
      });
      return () => {
        //this is the technique to unsubscribe the method used in useEffect for memory management purpose
        subscription.unsubscribe();
      };
    },
    /*this watch means when ever changes occur in the input filed to which watch is attached this useEffect will run*/ [
      watch,
      slugTransform,
      setValue,
    ]
  );

  return (
    <div className="w-full min-h-screen pt-20 mb-3 md:mb-[2rem] px-4 py-2 md:mt-[2rem] flex md:flex-row flex-col justify-center items-center">
      {loader ? (
        <Loader />
      ) : (
        <form
          onSubmit={handleSubmit(submit)}
          className="flex md:flex-row flex-col md:flex-wrap"
        >
          <div className="md:w-2/3 w-full px-2">
            <Input
              label="Title :"
              placeholder="Title"
              className="mb-4"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug :"
              placeholder="Slug"
              className="mb-4"
              {...register("slug", { required: true })}
              onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                });
              }}
            />
            {/* passing the control into rte */}
            <RTE
              label="Content :"
              name="content"
              control={control}
              defaultValue={getValues("content")}
            />
          </div>
          <div className="md:w-1/3 mt-4 md:mt-0 w-full px-2">
            <Input
              label="Featured Image :"
              type="file"
              className="mb-4"
              accept="image/png, image/jpg, image/jpeg, image/gif"
              {...register("image", { required: !post })}
            />
            {post && (
              <div className="w-full mb-4">
                <img
                  src={appwriteService.getFilePreview(post.featuredImage)}
                  alt={post.title}
                  className="rounded-lg"
                />
              </div>
            )}
            <Select
              options={["active", "inactive"]}
              label="Status"
              className="mb-4"
              {...register("status", { required: true })}
            />
            <Button
              type="submit"
              bgColor={post ? "bg-green-500" : undefined}
              className="w-full"
            >
              {post ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
