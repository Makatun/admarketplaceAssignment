import { useNavigate } from "react-router-dom";

import './App.css';
import { API_URL, POSTS_PATH } from "./src/Const";
import useDataDetch from './src/hooks/useData';
import { Post } from "./src/types";




const App: React.FC = () => {

  let navigate = useNavigate();

  const { data, isLoading, isError } = useDataDetch<[Post]>(API_URL + POSTS_PATH)
  if (isLoading) return <div>loading...</div>
  if (isError) return <div>Error: failed to load data from URL: {API_URL + POSTS_PATH}</div>

  // console.log("App render", isError, isLoading, !!data);

  return (
    <div className="pageContent" style={{ justifyContent: 'center', display: 'flex', alignItems: 'flex-start' }}>
      <div className="formField" style={{ marginTop: '50px' }}>

        <select id="posts" onChange={e => navigate(`/posts/${e.target.value}`)} defaultValue='disabledId' title="postSelect">
          <option disabled value='disabledId'>Select a Post</option>
          {data?.map(post => <option value={post.id} key={post.id}>{post.title}</option>)}
        </select>

      </div>
    </div>
  );
};




export default App;
