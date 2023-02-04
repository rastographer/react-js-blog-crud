import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { useHistory } from 'react-router-dom';

const BlogDetails = () => {
    
    const { id } = useParams();
    const { data: blog, error, isPending } = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const handleClickDelete = () => {
        fetch('http://localhost:8000/blogs/' + blog.id, {
            method: 'DELETE'
        }).then(() => {
            history.push('/'); 
        })
    }

    return ( 
        <div className="blog-details">
            { isPending && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { blog && (
                <article>
                    <h1>{ blog.title }</h1>
                    <h5>Author: { blog.author }</h5>
                    <div> { blog.body } </div>
                    <button onClick={ handleClickDelete }>Delete Blog</button>
                </article>
            )}
        </div>
     );
}
 
export default BlogDetails;