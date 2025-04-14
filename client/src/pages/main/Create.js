import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerCircularSplit } from "spinners-react";
import FileBase64 from "react-file-base64";
import { BsImage } from "react-icons/bs";
import styled from "styled-components";
import { toast } from "react-toastify";
import { createFeed } from "../../features/feed/feedSlice";

const Create = () => {
  const [values, setValues] = useState({ caption: "", post: "" });
  const { isLoading } = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { caption, post } = values;

    if (!caption || !post) {
      toast.error("Please fill in all fields.");
      return;
    }

    dispatch(createFeed(values));
    setValues({ caption: "", post: "" });
  };

  if (isLoading) {
    return (
      <Center>
        <SpinnerCircularSplit
          size={50}
          thickness={100}
          speed={100}
          color="#4f46e5"
          secondaryColor="rgba(79, 70, 229, 0.2)"
        />
      </Center>
    );
  }

  return (
    <Wrapper>
      <Card>
        <ImagePreview>
          {values.post ? (
            <img src={values.post} alt="Preview" />
          ) : (
            <div className="placeholder">
              <BsImage />
              <p>Image preview will appear here</p>
            </div>
          )}
        </ImagePreview>

        <FormWrapper onSubmit={onSubmit}>
          <h2>Create a Post</h2>

          <StyledInput
            type="text"
            placeholder="Your caption here..."
            name="caption"
            value={values.caption}
            onChange={handleChange}
          />

          <FileBase64
            type="file"
            multiple={false}
            accept="image/*"
            onDone={({ base64 }) => setValues({ ...values, post: base64 })}
          />

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Posting..." : "Post"}
          </SubmitButton>
        </FormWrapper>
      </Card>
    </Wrapper>
  );
};

export default Create;

// Styled Components
const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f9fafb;
  padding: 2rem;
`;

const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: #ffffff;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);
  border-radius: 1.5rem;
  overflow: hidden;
  width: 100%;
  max-width: 900px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImagePreview = styled.div`
  background: linear-gradient(135deg, #eef2ff, #f5f7ff);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  img {
    width: 100%;
    max-width: 340px;
    border-radius: 1rem;
    object-fit: cover;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
  }

  .placeholder {
    text-align: center;
    color: #94a3b8;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;

    svg {
      font-size: 3rem;
      margin-bottom: 1rem;
      color: #cbd5e1;
    }
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 3rem;

  h2 {
    font-size: 1.8rem;
    color: #1f2937;
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

const StyledInput = styled.input`
  padding: 12px 16px;
  border-radius: 10px;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  font-size: 16px;
  outline: none;
  transition: all 0.3s;

  &:focus {
    border-color: #4f46e5;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
  }
`;

const SubmitButton = styled.button`
  padding: 14px 20px;
  background: #4f46e5;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.3s;

  &:hover {
    background: #4338ca;
    box-shadow: 0 8px 24px rgba(79, 70, 229, 0.3);
  }

  &:disabled {
    background: #a5b4fc;
    cursor: not-allowed;
  }
`;

const Center = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
