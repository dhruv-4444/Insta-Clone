import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";

import moment from "moment";

import { feedLikeDislike } from "../features/feed/feedSlice.js";
import { Link } from "react-router-dom";

import { More, Heart, Message, Save2 } from "iconsax-react";

const PostContainer = ({ data }) => {
  const [like, setLike] = useState(data?.likes.length);
  const dispatch = useDispatch();

  return (
    <ContentWrapper>
      <div className="profile_container" key={data?._id}>
        <div className="profile_container-header">
          <div className="profile_container-header--user">
            <Link to={`/user/${data?.postedBy?._id}`}>
              <img
                src={data?.postedBy?.avatar}
                alt="profile"
                className="profile_container-header--user-avatar"
              />
              <p className="profile_container-header--user-username">
                {data?.postedBy?.username}
              </p>
            </Link>
          </div>
          <div className="profile_container-header--more">
            <More size="24" color="#697689" className="more-icon" />
          </div>
        </div>
        <Link to={`/feed/${data?._id}`} className="profile_container-post-link">
          <img
            src={data?.post}
            alt="profile-post"
            className="profile_container-post"
          />
        </Link>
        <div className="profile_container-footer">
          <div className="profile_container-footer--icons">
            <div className="profile_container-footer-icon">
              {data?.liked ? (
                <>
                  <Heart
                    size="32"
                    color="#f47373"
                    variant="Bold"
                    onClick={() => {
                      setLike(like - 1);
                      dispatch(feedLikeDislike({ postId: data?._id }));
                      window.location.reload(false);
                    }}
                  />
                </>
              ) : (
                <>
                  <Heart
                    size="32"
                    color="#697689"
                    onClick={() => {
                      setLike(like + 1);
                      dispatch(feedLikeDislike({ postId: data?._id }));
                      window.location.reload(false);
                    }}
                  />
                </>
              )}

              <Message size="32" color="#697689" />
            </div>
            <Save2 size="32" color="#697689" />
          </div>
          <div className="profile_container-footer-like-count--time">
            <p>Like {data?.likes?.length}</p>
            <p>{moment(data?.createdAt).fromNow()}</p>
          </div>
          <div className="profile_container-footer-caption">
            <p className="profile_container-footer-caption--caption-text">
              <span className="profile_container-footer-caption--username">
                {data?.postedBy?.username}
              </span>{" "}
              {data?.caption}
            </p>

            {data?.comments?.slice(0, 2).map((comment) => {
              return (
                <p
                  className="profile_container-footer-caption--comment-text"
                  key={comment._id}
                >
                  <span className="profile_container-footer-caption--username">
                    {comment?.commentedBy?.username}
                  </span>{" "}
                  {comment?.comment}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

export default PostContainer;
const ContentWrapper = styled.div`
  .profile_container {
    width: 500px;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    margin: 20px auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s ease-in-out;

    &:hover {
      transform: translateY(-2px);
    }

    @media screen and (max-width: 600px) {
      width: 92%;
      margin: 14px auto;
    }
  }

  .profile_container-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #e0e0e0;
  }

  .profile_container-header--user {
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: inherit;
    }
  }

  .profile_container-header--user-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }

  .profile_container-header--user-username {
    font-weight: 600;
    font-size: 15px;
    font-family: "Poppins", sans-serif;
    color: #222;
  }

  .more-icon {
    transform: rotate(270deg);
    color: #999;
    cursor: pointer;

    &:hover {
      color: #333;
    }
  }

  .profile_container-post-link {
    width: 100%;
  }

  .profile_container-post {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }

  .profile_container-footer {
    padding: 12px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .profile_container-footer--icons {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .profile_container-footer-icon {
    display: flex;
    gap: 12px;

    svg {
      cursor: pointer;
      transition: transform 0.2s ease, color 0.2s ease;

      &:hover {
        transform: scale(1.05);
        color: #f47373;
      }
    }
  }

  .profile_container-footer-like-count--time {
    font-family: "Poppins", sans-serif;
    font-size: 13px;
    color: #444;
    display: flex;
    justify-content: space-between;
  }

  .profile_container-footer-caption {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .profile_container-footer-caption--username {
    font-weight: 600;
    font-size: 13px;
    color: #111;
  }

  .profile_container-footer-caption--caption-text,
  .profile_container-footer-caption--comment-text {
    font-size: 13px;
    color: #555;
    font-family: "Poppins", sans-serif;
    line-height: 1.4;
  }

  .profile_container-footer-caption--comment-text {
    font-size: 12px;
    color: #666;
  }
`;
