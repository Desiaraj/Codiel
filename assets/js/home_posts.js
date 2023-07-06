{

    let createPost = function(){

        let newPostForm = $('#new-post');
        
        newPostForm.submit(function(e){
            console.log("Logged");
            e.preventDefault();

            //ajax call
           

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success:function(data){
                    console.log(data);
                    let newPost = createPostDOM(data.data.post);
                    $('#post-list-container>ul').prepend(newPost);
                    deletePostDOM($(' .delete-post-button',newPost));
                },error:function(error){
                    console.log('error',error);
                }
            })
        })
    }

    createPost();

    //method to create a post in DOM 

    let createPostDOM = function(post){
        newCommentForm();
        return $(`<li id=post-${post._id }>
       
        <small>
            <a class="delete-post-button" href="/posts/delete/${post._id}">Delete</a>
        </small>

        ${post.content}
        <small>
            ${post.user.name}
        </small>
    
            <form action="/comment/create" id="new-comment" method="POST">
                <textarea name="content"cols="10" rows="3" placeholder="type a comment"></textarea>
                <input type="hidden" name="post" value="${post._id}">
                <input type="submit" value="create comment">
            </form>
    
        <div id="comment-list">
            <ul>
             
            </ul>
    
        </div>    
    </li>`);
    }

    let deletePostDOM = function(deleteLink){

        $(deleteLink).click(function(e){
           e.preventDefault();

           $.ajax({
             type:'GET',
             url:$(deleteLink).prop('href'),
             success:function(data){
                  console.log(data.data);
                  //remove the post
                  $(`#post-${data.data.post_id}`).remove();
             },error:function(error){
                console.log(error.responseText);
             }
           })
        });
    }

    let newCommentForm = function(){
       let newComment =  $('#new-comment');

       newComment.submit(function(e){
           e.preventDefault();

           console.log("aa");
       });
    }
}