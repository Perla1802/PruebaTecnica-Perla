import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button } from "antd";

export const PostList = () => {
  const { posts } = useSelector((state) => state.users);
  const [showAllComments, setShowAllComments] = useState({});

  const toggleComments = (postId) => {
    setShowAllComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  if (posts.length === 0)
    return <p className="text-center text-gray-500">Datos no disponibles.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
      {posts.map((post, index) => (
        <Card
          key={post.id}
          title={
            <span style={{ fontSize: "18px", fontWeight: "600" }}>
              {post.title}
            </span>
          }
          hoverable
          className="hover:shadow-xl transition-shadow duration-300"
          style={{
            border: "1px solid #e8e8e8",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
            maxWidth: "100%",
          }}
        >
          <p style={{ marginBottom: "16px", color: "#555" }}>{post.body}</p>
          <h3 style={{ marginTop: "16px", fontWeight: "bold", color: "#333" }}>
            Comentarios:
          </h3>
          {(showAllComments[post.id]
            ? post.comments
            : post.comments.slice(0, 2)
          ).map((comment) => (
            <Card
              key={comment.id}
              type="inner"
              style={{
                marginTop: "12px",
                backgroundColor: "#f5f5f5",
                border: "1px solid #e8e8e8",
              }}
            >
              <p style={{ fontWeight: "500", color: "#333" }}>
                {comment.name}{" "}
                <span style={{ color: "#888" }}>({comment.email})</span>
              </p>
              <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
                {comment.body}
              </p>
            </Card>
          ))}
          {post.comments.length > 2 && (
            <Button
              type="link"
              onClick={() => toggleComments(post.id)}
              style={{ padding: 0, marginTop: "12px" }}
            >
              {showAllComments[post.id]
                ? "Ocultar"
                : `Ver más (${post.comments.length - 2})`}
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
};
