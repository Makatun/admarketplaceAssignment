import { useParams } from "react-router-dom";
import useDataDetch from "../hooks/useData";
import { CommentFormValues, CommentType, Post } from "../types";
import CommentForm from '../components/CommentForm';
import ErrorContainer from './../components/ErrorContainer';
import { API_URL, POSTS_PATH, COMMENTS_PATH, COMMENTS_POST_PATH } from "../Const";
import axios from "axios";


export default function PostScreen() {

    const { postId } = useParams() as {
        postId: string;
    }

    const postIdParsed = /^\d+$/.test(postId) && parseInt(postId, 10);

    const COMMENTS_URL = API_URL + COMMENTS_PATH + postIdParsed


    const { data: posts, isLoading: isLoadingPosts, isError: isErrorPosts } = useDataDetch<[Post]>(API_URL + POSTS_PATH)
    const { data: comments, isLoading: isLoadingComents, isError: isErrorComments, mutate } = useDataDetch<CommentType[]>(COMMENTS_URL)

    const invalidPostMessage = <div title="invalidPostId">Invalid post ID: {postId}</div>

    if (!postIdParsed) return <ErrorContainer>{invalidPostMessage}</ErrorContainer>

    if (isLoadingComents) return <div>loading...</div>
    if (isErrorComments) return <div>Error: failed to load data from URL: {COMMENTS_URL}</div>
    if (isLoadingPosts) return <div>loading post...</div>
    if (isErrorPosts) return <div>Error: failed to load post from URL: {API_URL + POSTS_PATH}</div>


    const post = posts?.filter((posts) => posts.id === postIdParsed)[0]

    if (!post) return <ErrorContainer>{invalidPostMessage}</ErrorContainer>


    const postComment = (values: CommentFormValues) => {

        if (!values.name || !values.body || !values.email) {
            alert('All fields are required!')
            return
        }


        axios.post(API_URL + COMMENTS_POST_PATH, { ...values, postId: postIdParsed })
            .then(function (response) {

                var newList: CommentType[] = [];
                comments && newList.push(...comments)
                newList.push({ ...response.data })

                mutate(newList, false) //Last param should be true but since server data is not updated list is not refreshed

                // console.log("SAVED COMMENT!", response);
            })
            .catch(function (error) {
                console.log("ERROR ON SAVE COMMENT!", error);
            });
    }



    // console.log("PostScreen render", comments, post);


    return (

        <div className="pageContent" title="Post Screen">
            <div>
                <div className="postTitle">{post?.title}</div>
                <div className="postBody">Post {post?.body}</div>
            </div>

            <div>
                {comments?.map((comment) =>
                    <div key={comment.id} className="commentContainer">
                        <div className="commentName">{comment.name}</div>
                        <div className="commentBody">{comment.body}</div>
                    </div>)}
            </div>

            <div>
                <CommentForm onSubmit={postComment} />
            </div>
        </div>
    )
}