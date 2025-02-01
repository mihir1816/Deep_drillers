import React, { useState, useEffect } from "react";
import Loader from "../components/Loader";
import axios from 'axios';

const API_KEY = 'API_KAY'; // Replace with your API key
const BRAND_ID = 'BRAND_KEY'; // Replace with your Brand ID

async function createVideoPost(setVideoUrl, setIsLoading) {
    const url = 'https://brain.predis.ai/predis_api/v1/create_content/';
    
    const payload = {
        brand_id: BRAND_ID,
        text: 'tell me about how dangerous AI can be if we don’t use it wisely, give its pros and cons',
        media_type: 'video',
        video_duration: 'long'
    };

    try {
        setIsLoading(true); // Start loading
        const response = await axios.post(url, payload, {
            headers: {
                Authorization: API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        console.log('Video post created successfully:', response.data);
        
        const postId = response.data.post_ids[0];

        if (response.data.post_status === 'inProgress') {
            console.log('Video is being generated. Waiting for completion...');
            const videoUrl = await waitForVideoCompletion(postId);
            setVideoUrl(videoUrl);
        } else if (response.data.video_url) {
            console.log('Video URL:', response.data.video_url);
            setVideoUrl(response.data.video_url);
        }
        
    } catch (error) {
        console.error('Error creating video post:', error.response ? error.response.data : error.message);
    } finally {
        // Ensure loading state is updated here only after processing
        setIsLoading(false); // This should be called after video generation is complete
    }
}

async function waitForVideoCompletion(postId) {
    const getPostsUrl = `https://brain.predis.ai/predis_api/v1/get_posts/`;
    
    let completed = false;
    let videoUrl = null;

    while (!completed) {
        try {
            await new Promise(resolve => setTimeout(resolve, 15000)); // Wait for 15 seconds
            
            const response = await axios.get(getPostsUrl, {
                headers: {
                    Authorization: API_KEY,
                },
                params: { 
                    brand_id: BRAND_ID
                }
            });

            console.log('Checking for completed videos...');
            const latestPost = response.data.posts.find(post => post.post_id === postId);

            if (latestPost) {
                if (latestPost.status === 'completed') {
                    console.log('Video generation completed successfully!');
                    videoUrl = latestPost.generated_media[0].url;
                    completed = true;
                } else if (latestPost.status === 'error') {
                    console.error('Error in video generation:', latestPost);
                    completed = true;
                } else {
                    console.log('Video still in progress...');
                }
            } else {
                console.log('No posts found with this ID.');
            }

        } catch (error) {
            console.error('Error retrieving posts:', error.response ? error.response.data : error.message);
            completed = true; // Exit loop on error
        }
    }

    return videoUrl;
}

function ShortVideo() {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    createVideoPost(setVideoUrl, setIsLoading); 
  }, []); 

  return (
    <div style={{ minHeight: "100vh", maxWidth: "360px", margin: "0 auto", backgroundColor: "#f7f7f7", padding: "20px", borderRadius: "8px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <h1 style={{ fontSize: "18px", fontWeight: "bold", color: "#2563EB" }}>
          Quick Research Insights!
        </h1>
        <p style={{ fontSize: "14px", color: "#4B5563", marginBottom: "10px" }}>
          Watch the summary video of the latest research paper.
        </p>
      </div>

      {/* Video Section */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
        <div
          style={{
            width: "100%",
            height: "0",
            paddingBottom: "150%", // Increased height for a longer aspect ratio
            backgroundColor: "#000",
            borderRadius: "15px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
                color: "#ffffff",
              }}
            >
              <Loader />
              <p style={{ fontSize: "12px" }}>Generating video, please wait...</p>
            </div>
          ) : (
            <video 
              controls 
              autoPlay 
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover" }}
            >
              {videoUrl && <source src={videoUrl} type="video/mp4" />}
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#2563EB",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() => alert("Video downloaded")}
        >
          Download Video
        </button>
        <button
          style={{
            padding: "8px 16px",
            backgroundColor: "#F3F4F6",
            color: "#4B5563",
            borderRadius: "8px",
            cursor: "pointer",
            border: "none",
          }}
          onClick={() => alert("Back to Home")}
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ShortVideo;
