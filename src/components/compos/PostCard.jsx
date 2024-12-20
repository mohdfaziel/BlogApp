import React from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";
//in App-write id is given ad $id
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full rounded-xl overflow-hidden h-[400px] flex items-center justify-center mb-4">
            <img src={appwriteService.getFilePreview(featuredImage)} loading="lazy" className="rounded-xl hover:scale-105 transition-all w-full h-full object-cover"/>
        </div>
        <h2 className="text-xl font-bold">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;
